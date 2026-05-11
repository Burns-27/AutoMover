import { Classification } from "Models/ClassificationType";
import PropertyRule from "Models/PropertyRule";
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
  public getMatchingPropertyRule(name:string,propertiesRules:PropertyRule[]):PropertyRule|false{
    const rule = propertiesRules.find((r)=>r.Name === name)||false
    return rule
  }
  public constructPath(root:string, folder:string):string{
    if(root.endsWith("/")){
      return `${root}${folder}`
    }else{
      return `${root}/${folder}`
    }
  }
}
const propertyUtil = PropertyUtil.getInstance();
export default propertyUtil;
