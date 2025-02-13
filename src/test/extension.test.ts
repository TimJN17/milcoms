import * as assert from 'assert';
import { suiteTeardown } from 'mocha';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { completionItems }  from '../extension';

const failMsg = "⛔ Completion does not match expression.";

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	// iterate for each milCom expected 
	completionItems.forEach(({keyword, expectedLabel, expectedInsertText}) => {
		test(`TEST: ${keyword}`, async () => {

			// open a new python file and test
			const document = await vscode.workspace.openTextDocument({
				language: "python",
				content: "" // empty file
			});
	
			// define the editor
			const editor = await vscode.window.showTextDocument(document);
	
			// insert 'keyword' 
			await editor.edit(editBuilder => {
				editBuilder.insert(new vscode.Position(0, 0), `${keyword}`);
			});
	
			// trigger the completion using the position & wordlength of the keyword
			const position = new vscode.Position(0, keyword.length);

			// register the vscode executable object
			const completions = await vscode.commands.executeCommand<vscode.CompletionList>(
				"vscode.executeCompletionItemProvider",
				document.uri,
				position
			);
	
			// ensure at least one completion item is provided
			assert.ok(completions && completions.items.length > 0, "No compleition items were provided.");

			// secure items in the completionItemProvider object | there will only be x2 in the current version & no need to loop
			const firstItem = completions.items[0];  // the COMMENT 
			const secondItem = completions.items[1];  // the DOC STRING
	
			// COMMENT: perform assertions for the first item
			assert.strictEqual(firstItem.label, `${expectedLabel} COMMENT`, `${failMsg}`);
			assert.strictEqual(firstItem.insertText, `# ${expectedInsertText}`, `${failMsg}`);
	
			// DOC STRING: perform assertions for the second item
			assert.strictEqual(secondItem.label, `${expectedLabel} DOC STRING`, `${failMsg}`);
			assert.strictEqual(secondItem.insertText, `"""${expectedInsertText}"""`, `${failMsg}`);
	
		});
	});

	suiteTeardown(() => {
		vscode.window.showInformationMessage("All Tests are complete!");
	});
});
