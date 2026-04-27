import { CategoryRule } from "Models/CategoryRule";

class CategoryMatcherUtil {
	private static instance: CategoryMatcherUtil;

	private constructor() {}

	public static getInstance(): CategoryMatcherUtil {
		if (!CategoryMatcherUtil.instance) {
			CategoryMatcherUtil.instance = new CategoryMatcherUtil();
		}
		return CategoryMatcherUtil.instance;
	}

	/**
	 * Returns the first type rule that matches the file
	 * If no rule matches, returns null
	 * @param categoryName
	 * @param categoryRules
	 * @returns CategoryRule | null
	 */
	public getMatchingCategoryRule(
		categoryName: string,
		categoryRules: CategoryRule[],
	): CategoryRule | null {
		for (const categoryRule of categoryRules) {
			if (categoryRule.CategoryName === categoryName) {
				return categoryRule;
			}
		}
		return null;
	}

	/**
	 * Prepends the project folder to the destination path
	 * and checks whether the project folder ends with a slash
	 *
	 * @param typeRule
	 * @param subPath
	 * @returns string
	 */
	public constructCategoryDestinationPath(
		CategoryRule: CategoryRule,
		subPath: string,
	): string {
		let categoryFolder = CategoryRule.folder;
		if (!categoryFolder.endsWith("/")) {
			categoryFolder += "/";
		}
		return categoryFolder + subPath;
	}
}
const categoryMatcherUtil = CategoryMatcherUtil.getInstance();
export default categoryMatcherUtil;
