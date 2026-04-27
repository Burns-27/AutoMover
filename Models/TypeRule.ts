/**
 * Project rules for defining how files should be moved inside project folders
 */
export class TypeRule {
	/**
	 * The name of the project this rule belongs to
	 * e.g. "Project A"
	 * e.g. "Book collection"
	 * e.g. "Music albums 2025"
	 */
	public TypeName: string;
	/**
	 * Category destination folder
	 * e.g. "Category/Project A"
	 * e.g. "Category/Project B/
	 */
	public folder: string;

	public collapsed: boolean;
	constructor(typeName?: string, folder?: string, collapsed?: boolean) {
		this.TypeName = typeName || "";
		this.folder = folder || "";
		this.collapsed = collapsed || false;
	}
}
