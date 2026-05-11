import { TypeRule } from "Models/TypeRule";

/**
 * Subcategory rules for defining where to move files within a category.
 */
export class SubcategoryRule{
  public SubcategoryName:string;
  public folder:string;
  public Types:TypeRule[];
  public collapsed:boolean;
  constructor(
    subcategoryName?:string,
    folder?:string,
    types?:TypeRule[],
    collapsed?:boolean,
  ){
    this.SubcategoryName = subcategoryName||"";
    this.folder = folder||"";
    this.Types = types||[];
    this.collapsed = collapsed||false;
  }
}