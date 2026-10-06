import { MainRule, SubRule } from "Models/PropertyRules";

export const PropertyMatcherUtil = {
    getMatchingMainRule(propValue:string,ruleset:Array<MainRule>):MainRule|false{
        const matchingRule = ruleset.find((rule)=>rule.propertyValue = propValue)
        if (!matchingRule){
            return false
        }
        return matchingRule
    },
    getMatchingSubRule(propValue:string, ruleset:Array<SubRule>):SubRule|false{
        const matchingRule = ruleset.find((rule)=>rule.propertyValue = propValue)
        if(!matchingRule){
            return false
        }
        return matchingRule
    }
}