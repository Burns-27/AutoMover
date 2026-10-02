export class MainRule {
    public propertyValue: string;
    public folder: string;
    public rules: Array<SubRule>;
    public collapsed:boolean;
    constructor(propertyValue?:string, folder?:string, rules?:Array<SubRule>, collapsed?:boolean){
        this.propertyValue = propertyValue || "";
        this.folder = folder||"";
        this.rules = rules||[];
        this.collapsed = collapsed || false;
    }
}

export class SubRule{
    public propertyValue: string;
    public folder:string;
    constructor(propertyValue?:string, folder?:string){
        this.folder= folder||""
        this.propertyValue = propertyValue||""
    }
}