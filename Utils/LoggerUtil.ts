import type AutoMoverPlugin from "main";
import { Notice } from "obsidian";

class LoggerUtil {
  private static instance: LoggerUtil;
  private static readonly PREFIX = "[AutoMover]";
  private static readonly NOTICE_DURATION_MS = 5000;
  private plugin: AutoMoverPlugin | null = null;

  private constructor() {}

  /**
   * Returns the singleton instance of LoggerUtil, creating it on first access.
   *
   * @returns LoggerUtil
   */
  public static getInstance(): LoggerUtil {
    if (!LoggerUtil.instance) {
      LoggerUtil.instance = new LoggerUtil();
    }
    return LoggerUtil.instance;
  }

  /**
   * Wires the logger to the plugin so it can read the current debug toggle
   * from settings on every call (settings may be reassigned on reload).
   */
  public init(plugin: AutoMoverPlugin): void {
    this.plugin = plugin;
  }

  /**
   * Reads the current debug toggle from plugin settings.
   *
   * @returns true if debug logging is enabled, false otherwise
   */
  private isDebugEnabled(): boolean {
    return this.plugin?.settings?.debugLogging === true;
  }

  /**
   * Logs a debug message to the console, prefixed with the plugin tag.
   * No-op when debug logging is disabled in settings.
   *
   * @param args - Values to log
   * @returns void
   */
  public debug(...args: unknown[]): void {
    if (!this.isDebugEnabled()) return;
    console.debug(LoggerUtil.PREFIX, ...args);
  }

  /**
   * Logs an informational message to the console, prefixed with the plugin tag.
   *
   * @param args - Values to log
   * @returns void
   */
  public info(...args: unknown[]): void {
    console.info(LoggerUtil.PREFIX, ...args);
  }

  /**
   * Logs a warning message to the console, prefixed with the plugin tag.
   *
   * @param args - Values to log
   * @returns void
   */
  public warn(...args: unknown[]): void {
    console.warn(LoggerUtil.PREFIX, ...args);
  }

  /**
   * Logs an error message to the console, prefixed with the plugin tag.
   *
   * @param args - Values to log
   * @returns void
   */
  public error(...args: unknown[]): void {
    console.error(LoggerUtil.PREFIX, ...args);
  }

  /**
   * Console.info + Obsidian Notice. `message` shows in both places; any
   * additional args (e.g. an Error or rule object) are appended to the
   * console line only.
   */
  public infoNotice(message: string, ...extra: unknown[]): void {
    console.info(LoggerUtil.PREFIX, message, ...extra);
    new Notice(message, LoggerUtil.NOTICE_DURATION_MS);
  }

  /**
   * Console.warn + Obsidian Notice. `message` shows in both places; any
   * additional args are appended to the console line only.
   *
   * @param message - The user-facing warning message
   * @param extra - Optional values appended to the console line only
   * @returns void
   */
  public warnNotice(message: string, ...extra: unknown[]): void {
    console.warn(LoggerUtil.PREFIX, message, ...extra);
    new Notice(message, LoggerUtil.NOTICE_DURATION_MS);
  }

  /**
   * Console.error + Obsidian Notice. `message` shows in both places; any
   * additional args (e.g. an Error or rule object) are appended to the
   * console line only.
   *
   * @param message - The user-facing error message
   * @param extra - Optional values appended to the console line only
   * @returns void
   */
  public errorNotice(message: string, ...extra: unknown[]): void {
    console.error(LoggerUtil.PREFIX, message, ...extra);
    new Notice(message, LoggerUtil.NOTICE_DURATION_MS);
  }
}

const loggerUtil = LoggerUtil.getInstance();
export default loggerUtil;
