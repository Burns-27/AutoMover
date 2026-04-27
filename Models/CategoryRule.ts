import { TypeRule } from "./TypeRule";

/**
 * Project rules for defining how files should be moved inside project folders
 */
export class CategoryRule {
	/**
	 * The name of the project this rule belongs to
	 * e.g. "Project A"
	 * e.g. "Book collection"
	 * e.g. "Music albums 2025"
	 */
	public CategoryName: string;
	/**
	 * Project destination folder
	 * e.g. "Projects/Project A"
	 * e.g. "Projects/Project B/
	 */
	public folder: string;
	/**
	 * Rules for moving files inside the project folder
	 */
	public rules: Array<TypeRule>;
	public collapsed: boolean;
	constructor(
		categoryName?: string,
		folder?: string,
		rules?: Array<TypeRule>,
		collapsed?: boolean,
	) {
		this.CategoryName = categoryName || "";
		this.folder = folder || "";
		this.rules = rules || [];
		this.collapsed = collapsed || false;
	}
}
