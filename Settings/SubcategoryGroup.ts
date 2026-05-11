import AutoMoverPlugin from "main";
import PropertyRule from "Models/PropertyRule";

export function SubcategoryGroup(
	subcategory: PropertyRule,
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
	const subcategoryProperty = plugin.settings.properties.subcategory;
	const typeProperty = plugin.settings.properties.type;
	const subcategoryDetails = containerEl.createEl("details",{cls:"subcategory"});
	const subcategorySummary = subcategoryDetails.createEl("summary", {
		text: `${subcategoryProperty} - ${subcategory.Name}`,
		cls: ["setting-item-heading"],
	});
	subcategoryDetails.open = !subcategory.collapsed;
	subcategoryDetails.addEventListener("toggle", async () => {
		subcategory.collapsed = !subcategory.collapsed;
		await plugin.saveData(plugin.settings);
	});
	const subcategoryDiv = subcategoryDetails.createDiv({
		cls: "container",
	});
	const subcategoryDefDiv = subcategoryDiv.createDiv({ cls: ["infoDiv"] });
	const subcategoryNameDiv = subcategoryDefDiv.createDiv({
		cls: "input-Div",
	});
	subcategoryNameDiv.createEl("label", {
		text: `${subcategoryProperty} Value:`,
	});
	subcategoryNameDiv.createEl("input", {
		value: subcategory.Name,
		cls: "input",
	}).onchange = (e) => {
		subcategory.Name = (e.target as HTMLInputElement).value;
		debouncedSave();
	};

	const subcategoryFolderDiv = subcategoryDefDiv.createDiv({
		cls: "input-div",
	});
	subcategoryFolderDiv.createEl("label", { text: "Folder:" });
	subcategoryFolderDiv.createEl("input", {
		value: subcategory.folder,
		cls: "input",
	}).onchange = (e) => {
		subcategory.folder = (e.target as HTMLInputElement).value;
		debouncedSave();
	};
	const SubcatButtonDiv = subcategorySummary.createDiv({ cls: "button" });

	const deleteSubcategoryButton = SubcatButtonDiv.createEl("button", {
		text: `Delete this ${subcategoryProperty}`,
	});
	deleteSubcategoryButton.addEventListener("click", () => {
		category.rules = category.rules.filter((s) => s !== subcategory);
		display();
	});
	const typedef = subcategoryDiv.createEl("details", { cls: "list-Section" });
	typedef.open = !subcategory.listcollapsed;
	typedef.addEventListener("toggle", async () => {
		subcategory.listcollapsed = !subcategory.listcollapsed;
		await plugin.saveData(plugin.settings);
	});
	const typeSum = typedef.createEl("summary", {
		text: `${subcategory.Name} ${typeProperty}(s)`,
		cls: ["settings-item-heading"],
	});
	const typeButDiv = typeSum.createDiv({cls:"button"})
	const addTypeButton = typeButDiv.createEl("button", {
		text: `Add ${typeProperty}`,
		cls: "add-Button",
	});
	addTypeButton.addEventListener("click", () => {
		subcategory.rules.push(new PropertyRule());
		display();
	});
	const typeHeadingDiv = typedef.createDiv({ cls: ["info-div","headings"] });
	typeHeadingDiv.createEl("p", { text: "Name" });
	typeHeadingDiv.createEl("p", { text: "Folder" });
	const typeListDiv = typedef.createDiv({ cls: "list" });
	for (const type of subcategory.rules) {
		const typeDiv = typeListDiv.createDiv({ cls: "type" });

		typeDiv.createEl("input", {
			value: type.Name,
			cls: "input",
		}).onchange = (e) => {
			type.Name = (e.target as HTMLInputElement).value;
			debouncedSave();
		};
		typeDiv.createEl("input", {
			value: type.folder,
			cls: "input",
		}).onchange = (e) => {
			type.folder = (e.target as HTMLInputElement).value;
			debouncedSave;
		};
		const deleteTypeButton = typeDiv.createEl("button", {
			text: "x",
			cls: "rule_button",
		});
		deleteTypeButton.addEventListener("click", () => {
			subcategory.rules = subcategory.rules.filter((t) => t != type);
			display();
		});
	}
}
