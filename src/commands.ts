import * as vscode from 'vscode';
import { marked } from 'marked';
// import * as htmlToText from 'html-to-text';
import * as htmlToRtf from 'html-to-rtf';

let winClipboard: {
	clear(): void;
	setText(text: string, format?: string, encoding?: string): void;
	setHtml(text: string, format?: string, encoding?: string): void; 
} | undefined;
try {
	winClipboard = require('win-clipboard')
} catch {}

let setMacClipboard: {
	(text: string, html?: string, rtf?: string): boolean;
} | undefined;
try {
	let log = vscode.window.createOutputChannel("markdown-to-clipboard");

	log.appendLine("init mac");

	const objc = require('objc');
	objc.import('AppKit');

	const {
		NSPasteboard,
		NSPasteboardTypeHTML,
		NSPasteboardTypeRTF,
		NSPasteboardTypeString,
	} = objc;
	setMacClipboard = (text, html, rtf) => {
		var gp = NSPasteboard.generalPasteboard();
		var handle = gp.clearContents();
		var ok = gp.setString_forType(text, NSPasteboardTypeString);
		var okHtml = !html || gp.setString_forType(html, NSPasteboardTypeHTML);
		var okRtf = !rtf || gp.setString_forType(rtf, NSPasteboardTypeRTF);
		log.appendLine(`setMacClipboard ${handle}, ${ok}, ${okHtml}, ${okRtf}`);
		return ok && okHtml && okRtf;
	};
} catch {}

class Commands {
	copyToClipboard( editor: vscode.TextEditor, edit: vscode.TextEditorEdit | null ) {
		let selection = editor.selection,
			mdSource = selection.isEmpty ? editor.document.getText() : editor.document.getText( selection );

		this._saveToClipboard( marked( mdSource, { } ), mdSource );
	}

	// Store reference to winClipboard to allow stubbing in unit tests.
	_winClipboard = winClipboard
	_setMacClipboard = setMacClipboard

	_saveToClipboard( html: string, text: string ) {
		if (this._winClipboard) {
			this._winClipboard.clear();
			this._winClipboard.setText( text );
			this._winClipboard.setHtml( html );
		} else if (this._setMacClipboard) {
			this._setMacClipboard(text, html, htmlToRtf.convertHtmlToRtf(html))
		} else {
			throw new Error('os not supported')
		}
	}
};

export default new Commands();
