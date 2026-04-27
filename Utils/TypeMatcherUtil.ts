import { TypeRule } from "Models/TypeRule";

class TypeMatcherUtil {
	private static instance: TypeMatcherUtil;

	private constructor() {}

	public static getInstance(): TypeMatcherUtil {
		if (!TypeMatcherUtil.instance) {
			TypeMatcherUtil.instance = new TypeMatcherUtil();
		}
		return TypeMatcherUtil.instance;
	}

	/**
	 * Returns the first project rule that matches the file
	 * If no rule matches, returns null
	 * @param typeName
	 * @param typeRules
	 * @returns Type Rule | null
	 */
	public getMatchingTypeRule(
		typeName: string,
		typeRules: TypeRule[],
	): TypeRule | null {
		for (const typeRule of typeRules) {
			if (typeRule.TypeName === typeName) {
				return typeRule;
			}
		}
		return null;
	}
}
const typeMatcherUtil = TypeMatcherUtil.getInstance();
export default typeMatcherUtil;
