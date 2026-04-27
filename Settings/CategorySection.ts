import * as obsidian from "obsidian";
import type AutoMoverPlugin from "main";
import { CategoryRule } from "Models/CategoryRule";
import { TypeRule } from "Models/TypeRule";

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
		cls: "moving_rules_container",
	});

	// Class used from obdsidian's css for consistency
	const categoryRuleDetails = CategoryRuleContainer.createEl("details", {});
	categoryRuleDetails.createEl("summary", {
		text: "category rules",
		cls: ["setting-item-heading"],
	});

	categoryRuleDetails.open = !plugin.settings.collapseSections.categoryRules;
	categoryRuleDetails.addEventListener("toggle", async () => {
		plugin.settings.collapseSections.categoryRules =
			!categoryRuleDetails.open;
		await plugin.saveData(plugin.settings);
	});

	const categoryList = categoryRuleDetails.createDiv({
		cls: "rule_list",
	});
	const categoryHeader = categoryList.createDiv({
		cls: "rule margig_right",
	});
	categoryHeader.createEl("p", {
		text: "category name",
		cls: "rule_title",
	});
	categoryHeader.createEl("p", {
		text: "Destination",
		cls: "rule_title",
	});

	const addCategoryButton = categoryHeader.createEl("button", {
		text: "+",
		cls: "rule_button",
	});
	addCategoryButton.addEventListener("click", () => {
		plugin.settings.categoryRules.push(new CategoryRule());
		display();
	});

	/**
	 * List of category
	 */
	for (const category of plugin.settings.categoryRules as CategoryRule[]) {
		const child = categoryList.createDiv({ cls: "category" });

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
			value: category.CategoryName,
			cls: "rule_input",
		}).onchange = (e) => {
			category.CategoryName = (e.target as HTMLInputElement).value;
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
			category.rules.push(new TypeRule());
			display();
		});

		const duplicateRuleButton = movingRulesSummary.createEl("button", {
			text: "⿻",
			cls: "rule_button rule_button_duplicate",
		});
		duplicateRuleButton.addEventListener("click", () => {
			plugin.settings.categoryRules.push(
				new CategoryRule(category.CategoryName, category.folder),
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
				value: rule.TypeName,
				cls: "rule_input",
			}).onchange = (e) => {
				rule.TypeName = (e.target as HTMLInputElement).value;
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
				category.rules.push(new TypeRule(rule.TypeName, rule.folder));
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
