// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { posix } from 'path';
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "naudetMilComs" is now active!');

	let disposable = vscode.commands.registerCommand("HelloWorld.helloWorld", () => {

		vscode.window.showInformationMessage("Hello World!");

	});
	
	context.subscriptions.push(disposable);

	// register the milComms completion provider for python
	let provider = vscode.languages.registerCompletionItemProvider("python", {
		
		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
			vscode.window.showInformationMessage('Hello World from MilComs [ Line 1 ]!');

			// the document.lineAt returns an immutable 'TextLine' object --> the text cannot be replaced
			const linePrefix = document.lineAt(position).text.substring(0, position.character);
			
			// accessing the entire string of text does not work
			const line = document.lineAt(position).text;
			console.log(linePrefix)

			if (line.includes("SUCCESS")) {
				const successCompletion = new vscode.CompletionItem("Success Emoji");
				successCompletion.insertText = "✅";
				successCompletion.kind = vscode.CompletionItemKind.Snippet;
				return [successCompletion]
			}

			if (linePrefix.includes("DANGER") 
				|| linePrefix.includes("# DANGER") 
				|| linePrefix.includes('"""DANGER"""') 
				|| line.includes("DANGER")) {
				const dangerCompletion = new vscode.CompletionItem("DANGER comment");
				const dangerDocString = new vscode.CompletionItem("DANGER Doc String");

				dangerCompletion.insertText = "#❗DANGER :";
				dangerCompletion.kind = vscode.CompletionItemKind.Snippet;

				dangerDocString.insertText = '"""❗DANGER :"""';
				dangerDocString.kind = vscode.CompletionItemKind.Snippet;

				console.log("Danger success!");
				console.log(line)

				return [dangerCompletion, dangerDocString]
			}

			if (linePrefix.includes("CAUTION")) {
				const warningCompletion = new vscode.CompletionItem("CAUTION comment");
				const wanringDocSTring = new vscode.CompletionItem("CAUTION Doc String")

				warningCompletion.insertText = "# ⚠️ CAUTION :";
				warningCompletion.kind = vscode.CompletionItemKind.Snippet;
				
				wanringDocSTring.insertText = '"""⚠️ CAUTION :"""'
				wanringDocSTring.kind = vscode.CompletionItemKind.Snippet;

				return [warningCompletion, wanringDocSTring];
			}

			if (linePrefix.includes("ALERT")) {
				const cautionCompletion = new vscode.CompletionItem("ALERT Comment");
				const cautionDocString = new vscode.CompletionItem("ALERT DOC String");

				cautionCompletion.insertText = "# 🚨 ALERT :";
				cautionCompletion.kind = vscode.CompletionItemKind.Snippet;

				cautionDocString.insertText = '"""🚨 ALERT :"""'
				cautionDocString.kind = vscode.CompletionItemKind.Snippet;
				return [cautionCompletion, cautionDocString]
			}
		}
	}, 'DANG', 'ALER', 'CAUT'); // Trigger completion after typing the few letters of each phrase

	context.subscriptions.push(provider);
	
	};

// This method is called when your extension is deactivated
export function deactivate() {}
