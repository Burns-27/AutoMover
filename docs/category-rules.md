# Category Rules

Category rules, like project rules allow you to organize files by Category and Type useing frontmatter metatadata. Files with `Category` or `category` field, will be matched against their rules post Project rules.

You can define a Category, and specify further using a `Type` or `type` field.

Categories will move based off listed Type rules first, then default to the Category root.

Ex. A file with

```
---
category: Media
type: book
---
```

With a category rule like this:

Will sort that file into Media/Books
