import AutoMoverPlugin from "main";
import { MainRule, SubRule } from "Models/PropertyRules";
import { Setting } from "obsidian";

export function propertySection(
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

	const propertyRuleContainer = containerEl.createDiv({
		cls: "moving_rules_container",
	});

	const propertyRuleDetails = propertyRuleContainer.createEl("details", {});
	propertyRuleDetails.createEl("summary", {
		text: "Property Rules",
		cls: ["setting-item-heading"],
	});
	propertyRuleDetails.open = !plugin.settings.collapseSections.propertyRules;
	propertyRuleDetails.addEventListener("toggle", async () => {
		plugin.settings.collapseSections.propertyRules =
			!propertyRuleDetails.open;
		await plugin.saveData(plugin.settings);
	});
	const explanation = propertyRuleDetails.createDiv();
    const MainPropertyInput = new Setting(explanation)
    MainPropertyInput.setName("Main Property")
    MainPropertyInput.setDesc("The first property to match against")
    MainPropertyInput.addText((text)=>{
        text.setValue(plugin.settings.mainProperty)
        text.onChange((value)=>{
            plugin.settings.mainProperty = value
            debouncedSave()
        })
    const SubPropertyInput = new Setting(explanation)
    SubPropertyInput.setName("Sub Property")
    SubPropertyInput.setDesc("Once matched with main property, will check this property against sub rules.")
    SubPropertyInput.addText((text)=>{
        text.onChange((value)=>{
            plugin.settings.subProperty = value
            debouncedSave()
        })
        text.setValue(plugin.settings.subProperty)
    })
    })

	const propertyList = propertyRuleDetails.createDiv({ cls: "rule_list" });
	const propertyHeader = propertyList.createDiv({ cls: "rule margig_right" });
	propertyHeader.createEl("p", {
		text: `${plugin.settings.mainProperty}`,
		cls: "rule_title",
	});
	propertyHeader.createEl("p", { text: "Destination", cls: "rule_title" });

	const addPropertyButton = propertyHeader.createEl("button", {
		text: "+",
		cls: "rule_button",
	});
	addPropertyButton.addEventListener("click", () => {
		plugin.settings.propertyRules.push(new MainRule());
		display();
	});

	for (const main of plugin.settings.propertyRules) {
		const child = propertyList.createDiv({ cls: "property" });
		const mainRuleDetails = child.createEl("details", {});
		const mainRulesSummary = mainRuleDetails.createEl("summary", {
			cls: "setting-item-heading rule",
		});
		mainRuleDetails.open = !main.collapsed;
		mainRuleDetails.addEventListener("toggle", async () => {
			main.collapsed = !mainRuleDetails.open;
			await plugin.saveData(plugin.settings);
		});
		mainRulesSummary.createEl("input", {
			value: main.propertyValue,
			cls: "rule_input",
		}).onchange = (e) => {
			main.propertyValue = (e.target as HTMLInputElement).value;
			debouncedSave();
		};
		mainRulesSummary.createEl("input", {
			value: main.folder,
			cls: "rule_input",
		}).onchange = (e) => {
			main.folder = (e.target as HTMLInputElement).value;
			debouncedSave();
		};
		const addSubButton = mainRulesSummary.createEl("button", {
			text: "+",
			cls: "rule_button",
		});
		addSubButton.addEventListener("click", () => {
			main.rules.push(new SubRule());
			display();
		});
		const duplicateRuleButton = mainRulesSummary.createEl("button", {
			text: "⿻",
			cls: "rule_button rule_button_duplicate",
		});
		duplicateRuleButton.addEventListener("click", () => {
			plugin.settings.propertyRules.push(
				new MainRule(main.propertyValue, main.folder),
			);
			display();
		});
		const deleteRuleButton = mainRulesSummary.createEl("button", {
			text: "x",
			cls: "rule_button rule_button_remove",
		});
		deleteRuleButton.addEventListener("click", () => {
			plugin.settings.propertyRules =
				plugin.settings.propertyRules.filter((p) => p !== main);
			display();
		});
		const subRules = mainRuleDetails.createDiv();

		for (const sub of main.rules) {
			const child = subRules.createDiv({ cls: "project_rule" });
			child.createEl("input", {
				value: sub.propertyValue,
				cls: "rule_input",
			}).onchange = (e) => {
				sub.propertyValue = (e.target as HTMLInputElement).value;
				debouncedSave();
			};
			child.createEl("input", {
				value: sub.folder,
				cls: "rule_input",
			}).onchange = (e) => {
				sub.folder = (e.target as HTMLInputElement).value;
				debouncedSave();
			};
			const duplicateRuleButton = child.createEl("button", {
				text: "⿻",
				cls: "rule_button rule_button_duplicate",
			});
			duplicateRuleButton.addEventListener("click", () => {
				main.rules.push(new SubRule(sub.propertyValue, sub.folder));
				display();
			});
			const deleteRuleButton = child.createEl("button", {
				text: "x",
				cls: "rule_button rule_button_remove",
			});
			deleteRuleButton.addEventListener("click", () => {
				main.rules = main.rules.filter((r) => r !== sub);
				display();
			});
		}
	}
}
