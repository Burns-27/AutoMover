/**
 * Defines All the level rules, 
 */
export class LevelRule {
  /**
   * The Name and Level Denote the value of the property it will match agains, and what classification it is. 
   */
  public name: string;
  public level: "top" | "middle" | "end";
  
  public folder: string;

  public sublevels: LevelRule[] = [];
  public collapsed?: boolean;
  constructor(level: "top" | "middle" | "end", name?: string, folder?: string, collapsed?: boolean) {
    this.level = level;
    this.name = name || "";
    this.folder = folder || "";
    if (collapsed !== undefined) {
      this.collapsed = collapsed
    }
  }
}