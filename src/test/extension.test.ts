import * as assert from 'assert';
import { suiteTeardown } from 'mocha';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import completionItems from '../extension';
// import * as myExtension from '../../extension';

// Define expected completion items with corresponding emoji comments | Note the differences for each 'comment' vs. 'doc string'
// const completionItems = [
// 	{ keyword: "DANGER", expectedLabel: "DANGER", expectedInsertText: "❗DANGER :" },
// 	{ keyword: "WARNING", expectedLabel: "WARNING", expectedInsertText: "⚠️ WARNING :" },
// 	{ keyword: "SUCCESS", expectedLabel: "SUCCESS", expectedInsertText: "✅ SUCCESS :" },
// 	{ keyword: "ALERT", expectedLabel: "ALERT", expectedInsertText: "🚨 ALERT :" }
// ]

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	completionItems.forEach(({keyword, expectedLabel, expectedInsertText}) => {
		test(`TEST: ${keyword}`, async () => {

			// open a new python file and test
			const document = await vscode.workspace.openTextDocument({
				language: "python",
				content: "" // empty file
			});
	
			const editor = await vscode.window.showTextDocument(document);
	
			// insert 'keyword' 
			await editor.edit(editBuilder => {
				editBuilder.insert(new vscode.Position(0, 0), `${keyword}`);
			});
	
			// trigger the completeion | program here
			const position = new vscode.Position(0, 6)
			const completions = await vscode.commands.executeCommand<vscode.CompletionList>(
				"vscode.executeCompletionItemProvider",
				document.uri,
				position
			);
	
			// ensure at least one completion item is provided
			assert.ok(completions && completions.items.length > 0, "No compleition items were provided.");
	
			// secure items in the completionItemProvider object
			const firstItem = completions.items[0];
			const secondItem = completions.items[1]
			console.log("All completions are: ", completions)
			console.log("First item is: ", firstItem)
			console.log("Second item is: ", secondItem)
	
			// COMMENT: perform assertions for the first item
			assert.strictEqual(firstItem.label, `${expectedLabel} comment`, "Completion label does not match expression.")
			assert.strictEqual(firstItem.insertText, `# ${expectedInsertText}`, "Completion test does not match expression.")
	
			// DOC STRING: perform assertions for the second item
			assert.strictEqual(secondItem.label, `${expectedLabel} DOC String`, "Completion label does not match expression.")
			assert.strictEqual(secondItem.insertText, `"""${expectedInsertText}"""`, "Inserted text does not match expected comment.")
	
		})
	});

	suiteTeardown(() => {
		vscode.window.showInformationMessage("All Tests are complete!")
	});
});
