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

Recommended: [pnpm](https://pnpm.io/). The `packageManager` field in `package.json` is for [Corepack](https://nodejs.org/api/corepack.html) when `corepack` is available; **you do not need Corepack** if you install pnpm some other way.

### Installing pnpm (pick one)

- **Volta** (common when `corepack` is missing from PATH):

  ```bash
  volta install pnpm@9.15.4
  ```

- **npm**:

  ```bash
  npm install -g pnpm
  ```

- **Corepack** (only if the `corepack` binary exists—try `which corepack`, or on some installs it lives next to `node`):

  ```bash
  corepack enable
  corepack prepare pnpm@9.15.4 --activate
  ```

### Commands

```bash
pnpm install
pnpm run compile
pnpm test
```

Using **npm** instead is fine: `npm install`, `npm run compile`, `npm test`, and `npx vsce package`.

Press **F5** in VS Code/Cursor to launch the **Extension Development Host** (default build task runs the `watch` script via the **npm** task type, which works after either `pnpm install` or `npm install`).

Package a `.vsix`:

```bash
pnpm run compile
pnpm exec vsce package
```

(or `npm run compile` and `npx vsce package`).

## Keybinding conflicts

**Shift+Alt+U** may overlap with another extension or built-in command. If nothing happens, open **Keyboard Shortcuts**, search for `Cycle Case`, and assign a different key.

## License

MIT. See [LICENSE](LICENSE).
