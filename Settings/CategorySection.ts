
import type AutoMoverPlugin from "main";
import PropertyRule from "Models/PropertyRule";

export function CategorySection(
	containerEl: HTMLElement,
	plugin: AutoMoverPlugin,
	display: () => void,
) {
	/**
	 * Debounced save function to avoid excessive disk writes
	 */
	let saveTimeout: NodeJS.Timeout | null = null;
	const debouncedSave = () => {
		if (saveTimeout) clearTimeout(saveTimeout);
		saveTimeout = setTimeout(() => {
			plugin.saveData(plugin.settings);
		}, 500);
	};

	/**
	 * Header for project folders
	 */
	const CategoryRuleContainer = containerEl.createDiv({
		cls: "category",
	});

	// Class used from obdsidian's css for consistency
	const categoryRuleDetails = CategoryRuleContainer.createEl("details", {});
	categoryRuleDetails.createEl("summary", {
		text: "Category Rules",
		cls: ["setting-item-heading"],
	});
	
	categoryRuleDetails.open = !plugin.settings.collapseSections.categoryRules;
	categoryRuleDetails.addEventListener("toggle", async () => {
		plugin.settings.collapseSections.categoryRules =
			!categoryRuleDetails.open;
		await plugin.saveData(plugin.settings);
	});
	//Category explanation setting
	const categoryExplanation = CategoryRuleContainer.createEl("details",{
		text:"How to use category rules",
		cls:['category-subheading']
	})
	categoryExplanation.open = !plugin.settings.collapseSections.categoryExplanation;
	categoryExplanation.addEventListener("toggle",async ()=>{
		plugin.settings.collapseSections.categoryExplanation = !categoryExplanation.open;
		await plugin.saveData(plugin.settings);
	})
	categoryExplanation.createEl("p",{text:"This is just me testing how this works. not sure how this will go."})

	const categoryList = categoryRuleDetails.createDiv({
		cls: "category-rule-container",
	});
	const categoryHeader = categoryList.createDiv({
		cls: "category-heading-container",
	});
	categoryHeader.createEl("p", {
		text: "category name",
		cls: "category-heading",
	});
	categoryHeader.createEl("p", {
		text: "Destination",
		cls: "category-heading",
	});

	const addCategoryButton = categoryHeader.createEl("button", {
		text: "+",
		cls: "rule_button",
	});
	addCategoryButton.addEventListener("click", () => {
		plugin.settings.categoryRules.push(new PropertyRule());
		display();
	});

	/**
	 * List of category
	 */
	for (const category of plugin.settings.categoryRules as PropertyRule[]) {
		const child = categoryList.createDiv({ cls: "category-rule" });
		// Class used from obdsidian's css for consistency
		const movingRulesDetails = child.createEl("details", {});
		const movingRulesSummary = movingRulesDetails.createEl("summary", {
			cls: ["setting-item-heading", "rule"],
		});

		movingRulesDetails.open = !category.collapsed;
		movingRulesDetails.addEventListener("toggle", async () => {
			category.collapsed = !movingRulesDetails.open;
			await plugin.saveData(plugin.settings);
		});

		movingRulesSummary.createEl("input", {
			value: category.Name,
			cls: "rule_input",
		}).onchange = (e) => {
			category.Name = (e.target as HTMLInputElement).value;
			debouncedSave();
		};
		movingRulesSummary.createEl("input", {
			value: category.folder,
			cls: "rule_input",
		}).onchange = (e) => {
			category.folder = (e.target as HTMLInputElement).value;
			debouncedSave();
		};

		const addRuleButton = movingRulesSummary.createEl("button", {
			text: "+",
			cls: "rule_button",
		});
		addRuleButton.addEventListener("click", () => {
			category.rules.push(new PropertyRule());
			display();
		});

		const duplicateRuleButton = movingRulesSummary.createEl("button", {
			text: "⿻",
			cls: "rule_button rule_button_duplicate",
		});
		duplicateRuleButton.addEventListener("click", () => {
			plugin.settings.categoryRules.push(
				new PropertyRule(category.Name, category.folder),
			);
			display();
		});

		const deleteRuleButton = movingRulesSummary.createEl("button", {
			text: "x",
			cls: "rule_button rule_button_remove",
		});
		deleteRuleButton.addEventListener("click", () => {
			plugin.settings.categoryRules =
				plugin.settings.categoryRules.filter((p) => p !== category);
			display();
		});

		const movingRules = movingRulesDetails.createDiv();
		/**
		 * List of category rules
		 */
		for (const rule of category.rules) {
			const child = movingRules.createDiv({ cls: "project_rule" });
			child.createEl("input", {
				value: rule.Name,
				cls: "rule_input",
			}).onchange = (e) => {
				rule.Name = (e.target as HTMLInputElement).value;
				debouncedSave();
			};
			child.createEl("input", {
				value: rule.folder,
				cls: "rule_input",
			}).onchange = (e) => {
				rule.folder = (e.target as HTMLInputElement).value;
				debouncedSave();
			};

			const duplicateRuleButton = child.createEl("button", {
				text: "⿻",
				cls: "rule_button rule_button_duplicate",
			});
			duplicateRuleButton.addEventListener("click", () => {
				category.rules.push(new PropertyRule(rule.Name, rule.folder));
				display();
			});

			const deleteRuleButton = child.createEl("button", {
				text: "x",
				cls: "rule_button rule_button_remove",
			});
			deleteRuleButton.addEventListener("click", () => {
				category.rules = category.rules.filter((r) => r !== rule);
				display();
			});
		}
	}
}
