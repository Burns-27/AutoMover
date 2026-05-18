import loggerUtil from "Utils/LoggerUtil";
import { TFile, TFolder } from "obsidian";
import type { App } from "obsidian";

/**
 * Result of a single `MovingUtil.moveFile` call.
 *
 * - `moved`        — file was renamed successfully
 * - `no_op`        — file is already at the destination, nothing to do
 * - `duplicate`    — a different file already exists at the destination path
 * - `invalid_path` — destination folder didn't exist and could not be created
 * - `error`        — `vault.rename` rejected for any other reason (logged to console)
 */
export type MoveOutcome = "moved" | "no_op" | "duplicate" | "invalid_path" | "error";

class MovingUtil {
  private static instance: MovingUtil;
  private app: App;

  private constructor() {}

  public static getInstance(): MovingUtil {
    if (!MovingUtil.instance) {
      MovingUtil.instance = new MovingUtil();
    }
    return MovingUtil.instance;
  }

  public init(app: App): void {
    this.app = app;
  }

  /**
   * Checks if the path is a file
   *
   * @param path - Path to be checked
   * @returns boolean
   */
  public isFile(path: string): boolean {
    const file = this.app.vault.getAbstractFileByPath(path);
    return file instanceof TFile;
  }

  /**
   * Checks if the path is a folder
   *
   * @param path - Path to be checked
   * @returns boolean
   */
  public isFolder(path: string): boolean {
    return this.app.vault.getAbstractFileByPath(path) instanceof TFolder;
  }

  /**
   * Moves a file into the destination folder, preserving its name.
   *
   * Behavior:
   * - If the file is already at the destination, returns `"no_op"` without touching the vault.
   * - If another file already occupies the destination path, returns `"duplicate"`
   *   (checked up-front via `getAbstractFileByPath` rather than by parsing rename errors).
   * - If the destination folder doesn't exist, intermediate folders are created; failure
   *   to create them returns `"invalid_path"`.
   * - Any other rename rejection is caught, logged, and returned as `"error"`.
   *
   * @param file - File to be moved
   * @param newPath - Destination folder (the file's own name is appended automatically)
   * @returns a {@link MoveOutcome} describing what happened
   */
  public async moveFile(file: TFile, newPath: string): Promise<MoveOutcome> {
    const targetPath = `${newPath}/${file.name}`;

    if (file.path === targetPath) {
      return "no_op";
    }

    if (this.app.vault.getAbstractFileByPath(targetPath)) {
      loggerUtil.debug(`Duplicate at "${targetPath}", skipping "${file.path}"`);
      return "duplicate";
    }

    if (!this.isFolder(newPath)) {
      const created = await this.createMissingFolders(newPath);
      if (!created) {
        loggerUtil.error(`Could not create destination folder "${newPath}"`);
        return "invalid_path";
      }
    }

    try {
      await this.app.vault.rename(file, targetPath);
      return "moved";
    } catch (e) {
      loggerUtil.error(`Failed to move "${file.path}" -> "${targetPath}": ${e}`);
      return "error";
    }
  }

  /**
   * Moves the folder to the destination path
   *
   * @param folder - Folder to be moved
   * @param newPath - Destination path
   * @returns void
   */
  public moveFolder(folder: TFolder, newPath: string): void {
    if (this.isFolder(newPath)) {
      this.app.vault.rename(folder, `${newPath}/${folder.name}`);
    } else {
      loggerUtil.errorNotice(`Invalid destination path\n${newPath} is not a folder!`);
    }
  }

  /**
   * Creates folder in destination path if it does not exist already
   *
   * @param path - Path of the folder to be created
   * @returns Created folder or null if folder already exists
   */
  public createFolder(path: string): TFolder | null {
    if (!this.isFolder(path)) {
      this.app.vault.createFolder(path).then((folder) => {
        return folder;
      });
    } else {
      loggerUtil.errorNotice("Folder already exists");
    }
    return null;
  }

  /**
   * Splits the path into an array of strings
   *
   * @param path - Path to be split
   * @returns string[]
   */
  private splitPath(path: string): string[] {
    return path.split("/");
  }

  /**
   * Create missing folders in the path
   *
   * @param path - Path to be checked
   * @returns void
   */
  private async createMissingFolders(path: string): Promise<boolean> {
    const splitPath = this.splitPath(path);
    let currentPath = "";
    for (const folder of splitPath) {
      currentPath += folder;
      if (!this.isFolder(currentPath)) {
        await this.app.vault.createFolder(path);
      }
      currentPath += "/";
    }
    if (this.isFolder(path)) {
      return true;
    }

    return false;
  }
}

const movingUtil = MovingUtil.getInstance();
export default movingUtil;
