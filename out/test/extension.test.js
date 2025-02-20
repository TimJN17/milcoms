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
const assert = __importStar(require("assert"));
const mocha_1 = require("mocha");
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = __importStar(require("vscode"));
const extension_1 = require("../extension");
const failMsg = "⛔ Completion does not match expression.";
suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');
    // iterate for each milCom expected 
    extension_1.completionItems.forEach(({ keyword, expectedLabel, expectedInsertText }) => {
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
            const completions = await vscode.commands.executeCommand("vscode.executeCompletionItemProvider", document.uri, position);
            // ensure at least one completion item is provided
            assert.ok(completions && completions.items.length > 0, "No compleition items were provided.");
            // secure items in the completionItemProvider object | there will only be x2 in the current version & no need to loop
            const firstItem = completions.items[0]; // the COMMENT 
            const secondItem = completions.items[1]; // the DOC STRING
            // COMMENT: perform assertions for the first item
            assert.strictEqual(firstItem.label, `${expectedLabel} COMMENT`, `${failMsg}`);
            assert.strictEqual(firstItem.insertText, `# ${expectedInsertText}`, `${failMsg}`);
            // DOC STRING: perform assertions for the second item
            assert.strictEqual(secondItem.label, `${expectedLabel} DOC STRING`, `${failMsg}`);
            assert.strictEqual(secondItem.insertText, `"""${expectedInsertText}"""`, `${failMsg}`);
        });
    });
    (0, mocha_1.suiteTeardown)(() => {
        vscode.window.showInformationMessage("All Tests are complete!");
    });
});
//# sourceMappingURL=extension.test.js.map