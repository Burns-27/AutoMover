import { SubcategoryRule } from "Models/SubcategoryRule";


/**
 * Category Rules for defining What folder to move Files into, and how to move them within the folder. 
 */
export class CategoryRule {
	/**
	 * The name of the project this rule belongs to
	 */
	public CategoryName: string;
	/**
	 * Project destination folder
	 */
	public folder: string;
	/**
	 * Rules for moving files inside the project folder
	 */
	public subcategories: Array<SubcategoryRule>;
	public collapsed: boolean;
	constructor(
		categoryName?: string,
		folder?: string,
		subcategories?: Array<SubcategoryRule>,
		collapsed?: boolean,
	) {
		this.CategoryName = categoryName || "";
		this.folder = folder || "";
		this.subcategories = subcategories || [];
		this.collapsed = collapsed || false;
	}
}
