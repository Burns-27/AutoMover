import AutoMoverPlugin from "main";
import PropertyRule from "Models/PropertyRule";
import { SubcategoryGroup } from "Settings/SubcategoryGroup";

export function CategoryGroup(
	category: PropertyRule,
	containerEl: HTMLElement,
	plugin: AutoMoverPlugin,
	display: () => void,
) {
	let saveTimeout: NodeJS.Timeout | null = null;
	const debouncedSave = () => {
		if (saveTimeout) clearTimeout(saveTimeout);
		saveTimeout = setTimeout(() => {
			plugin.saveData(plugin.settings);
		}, 500);
	};
	const categoryProperty = plugin.settings.properties.category;
	const subcategoryProperty = plugin.settings.properties.subcategory;
	const categoryDetails = containerEl.createEl("details", {
		cls: "category",
	});
	const categorySummary = categoryDetails.createEl("summary", {
		text: `${categoryProperty} - ${category.Name}`,
		cls: ["setting-item-heading"],
	});
	categoryDetails.open = !category.collapsed;
	categoryDetails.addEventListener("toggle", async () => {
		category.collapsed = !category.collapsed;
		await plugin.saveData(plugin.settings);
	});	
  const categoryButtonDiv = categorySummary.createDiv({ cls: "button" });
	
	const deleteCategoryButton = categoryButtonDiv.createEl("button", {
		text: `Delete this ${categoryProperty}`,
	});
	deleteCategoryButton.addEventListener("click", () => {
		plugin.settings.categoryRules = plugin.settings.categoryRules.filter(
			(c) => c != category,
		);
	});
	const categoryDiv = categoryDetails.createDiv({ cls: ["container"] });
	const categoryDefDiv = categoryDiv.createDiv({ cls: ["infoDiv"] });
	const categoryNameDiv = categoryDefDiv.createDiv({
		cls: "input-Div",
	});
	categoryNameDiv.createEl("label", { text: `${categoryProperty} Value: ` });
	categoryNameDiv.createEl("input", {
		value: category.Name,
		cls: "input",
	}).onchange = (e) => {
		category.Name = (e.target as HTMLInputElement).value;
		debouncedSave();
	};
	const categoryFolderDiv = categoryDefDiv.createDiv({
		cls: "input-div",
	});
	categoryFolderDiv.createEl("label", { text: "Folder:" });
	categoryFolderDiv.createEl("input", {
		value: category.folder,
		cls: "input",
	}).onchange = (e) => {
		category.folder = (e.target as HTMLInputElement).value;
		debouncedSave();
	};



	const subcategoryDef = categoryDiv.createEl("details", {});
	subcategoryDef.open = !category.listcollapsed;
	subcategoryDef.addEventListener("toggle", async () => {
		category.listcollapsed = !category.listcollapsed;
		await plugin.saveData(plugin.settings);
	});
	const subcateSum = subcategoryDef.createEl("summary", {
		text: `${category.Name} ${subcategoryProperty}(s)`,
    cls: ["setting-item-heading"],
	});
  const subcatButDiv = subcateSum.createDiv({cls:"button"})
  const addSubcategoryButton = subcatButDiv.createEl("button", {
		text: `Add ${subcategoryProperty}`,
		cls: "add-Button",
	});
	addSubcategoryButton.addEventListener("click", () => {
		category.rules.push(new PropertyRule());
		display();
	});
	const subcategoryDiv = subcategoryDef.createDiv({ cls: ["container"] });
	for (const subCategory of category.rules) {
		SubcategoryGroup(
			subCategory,
			category,
			subcategoryDiv,
			plugin,
			display,
		);
	}
}
