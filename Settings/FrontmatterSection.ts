import AutoMoverPlugin from "main";
import { FrontmatterRule } from "Models/FrontmatterRule";
import { SettingGroup } from "obsidian";
import { FrontmatterModal } from "Settings/FrontmatterModal";

export function frontmatterSection(containerEl: HTMLElement, plugin: AutoMoverPlugin, display: () => void) {
  let saveTimeout: NodeJS.Timeout | null = null;
  const debouncedSave = () => {
    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      plugin.saveData(plugin.settings);
    }, 500);
  }
  const levelRuleContainer = containerEl.createDiv({ cls: "moving_rules_container" });

  const frontmatterRuleDetails = levelRuleContainer.createEl("details", {})
  frontmatterRuleDetails.createEl("summary", { text: "Frontmatter Rules", cls: ["setting-item-heading"] });
  frontmatterRuleDetails.open = !plugin.settings.collapseSections.frontmatterRules;
  frontmatterRuleDetails.addEventListener("toggle", async () => {
    plugin.settings.collapseSections.frontmatterRules = !frontmatterRuleDetails.open;
    await plugin.saveData(plugin.settings);
  })


  const frontmatterPropertiesRuleGroup = new SettingGroup(frontmatterRuleDetails)
  frontmatterPropertiesRuleGroup.setHeading("Properties")
  frontmatterPropertiesRuleGroup.addSetting((setting) => {
    setting.setName("Top Level")
      .setDesc("This property is the first that will be checked against")
      .addText((text) => {
        text.setValue(plugin.settings.frontmatterProperties.top)
          .onChange((value) => {
            plugin.settings.frontmatterProperties.top = value
            debouncedSave()
          })
      })
  })
  frontmatterPropertiesRuleGroup.addSetting((setting) => {
    setting.setName("Middle Level")
      .setDesc("This is the property that will be checked against the top level's rules")
      .addText((text) => {
        text.setValue(plugin.settings.frontmatterProperties.middle)
          .onChange((value) => {
            plugin.settings.frontmatterProperties.middle = value
            debouncedSave()
          })
      })
  })
    frontmatterPropertiesRuleGroup.addSetting((setting) => {
    setting.setName("End Level")
      .setDesc("This is the property that will be checked against the middle level's rules")
      .addText((text) => {
        text.setValue(plugin.settings.frontmatterProperties.end)
          .onChange((value) => {
            plugin.settings.frontmatterProperties.end = value
            debouncedSave()
          })
      })
    })
  const toplevelRuleGroup = new SettingGroup(frontmatterRuleDetails)
  toplevelRuleGroup.addSetting((setting) => {
    setting.setName(`List of ${plugin.settings.frontmatterProperties.top} rules`)
      .addButton((button) => {
        button.setButtonText("add Rule")
          .onClick(async () => {
            const newTop = new FrontmatterRule("top")
            plugin.settings.frontmatterRules.push(newTop)
          new FrontmatterModal(plugin, newTop).open()
        })
    })
  })
  for (const rule  of plugin.settings.frontmatterRules) {
    toplevelRuleGroup.addSetting((setting) => {
      setting.setName(`${rule.name}`)
      setting.setDesc(`Destination: ${rule.folder}`)
      setting.addButton((button) => {
        button.setButtonText("Edit")
          .onClick(async() => {
          new FrontmatterModal(plugin, rule).open()
        })
      })
    })
  }
}