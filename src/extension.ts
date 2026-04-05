import * as vscode from "vscode";
import {
  cycleText,
  DEFAULT_ORDER,
  normalizeOrder,
} from "./caseCycle";

export function activate(context: vscode.ExtensionContext): void {
  const disposable = vscode.commands.registerCommand(
    "camelcase.cycle",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const config = vscode.workspace.getConfiguration("camelcase");
      const order = normalizeOrder(
        config.get<string[]>("order") ?? DEFAULT_ORDER
      );

      const uri = editor.document.uri;
      const edit = new vscode.WorkspaceEdit();
      let replacements = 0;

      for (const selection of editor.selections) {
        let range: vscode.Range | undefined = selection;
        if (range.isEmpty) {
          const word = editor.document.getWordRangeAtPosition(
            range.active
          );
          if (!word) {
            continue;
          }
          range = word;
        }

        const text = editor.document.getText(range);
        const result = cycleText(text, order);
        if (!result) {
          continue;
        }
        edit.replace(uri, range, result.next);
        replacements += 1;
      }

      if (replacements === 0) {
        void vscode.window.showInformationMessage(
          "Camel Case: nothing to transform (empty or no word at cursor)."
        );
        return;
      }

      await vscode.workspace.applyEdit(edit);
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate(): void {}
