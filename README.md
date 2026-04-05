# Camel Case (VS Code / Cursor)

Cycle the selection—or the word under each cursor—through **kebab-case**, **SCREAMING_SNAKE_CASE**, **PascalCase**, **camelCase**, **snake_case**, and **space** separated words, similar to the [JetBrains Camel Case Plugin](https://github.com/netnexus/camelcaseplugin).

Works in **VS Code** and **Cursor** (same extension format).

## Usage

1. Select text, or place the cursor on a word (empty selection uses the word range from the language configuration).
2. Run **Camel Case: Cycle Case** from the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`), or press **Shift+Alt+U** (macOS: **Shift+Option+U**).

Each invocation advances to the next style in your configured order. If the current text does not match any variant, the first style in the order is applied.

### Multiple cursors

Each selection or word is transformed independently in one edit.

## Settings

| ID | Setting | Description |
|----|---------|-------------|
| `camelcase.order` | Array of format ids | Cycle order. Omitted ids are not used. Default: `kebab`, `screaming`, `pascal`, `camel`, `snake`, `space`. |

Allowed values: `kebab`, `screaming`, `pascal`, `camel`, `snake`, `space`.

Example (`settings.json`):

```json
"camelcase.order": ["camel", "pascal", "snake", "kebab"]
```

## Development

```bash
npm install
npm run compile
npm test
```

Press **F5** in VS Code/Cursor to launch the **Extension Development Host** (uses the default build task: `npm run watch`).

Package a `.vsix`:

```bash
npm run compile
npx vsce package
```

## Keybinding conflicts

**Shift+Alt+U** may overlap with another extension or built-in command. If nothing happens, open **Keyboard Shortcuts**, search for `Cycle Case`, and assign a different key.

## License

MIT. See [LICENSE](LICENSE).
