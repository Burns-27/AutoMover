//import type AutoMoverPlugin from "main";

import type { ExclusionRule } from "Models/ExclusionRule";
import type { MovingRule } from "Models/MovingRule";
import { ProjectRule } from "Models/ProjectRule";
import PropertyRule from "Models/PropertyRule";

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
	
	categoryRules: PropertyRule[];
	automaticMoving: boolean;
	timer: number | null; // in miliseconds
	collapseSections: {
		tutorial: boolean;
		movingRules: boolean;
		exclusionRules: boolean;
		tagRules: boolean;
		projectRules: boolean;
		categoryRules: {
			main:boolean;
			explanation:boolean;
			properties:boolean;
			list:boolean;
		};
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
	type:"Type",
	},
	categoryRules: [],
	automaticMoving: false,
	timer: null,
	collapseSections: {
		tutorial: false,
		movingRules: false,
		exclusionRules: false,
		tagRules: false,
		projectRules: false,
		categoryRules:{
			main:false,
			explanation:false,
			properties:false,
			list:false,
		}
	},
};
/*
function loadSettings(
	AutoMoverPlugin: AutoMoverPlugin,
): Partial<AutoMoverSettings> {
	return Object.assign({}, DEFAULT_SETTINGS, AutoMoverPlugin.loadData());
  moveOnOpen: boolean;
  // moveOnSave: boolean;
  movingRules: MovingRule[];
  exclusionRules: ExclusionRule[];
  tagRules: MovingRule[];
  projectRules: ProjectRule[];
  automaticMoving: boolean;
  timer: number | null; // in miliseconds
  debugLogging: boolean;
  collapseSections: {
    tutorial: boolean;
    movingRules: boolean;
    exclusionRules: boolean;
    tagRules: boolean;
    projectRules: boolean;
  };
}

export const DEFAULT_SETTINGS: Partial<AutoMoverSettings> = {
  moveOnOpen: true,
  // moveOnSave: true,
  movingRules: [],
  exclusionRules: [],
  tagRules: [],
  projectRules: [],
  automaticMoving: false,
  timer: null,
  debugLogging: false,
  collapseSections: {
    tutorial: false,
    movingRules: false,
    exclusionRules: false,
    tagRules: false,
    projectRules: false,
  },
};

/**
 * Loads the plugin settings by merging persisted data on top of DEFAULT_SETTINGS.
 *
 * @param AutoMoverPlugin - The plugin instance used to read persisted data
 * @returns Partial<AutoMoverSettings>
 */
function loadSettings(AutoMoverPlugin: AutoMoverPlugin): Partial<AutoMoverSettings> {
  return Object.assign({}, DEFAULT_SETTINGS, AutoMoverPlugin.loadData());
}
*/