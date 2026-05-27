import AutoMoverPlugin from "main";
import { FrontmatterRule } from "Models/FrontmatterRule";
import { Modal, Setting, SettingGroup } from "obsidian";

export class FrontmatterModal extends Modal {
  private plugin:AutoMoverPlugin
	constructor(plugin: AutoMoverPlugin, top: FrontmatterRule) {
		super(plugin.app);
    this.plugin = plugin
		new Setting(this.contentEl)
			.setName(`${plugin.settings.frontmatterProperties.top}`)
			.setDesc(`Case-sensitive`)
			.addText((text) => {
				text.setValue(top.name).onChange((value) => {
					top.name = value;
				});
			});
		new Setting(this.contentEl).setName("Destination").addText((text) => {
			text.setValue(top.folder).onChange((value) => {
				top.folder = value;
			});
		});
		new Setting(this.contentEl)
			.setName(
				`List of ${plugin.settings.frontmatterProperties.middle} rules`,
			)
			.addButton((button) => {
				button.setButtonText("Add Rule").onClick(() => {
					const newMiddle = new FrontmatterRule("middle");
          top.sublevels.push(newMiddle);
          this.MiddleSectionGroup(newMiddle)
				});
			});
		for (const middle of top.sublevels) {
      this.MiddleSectionGroup(middle);
    }
    new Setting(this.contentEl)
      
      .addButton((button) => {
        button.setButtonText("Save")
          .onClick(async () => {
            await plugin.saveData(plugin.settings)
            this.close()
        })
    })
	}
	MiddleSectionGroup(middle: FrontmatterRule) {
		const middleSettingGroup = new SettingGroup(this.contentEl);
		middleSettingGroup.addSetting((setting) => {
			setting
				.setName(
					`${this.plugin.settings.frontmatterProperties.middle} Value`,
				)
				.setDesc(`Case-sensive`)
				.addText((text) => {
					text.setValue(middle.name).onChange((value) => {
						middle.name = value;
					});
				});
		});
		middleSettingGroup.addSetting((setting) => {
			setting.setName("Destination").addText((text) => {
				text.setValue(middle.folder).onChange((value) => {
					middle.folder = value;
				});
			});
		});
		middleSettingGroup.addSetting((setting) => {
			setting
				.setHeading()
				.setName(
					`List of ${this.plugin.settings.frontmatterProperties.end} rules`,
				)
				.addButton((button) => {
          button.setButtonText("Add Rule").onClick(() => {
            const newEnd = new FrontmatterRule("end");
            middle.sublevels.push(newEnd);
            middleSettingGroup.addSetting((setting) => {
				setting
					.setName(`Name/Destination`)
					.setDesc(`edit the respective fields to adjust setting`)
					.addText((text) => {
						text.setPlaceholder("Name").onChange((value) => {
							newEnd.name = value;
						});
					})
					.addText((text) => {
						text.setPlaceholder("Destination").onChange((value) => {
							newEnd.folder = value;
						});
					});
			});
					});
				});
		});

		for (const end of middle.sublevels) {
			middleSettingGroup.addSetting((setting) => {
				setting
					.setName(`${end.name}/${end.folder}`)
					.setDesc(`edit the respective fields to adjust setting`)
					.addText((text) => {
						text.setValue(end.name).onChange((value) => {
							end.name = value;
						});
					})
					.addText((text) => {
						text.setValue(end.folder).onChange((value) => {
							end.folder = value;
						});
					});
			});
		}
	}
}
