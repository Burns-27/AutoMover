import AutoMoverPlugin from "main";
import PropertyRule from "Models/PropertyRule";
import { SettingGroup } from "obsidian";
import { CategoryGroup } from "Settings/CategoryGroup";

export function CategorySection(
	containerEl: HTMLElement,
	plugin: AutoMoverPlugin,
	display: () => void,
) {
	const collapsedRules = plugin.settings.collapseSections.categoryRules;
	/**
	 * Header for project folders
	 */
	const CategoryRuleContainer = containerEl.createDiv({
		cls: "moving_rules_container",
	});

	// Class used from obdsidian's css for consistency
	const categoryRuleDetails = CategoryRuleContainer.createEl("details", {
		cls: "property",
	});
	categoryRuleDetails.createEl("summary", {
		text: "Property Rules",
		cls: ["setting-item-heading"],
	});

	categoryRuleDetails.open = !collapsedRules.main;
	categoryRuleDetails.addEventListener("toggle", async () => {
		collapsedRules.main = !categoryRuleDetails.open;
		await plugin.saveData(plugin.settings);
	});
	/**
	 * Cateory Explanation setting
	 */
	//The Details Element and summary, with is listener
	const categoryExplanationDetails = categoryRuleDetails.createEl("details", {cls:"sub"});
	categoryExplanationDetails.createEl("summary", {
		text: "Instructions for Property Rules",
		cls: ["setting-item-heading"],
	});
	categoryExplanationDetails.open = !collapsedRules.explanation;
	categoryExplanationDetails.addEventListener("toggle", async () => {
		collapsedRules.main = !categoryExplanationDetails.open;
		await plugin.saveData(plugin.settings);
	});
	const categoryExplanation = categoryExplanationDetails.createDiv({cls:"container"})
	//Category Explanation Content
	categoryExplanation.createEl("p", {
		text: "Property Rules will check each file for the property defined as Category Property, and from there match it to a Subcategory, and Type, to move it to the set folder.",
	});
	categoryExplanation.createEl("p", {
		text: 'When Defining folders for Subcategories and Types, they are nested. For example, a Category, Media with a folder of Media, has a subcategory of book, with a folder "books". A file with Category:Media, Subcategory:book would be sorted into Media/books',
	});

	/**
	 * Property Definition Section
	 */
	//Creating the Details and summanry, and its collapsing rules
	const propertyDefinitions = categoryRuleDetails.createEl("details", {cls:"sub"});

	propertyDefinitions.createEl("summary", {
		text: "Property Definitions",
		cls: "setting-item-heading",
	});
	propertyDefinitions.open = !collapsedRules.properties;
	propertyDefinitions.addEventListener("toggle", async () => {
		collapsedRules.main = !propertyDefinitions.open;
		await plugin.saveData(plugin.settings);
	});
	const propDefDiv = propertyDefinitions.createDiv({cls:"container"});
	// Property definition Settings group.
	const propDefSettingGroup = new SettingGroup(propDefDiv);
	propDefSettingGroup.addSetting((category) => {
		category
			.setName("Category property")
			.setDesc(
				"This will be the property to check against listed Category. Click the '+' to add a new Category",
			)
			.addText((text) =>
				text
					.setPlaceholder("property")
					.setValue(plugin.settings.properties.category)
					.onChange(async (value) => {
						plugin.settings.properties.category = value;
						await plugin.saveData(plugin.settings);
					}),
			)
	});
	propDefSettingGroup.addSetting((property) => {
		property
			.setName("Subcategory property")
			.setDesc(
				"This will be the property to check against listed subcategories of the matching category",
			)
			.addText((text) =>
				text
					.setPlaceholder("property")
					.setValue(plugin.settings.properties.subcategory)
					.onChange(async (value) => {
						plugin.settings.properties.subcategory = value;
						await plugin.saveData(plugin.settings);
					}),
			);
	});

	propDefSettingGroup.addSetting((type) => {
		type.setName("Type property")
			.setDesc(
				"This will be the property to check against listed types of the matching subcategories",
			)
			.addText((text) =>
				text
					.setPlaceholder("property")
					.setValue(plugin.settings.properties.type)
					.onChange(async (value) => {
						plugin.settings.properties.type = value;
						await plugin.saveData(plugin.settings);
					}),
			);
	});
	/**
	 * Category List
	 */
	//Creating the Detail and summary for the Category Lists
	const categoryListDetail = categoryRuleDetails.createEl("details", {cls:"sub"});
	const categorySummary = categoryListDetail.createEl("summary", {
		text: "Categories",
		cls: "setting-item-heading",
	});
	categoryListDetail.open = !collapsedRules.list;
	categoryListDetail.addEventListener("toggle", async () => {
		collapsedRules.list = !categoryListDetail.open;
		await plugin.saveData(plugin.settings);
	});

	//The Add New Category Button
	const buttondiv = categorySummary.createDiv({cls:"button"})
	const addCategoryButton = buttondiv.createEl("button", {
		text: `Add Category`,
		cls: "rule_button",
	});
	addCategoryButton.addEventListener("click", () => {
		plugin.settings.categoryRules.push(new PropertyRule());
		display();
	});
	const categoryListGroup = categoryListDetail.createDiv({cls:["container"]})
	const categoryList = categoryListGroup.createDiv()
	/**
	 * Calling the Category Group for each Category defined in spaces
	 */
	for (const category of plugin.settings.categoryRules as PropertyRule[]) {
		CategoryGroup(category, categoryList, plugin, display);
	}
}
