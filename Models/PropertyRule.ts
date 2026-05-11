export default class PropertyRule {
  public Name:string;
  public folder:string;
  public rules:PropertyRule[];
  public collapsed:boolean;
  public listcollapsed:boolean;
  constructor(name?:string,folder?:string,rules?:PropertyRule[],collapsed?:boolean, listcollapsed?:boolean){
    this.Name = name||""
    this.folder = folder||""
    this.rules = rules || []
    this.collapsed = collapsed || false
    this.listcollapsed = collapsed || false
  }
}