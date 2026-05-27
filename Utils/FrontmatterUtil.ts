import { FrontmatterRule } from "Models/FrontmatterRule";
import { FrontMatterCache, normalizePath, TFile } from "obsidian";
import loggerUtil from "Utils/LoggerUtil";

class FrontmatterUtil {
  private static instance: FrontmatterUtil;
  private constructor() { }
  public static getInstance(): FrontmatterUtil{
    if (!FrontmatterUtil.instance) {
      FrontmatterUtil.instance = new FrontmatterUtil();
    }
    return FrontmatterUtil.instance
  }
  /**
   * Checks if the file matches a Frontmatter rule, 
   * @param file the file in question
   * @param fm the frontmatter of the file
   * @param topArray the array of frontmatterRules
   * @param properties The user defined properties to checkagaisnt
   * @returns The destination or false. 
   */
  public matchFrontmatterRule(file:TFile,fm:FrontMatterCache,topArray:FrontmatterRule[], properties:{top:string,middle:string,end:string}):string|false {
    //Get the top value, and return false if it doesnt exist or isnt in the rules. 
    const top = fm[properties.top]
    if (typeof top !== "string") return false
    const topRule = topArray.find((p) => p.name === top)
    if (!topRule) {
     loggerUtil.infoNotice(`${top} not defined in rules, Will Check for other Rules. `)
      return false
    }
    //get the middle and end values, and check if they are strings. assigning them false makes the next steps easier. 
    const middle = (typeof fm[properties.middle] === "string") ? fm[properties.middle] : false
    // check if middle is assigned, returning the top folder if not
    if (!middle) return topRule.folder
    
    //check if the toprule has subLevels,if not, sending a notice, and returning top folder
    if (!topRule.sublevels){
      loggerUtil.infoNotice(`${top} has no ${properties.middle} rules. Defaulting to ${top} folder. Info in console. `, [file.name, middle])
      return topRule.folder
    }
    //get/check for middle rule. Notifying if it isnt set. 
    const middleRule = topRule.sublevels.find((p) => p.name === middle)
    if (!middleRule) {
      loggerUtil.infoNotice(`${top} has no rule named ${middle}. defaulting to ${top} Destination`)
      return topRule.folder
    }
    const middlePath = normalizePath(`${topRule.folder}/${middleRule.folder}`)
    //check for end, return middle folder if its undefined. 
    const end =(typeof fm[properties.end] === "string")?fm[properties.end]:false
    if (!end) return middlePath
    if (!middleRule.sublevels) {
      loggerUtil.infoNotice(`${middle} has no rules defined. Defaulting to ${middlePath}`)
      return middlePath
    }
    //get and check for middlepath
    const endRule = middleRule.sublevels.find((p) => p.name === end)
    if (!endRule) {
      loggerUtil.infoNotice(`${middle} has no rule named ${end}. Defaulting to ${middlePath}`)
      return middlePath
    }
    const endPath = normalizePath(`${middlePath}/${endRule.folder}`)
    return endPath
  }
}
const frontmatterUtil = FrontmatterUtil.getInstance();
export default frontmatterUtil