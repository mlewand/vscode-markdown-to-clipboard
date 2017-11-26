import * as vscode from 'vscode';
import * as marked from 'marked';
import * as winClipboard from 'win-clipboard';
import * as htmlToText from 'html-to-text';

export default {
	copyToClipboard: function( editor: vscode.TextEditor, edit: vscode.TextEditorEdit ) {
		let selection = editor.selection,
			mdSource = selection.isEmpty ? editor.document.getText() : editor.document.getText( selection );

		this._saveToClipboard( marked( mdSource ) );
	},

	// Store reference to winClipboard to allow stubbing in unit tests.
	_winClipboard: winClipboard,

	_saveToClipboard: function( html: string ) {
		this._winClipboard.clear();
		this._winClipboard.setText( htmlToText.fromString( html, { wordwrap: false } ) );
		this._winClipboard.setHtml( html );
	}
};