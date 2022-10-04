import * as vscode from 'vscode';
import * as marked from 'marked';
import * as htmlToText from 'html-to-text';

let winClipboard: {
	clear(): void;
	setText(text: string, format?: string, encoding?: string): void;
	setHtml(text: string, format?: string, encoding?: string): void; 
} | undefined;
try {
	winClipboard = require('win-clipboard')
} catch {}

let macClipboard: {
	get(type: string): string;
	set(type: string, data: string): boolean;
} | undefined;
try {
	macClipboard = require('pb');
} catch {}

class Commands {
	copyToClipboard( editor: vscode.TextEditor, edit: vscode.TextEditorEdit | null ) {
		let selection = editor.selection,
			mdSource = selection.isEmpty ? editor.document.getText() : editor.document.getText( selection );

		this._saveToClipboard( marked( mdSource ) );
	}

	// Store reference to winClipboard to allow stubbing in unit tests.
	_winClipboard = winClipboard
	_macClipboard = macClipboard

	_saveToClipboard( html: string ) {
		if (this._winClipboard) {
			this._winClipboard.clear();
			this._winClipboard.setText( htmlToText.fromString( html, { wordwrap: false } ) );
			this._winClipboard.setHtml( html );
		} else if (this._macClipboard) {
			this._macClipboard.set('html', html)
		}
	}
};

export default new Commands();
