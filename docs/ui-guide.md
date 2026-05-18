# UI Guide

## Introduction to the UI

This image shows the UI of the plugin with numbers attached to each part of the UI.
The numbers are elaborate below the image.

![settingsUpdatedWithExportImport](https://github.com/user-attachments/assets/70819309-abf1-4537-8106-7705995a03ae)

1. **Plugin location**: This is where you can access the plugin's settings.
2. **Export/Import**: This is where you can export and import the settings you have set up.
3. **On-open toggle button**: This button toggles whether the plugin will run when you open a file.
4. **Manual run button**: This button will run the mover manually for all the files in the obsidian vault.
5. **Automatic moving toggle and input**: This toggle and input will allow you to set a time interval in which the plugin will run automatically. If the time is not set it won't run automatically.
6. **Quick Tutorial**: This is a quick tutorial and reminder on how to use the plugin.
7. **Search criteria**: This is where you can input strings or regex that will be used to match the files you want to move.
8. **Destination path**: This is where you can input the destination path for the files that match the search criteria.
9. **Add rule button**: This button will add a rule to the list of rules.
10. **Delete rule button**: This button will delete the selected rule from the list of rules.
11. **Duplicate rule button**: This button will duplicate the selected rule from the list of rules.


## Notifications for the Moving Toggles

Each of the three moving triggers above (on-open, manual run, automatic timer) reports back differently:

- **On-open**: when opening a file actually triggers a move, a short notice is shown - `1 file moved.`, `1 file not moved - duplicate name.`, or `1 file failed to move.`. Opening a file that doesn't match any rule stays silent so normal navigation isn't interrupted.
- **Manual run** (ribbon icon or `AutoMover: Move files` command): always reports a summary, including `No files needed to be moved.` when nothing matched. This is the path to use when you want explicit confirmation of what happened.
- **Automatic timer**: only shows a notice when at least one file was actually moved on that tick. Duplicate-name skips and move failures are intentionally suppressed here, because those conditions persist across ticks - a filename that collides today will still collide on the next tick, and a rule with a bad destination will keep failing - so reporting them every interval would spam notices indefinitely. If you need the full breakdown of duplicates and failures, trigger a manual run.


## Debug Logging Toggle

Directly below the moving toggles there is a **Debug logging** toggle. It is placed there on purpose - the rule lists further down can grow long, and burying a developer-facing switch at the very bottom of the settings tab makes it awkward to reach. It is independent of the moving toggles above and controls verbose console output, not Obsidian notices.

- When **off** (the default), only error-level messages and the user-facing notices described above are produced. This is the right setting for normal use.
- When **on**, the plugin writes extra `debug` and `info` messages to the developer console (open it with `Ctrl+Shift+I` in Obsidian). These include things like which rule matched a given file, why a move was skipped as a duplicate, and the path a file was renamed to. None of this appears as a notice in the editor - you have to open the dev tools to see it.

Leave this off unless you are diagnosing an issue or filing a bug report. The verbose output is meant to make problems reproducible, not to be read during regular use.


## Export and Import

By default, if you are using some way of syncing your obsidian vaults, this doesn't provide anyting new for you.
However, if you wish to transition your notes accross devices which aren't synced or accross vaults, this makes your life easier.

The export and import buttons are used to export and import the settings you have set up.
In case your device can't open a file manager for you to choose the destination and name for the file,
then it will save the settings in the root folder of your vault with the name "AutoMoverSettings.json".

**Obsidian doesn't show json files by default, so you will have to use a file manager to see the file.**
I didn't want the file to be popping out of your notes, I don't consider it more important than your notes.

The same goes for the import button, if your device can't open a file manager for you to choose the file to import,
then it will look for the file "AutoMoverSettings.json" in the root folder of your vault.

Importing new settings will overwrite the current settings you have set up and there is no undo button.
Therefore, the best thing to do is to export the settings before importing new ones, in case you care about them.

## Timer and Timed Moving

The time displayed is an interval, 20:00:00 will execucte every 20 hours.
Other examples could include:
1. 00:05:00 -> triggers every five minutes
2. 00:00:05 -> triggers every five seconds
3. 72:30:00 -> triggers every 3 days and 30 minutes (if your Device is online and obsidian runnning for that long)

## Collapsible UI Sections

From patch 1.0.7 onwards, all rule sections can be collapsed and expanded for better organization (image below).
Each section (Tutorial, Moving Rules, Exclusion Rules, Tag Rules, and Project Rules) can be individually collapsed by clicking on the section header.

Additionally, individual project rules can be collapsed to hide their sub-rules, making it easier to manage multiple projects without cluttering the interface.

The collapse state is saved automatically, so your preferred view will persist between sessions.

<img width="1548" height="475" alt="image" src="https://github.com/user-attachments/assets/a8ef8f50-196c-4658-ae3d-9dba2daf896a" />


## Project Rules UI

From patch 1.0.7 onwards, you can use project rules to group moving rules together.
And to move files based on the project they belong to.
Project rules take precedence over the normal moving rules considering they are way more specific.

Each project rule can be collapsed individually to hide its sub-rules, and the entire Project Rules section can also be collapsed.

<img width="1531" height="611" alt="image" src="https://github.com/user-attachments/assets/c74d13de-6a2f-48f7-bc48-3e25f0f607e9" />

1. **Add Project rule button**: This button will add a project rule to the list of project rules.
2. **Delete rule button**: This button will delete the selected project rule from the list of rules.
3. **Duplicate rule button**: This button will duplicate the selected project rule from the list of rules.
4. **Collapse/Expand arrow**: This arrow will collapse or expand the project rule to hide or show its sub-rules.
5. **Add moving rule button**: This button will add a moving rule to the selected project rule.
6. **Delete moving rule button**: This button will delete the selected moving rule from the project rule.
7. **Duplicate moving rule button**: This button will duplicate the selected moving rule

On the picture you can see also an expanded project rule with two moving rules inside it.
And below it a collapsed project rule.


## Tag Rules UI

From patch 1.0.6 onwards, you can move files using tags.
It takes into account the first rule that is a match,
**if it first matches with a FileName rule, it won't check the Tag rules.**
There are no pictures for this one, as it is identical to the previous ruleset.


## Exclusion Rules UI

From patch 1.0.2 onwards, you can exclude files and folders from being moved.
The UI that is used for the exclusion rules is the same as the one used for the search criteria.
But here is a quick glance at how it looks:

![ImageOfExclusionRules](https://github.com/user-attachments/assets/d2d6e30b-c36f-4650-833f-46036ba864d4)

1. **Excluded folder or files**: This is where you can input the folder or file paths you want to exclude from being moved.
2. **Add rule button**: This button will add a rule to the list of rules.
3. **Delete rule button**: This button will delete the selected rule from the list of rules.
4. **Duplicate rule button**: This button will duplicate the selected rule from the list of rules.


## Command Palette

From patch 1.0.4 onwards, you can access the plugin from the command palette.
With the available commands being:
- **AutoMover: Move files**: This command will run the mover manually for all the files in the obsidian vault.

## Sidebar (Ribbon)

From patch 1.0.4 onwards, you can access the plugin from the sidebar (ribbon).
In case you need something faster than the command palette, now you have the the option to use the button in the sidebar.
This is what it looks like:

![sidebarRibbon](https://github.com/user-attachments/assets/a632cecf-9113-45c2-947e-ab5ac85c47d9)
