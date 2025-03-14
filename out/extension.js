"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.completionItems = void 0;
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
/*
This extensiton checks the string on a raw line of text in a python file and suggest emoji based completions to keywords.
Test extension with fn+F5. NOTE: You must use cli: 'npm run compile' before testing any new changes.
*/
// Define expected completion items with corresponding emoji comments | Note the differences for each 'comment' vs. 'doc string'    
exports.completionItems = [
    { keyword: "DANGER", expectedLabel: "DANGER", expectedInsertText: "❗DANGER :" },
    { keyword: "CAUTION", expectedLabel: "CAUTION", expectedInsertText: "⚠️ CAUTION :" },
    { keyword: "ALERT", expectedLabel: "ALERT", expectedInsertText: "🚨 ALERT :" },
    { keyword: "SUCCESS", expectedLabel: "SUCCESS", expectedInsertText: "✅ SUCCESS :" },
    { keyword: "VICTORY", expectedLabel: "VICTORY", expectedInsertText: "🏆 VICTORY :" },
    { keyword: "BOOM", expectedLabel: "BOOM", expectedInsertText: "💥 BOOM :" }
];
const similarLanguages = ["typescript", "rust", "cpp", "go"];
// This method is called when your extension is activated; Your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "MilComs" is now active!');
    // register the milComms completion provider for python; first parameter is { scheme: "file", lanuage: "plaintext"}, or just "python"
    exports.completionItems.forEach(({ keyword, expectedLabel, expectedInsertText }) => {
        let providerPY = vscode.languages.registerCompletionItemProvider("python", {
            provideCompletionItems(document, position) {
                vscode.window.showInformationMessage("Hello from MilComs! 'ProvideCompletionItems' is activated!");
                // the document.lineAt returns an immutable 'TextLine' object --> the text cannot be replaced
                const linePrefix = document.lineAt(position).text.substring(0, position.character);
                // accessing the entire string of text does not work
                const line = document.lineAt(position).text;
                // if sttament to check for the keyword
                if (linePrefix.includes(`${keyword}`) || line.includes(`${keyword}`)) {
                    // create a comment & docstring options for the user
                    const comment = new vscode.CompletionItem(`${keyword} COMMENT`);
                    const docString = new vscode.CompletionItem(`${keyword} DOC STRING`);
                    // COMMENT: assign text and kind for the vscode object 
                    comment.insertText = `# ${expectedInsertText}`;
                    comment.kind = vscode.CompletionItemKind.Text;
                    // DOC STRING: assign text and kind for the vscode object
                    docString.insertText = `"""${expectedInsertText}"""`;
                    docString.kind = vscode.CompletionItemKind.Text;
                    return [comment, docString];
                }
                ;
            }
        });
        context.subscriptions.push(providerPY);
        let providerTS = vscode.languages.registerCompletionItemProvider(similarLanguages, {
            provideCompletionItems(document, position) {
                vscode.window.showInformationMessage("Hello from MilComs! 'ProvideCompletionItems' is activated!");
                // the document.lineAt returns an immutable 'TextLine' object --> the text cannot be replaced
                const linePrefix = document.lineAt(position).text.substring(0, position.character);
                // accessing the entire string of text does not work
                const line = document.lineAt(position).text;
                // if sttament to check for the keyword
                if (linePrefix.includes(`${keyword}`) || line.includes(`${keyword}`)) {
                    // create a comment & docstring options for the user
                    const comment = new vscode.CompletionItem(`${keyword} COMMENT`);
                    const docString = new vscode.CompletionItem(`${keyword} DOC STRING`);
                    // COMMENT: assign text and kind for the vscode object 
                    comment.insertText = `// ${expectedInsertText}`;
                    comment.kind = vscode.CompletionItemKind.Text;
                    // DOC STRING: assign text and kind for the vscode object
                    docString.insertText = `/*${expectedInsertText}*/`;
                    docString.kind = vscode.CompletionItemKind.Text;
                    return [comment, docString];
                }
                ;
            }
        });
        context.subscriptions.push(providerTS);
    });
    // END for the 'activate' vscodeExtensionContext function
}
;
// This method is called when your extension is deactivated
function deactivate() { }
;
//# sourceMappingURL=extension.js.map