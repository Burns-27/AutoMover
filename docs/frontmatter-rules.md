# Frontmatter Rules

These rules allow you to organize files by properties you define.

You can define 3 properties to use, these default to `Category`, `Type`, and `Subtype`.

Each file will be checked for those properties first, and moved based on the rules you set.

For reference, frontmatter refers to the obsidian file properties defined at the top of a note, enclosed within triple dashes (`---`).

Reference to file properties: https://help.obsidian.md/properties

## Mechanics of Frontmatter rules

**Frontmatter rules** are nested in 3 levels, `Top`, `Middle`, and `End`

Files will first match against the Top level rules. If the file doesnt have the Top level property, or it isnt listed in the rules, It moves on to be checked for [Project rules](project-rules.md).

If there is a matching Top level rule, it will then match against the middle, and repeat for the end.

If middle or end dont match, it will fall back to the proceeding level.

## Examples

Take a look at some examples using the default property vaules.

**Frontmatter Rules**
![alt text](image.png)

### Matching Subtype Property

**Frontmatter**

```yaml
---
Category: media
Type: book
Subtype: fiction
tags:
---
```

**Destination**
`Media/Books/Fiction`

### Matching Type Property

**Frontmatter**

```yaml
---
Category: media
Type: article
---
```

**Destination**
`Media/Article`

### Non-Matching Subtype Property

**Frontmatter**

```yaml
---
Category: media
Type: book
Subtype: fantasy
---
```

**Destination**
`Media/Books`

Since there is no Subtype rule of fantasy, it defaults to the Type rule location

### Non-Matching Type Property

**Frontmatter**

```yaml
---
Category: media
Type: video
Subtype: youtube
---
```

**Destination**
`Media`

Since there isnt a Type rule of video, it defaults to the Category Rule, and doesnt look at the Subtype.
