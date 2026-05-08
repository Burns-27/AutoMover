import { Classification } from "Models/ClassificationType";
import { FrontMatterCache } from "obsidian";

class PropertyUtil {
	private static instance: PropertyUtil;
	private constructor() {}
	public static getInstance(): PropertyUtil {
		if (!PropertyUtil.instance) {
			PropertyUtil.instance = new PropertyUtil();
		}
		return PropertyUtil.instance;
	}

	public getClassification(
		properties: { category: string; subcategory: string; type: string },
		frontmatter: FrontMatterCache,
	): Classification {
    const categoryValue = frontmatter[properties.category]||false;
    const subcategoryValue = frontmatter[properties.subcategory]||false;
    const typeValue = frontmatter[properties.type]||false;
    return {
      category:categoryValue,
      subcategory:subcategoryValue,
      type:typeValue,
    }
  }
}
const propertyUtil = PropertyUtil.getInstance();
export default propertyUtil;
