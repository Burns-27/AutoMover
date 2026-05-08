/**
 * Type rules for defining how files should be moved inside subcategory folders
 */
export class TypeRule {
	/**
	 * The name of the project this rule belongs to
	 */
	public TypeName: string;
	/**
	 * Category destination folder
	 */
	public folder: string;
	constructor(typeName?: string, folder?: string, collapsed?: boolean) {
		this.TypeName = typeName || "";
		this.folder = folder || "";
	}
}
