//import type AutoMoverPlugin from "main";
import { CategoryRule } from "Models/CategoryRule";
import type { ExclusionRule } from "Models/ExclusionRule";
import type { MovingRule } from "Models/MovingRule";
import { ProjectRule } from "Models/ProjectRule";

export interface AutoMoverSettings {
	moveOnOpen: boolean;
	// moveOnSave: boolean;
	movingRules: MovingRule[];
	exclusionRules: ExclusionRule[];
	tagRules: MovingRule[];
	projectRules: ProjectRule[];
	properties:{
		category:string;
	subcategory:string;
	type:string;
	}
	
	categoryRules: CategoryRule[];
	automaticMoving: boolean;
	timer: number | null; // in miliseconds
	collapseSections: {
		tutorial: boolean;
		movingRules: boolean;
		exclusionRules: boolean;
		tagRules: boolean;
		projectRules: boolean;
		categoryRules: boolean;
		categoryExplanation:boolean;
	};
}

export const DEFAULT_SETTINGS: Partial<AutoMoverSettings> = {
	moveOnOpen: true,
	// moveOnSave: true,
	movingRules: [],
	exclusionRules: [],
	tagRules: [],
	projectRules: [],
	properties:{
		category:"Category",
	subcategory:"Subcategory",
	type:"type",
	},
	
	categoryRules: [],
	automaticMoving: false,
	timer: null,
	collapseSections: {
		tutorial: false,
		movingRules: false,
		exclusionRules: false,
		categoryExplanation:false,
		tagRules: false,
		projectRules: false,
		categoryRules: false,
	},
};
/*
function loadSettings(
	AutoMoverPlugin: AutoMoverPlugin,
): Partial<AutoMoverSettings> {
	return Object.assign({}, DEFAULT_SETTINGS, AutoMoverPlugin.loadData());
}
*/