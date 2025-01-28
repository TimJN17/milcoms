// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { posix } from 'path';
import * as vscode from 'vscode';

/*
This function checks to see if a line is already a comment, since the 'provideCompletionItems
fuction does not work within currently comments lines; provideCompletionItems only works
as raw tesxt on a new line.

Test extension with fn+F5. NOTE: You must use cli: 'npm run compile' before testing any new changes.
*/
function insertEmojiComment(
		editor: { 
			document: any; 
			selections: any; edit: (arg0: (editBuilder: any) => void) => void; }, 
		emoji: any, 
		keyword: any
	) {

	const document = editor.document;
	const selections = editor.selections;

	editor.edit(editBuilder => {
		selections.forEach((selection: { start: { line: any; }; }) => {
			const line = document.lineAt(selection.start.line);
			const lineText = line.text;

			// Check if the line is already a comment
			const commentPrefixes = ["//", "#", "/*", '"""', "--"];
			const isComment = commentPrefixes.some(prefix => lineText.trim().startsWith(prefix));

			if (isComment) {

				// add the emoji in front of the keyword
				if (!lineText.includes(`${emoji} ${keyword}`)) {
					const updatedLine = lineText.replace(keyword, `${emoji} ${keyword}`)
					editBuilder.replace(line.range, updatedLine);
				}
			} else {
				// add the emoji if is new line
				const updatedLine = `${emoji} ${keyword}`
				editBuilder.insert(line.range.start, updatedLine + "\n")
			}
		})
	})
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "naudetMilComs" is now active!');

	let disposable = vscode.commands.registerCommand("HelloWorld.helloWorld", () => {

		vscode.window.showInformationMessage("Hello World!");

	});

	// register the milComms completion provider for python; first parameter is { scheme: "file", lanuage: "plaintext"}, or just "python"
	let provider = vscode.languages.registerCompletionItemProvider("python", {
		
		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
			vscode.window.showInformationMessage("Hello from MilComs! This indicates 'provideCompletionItems' hits!");

			// the document.lineAt returns an immutable 'TextLine' object --> the text cannot be replaced
			const linePrefix = document.lineAt(position).text.substring(0, position.character);
			
			// accessing the entire string of text does not work
			const line = document.lineAt(position).text;
			console.log(linePrefix);

			if (linePrefix.includes("DANGER") 
				|| linePrefix.includes("# DANGER") 
				|| linePrefix.includes('"""DANGER"""') 
				|| line.includes("DANGER")) {
				const dangerCompletion = new vscode.CompletionItem("DANGER comment");
				const dangerDocString = new vscode.CompletionItem("DANGER Doc String");

				// because the completionItemKind is set to "Snippet" the insertion of text doesn't need to be a snippet
				// it also seems if the "snippet" vs. text suffix for the .Kind doesn;t matter either 
				dangerCompletion.insertText = "#❗DANGER :";
				dangerCompletion.kind = vscode.CompletionItemKind.Text;

				dangerDocString.insertText = '"""❗DANGER :"""';
				dangerDocString.kind = vscode.CompletionItemKind.Text;

				console.log("Danger success!");

				return [dangerCompletion, dangerDocString]
			}

			if (linePrefix.includes("CAUTION") || line.includes("CAUTION")) {
				const warningCompletion = new vscode.CompletionItem("CAUTION comment");
				const wanringDocSTring = new vscode.CompletionItem("CAUTION Doc String")

				warningCompletion.insertText = "# ⚠️ CAUTION :";
				warningCompletion.kind = vscode.CompletionItemKind.Keyword;

				// this line triggres the 'suggest' option upon the command inserting the provided text; this command can be repeated frequently
				warningCompletion.command = { command: 'editor.action.triggerSuggest', title: 'Produce Warning Comment...'}
				
				wanringDocSTring.insertText = '"""⚠️ CAUTION :"""'
				wanringDocSTring.kind = vscode.CompletionItemKind.Snippet;

				console.log("Caution success!");

				return [warningCompletion, wanringDocSTring];
			}

			if (linePrefix.includes("ALERT") || line.includes("ALERT")) {
				const cautionCompletion = new vscode.CompletionItem("ALERT comment");
				const cautionDocString = new vscode.CompletionItem("ALERT DOC String");

				cautionCompletion.insertText = "# 🚨 ALERT :";
				cautionCompletion.kind = vscode.CompletionItemKind.Snippet;

				cautionDocString.insertText = '"""🚨 ALERT :"""'
				cautionDocString.kind = vscode.CompletionItemKind.Snippet;

				console.log("Alert success!");

				return [cautionCompletion, cautionDocString]
			}
			if (linePrefix.includes("SUCCESS") || line.includes("SUCCESS")) {
				const successCompletion = new vscode.CompletionItem("Success comment");
				const successDocString = new vscode.CompletionItem("SUCCESS Doc String")

				successCompletion.insertText = "# ✅ SUCCESS";
				successCompletion.kind = vscode.CompletionItemKind.Snippet;

				successDocString.insertText = '""" ✅ SUCCESS"""';
				successDocString.kind = vscode.CompletionItemKind.Snippet

				console.log("SUCCESS success!")

				return [successCompletion, successDocString];
			}
		}
	}, 'DANG', 'ALER', 'CAUT', 'SUCC'); // Trigger completion after typing the few letters of each phrase

	let editor = vscode.commands.registerCommand("extension.insertEmojies", async () => {
		vscode.window.showInformationMessage("Active Text Editor is in play!")
		const activteText = vscode.window.activeTextEditor;
		if (activteText) {

			// define inital variables from the activetext editor
			const document = activteText.document;
			const selection = activteText.selection;

			// get range from the start of the line to the cursor's selection
			const range = selection.isEmpty ? document.lineAt(selection.start.line).range : selection;
			const text = document.getText(range);

			// replacement lines
			if (text.includes("DANGER")) {
				activteText.edit(editBuilder => {
					const newText = text.replace("DANGER", "❗DANGER");
					editBuilder.replace(range, newText)
				});
			} else {
				vscode.window.showInformationMessage("[ INFO ]: No ' DANGER' found to replace.");
			}
		}
	});

	context.subscriptions.push(disposable, provider, editor);

// END 'activate' vscodeExtensionContext function
}

// This method is called when your extension is deactivated
export function deactivate() {};
