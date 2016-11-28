# Naming

## Singularity

Names where possible should be in singular form. For example:

- File names should be singular (`constants.js` -> `constant.js`).
- Directory names should be singular (`entries` -> `entry`).

## Aliases

Alias names should be one word and should represent a path. They should be concise and should be useful. Names of aliases should begin with an `@` to make it clear of it's intention.

Use aliases where possible as it makes the files location irrelevant and easy to move.

## Directories

Directory names should use `kebab-case` for readability.

## Routes

Route urls should use `kebab-case` for multi-word segments.

Route component names should use `PascalCase`, as this is used via the DevTools and will be the initialised name.

## Custom elements in templates

Use `kebab-case` to follow W3C specification.

## Code splitting

Code splitting should use `kebab-case` for naming chunks

## Global constants

Global application constants should use `SCREAMING_SNAKE_CASE` in most scenarios.

Mutation names should follow CRUD conventions, for example. `MODULE_DELETE` or `MODULE_ITEM_CREATE`.

## Tests

Test directory structure and naming should match that of the application source for consistency.

Test specs should be named `*.spec.js` for clarity.

# Fuzzy finder tips

http://jbranchaud.github.io/splitting-atoms/TipsAndTricks.html#FuzzyFileFinder
