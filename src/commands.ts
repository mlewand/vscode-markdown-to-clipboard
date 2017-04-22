import * as vscode from 'vscode';
import * as marked from 'marked';
import * as nodePowershell from 'node-powershell';
import * as escape from 'any-shell-escape';

export default {
	copyToClipboard: function( editor: vscode.TextEditor, edit: vscode.TextEditorEdit ) {
		let selection = editor.selection,
			mdSource = selection.isEmpty ? editor.document.getText() : editor.document.getText( selection );

		this._saveToClipboard( marked( mdSource ) );
	},

	_saveToClipboard: function( html: string ) {
		let ps = new nodePowershell( {
			executionPolicy: 'Bypass',
			noProfile: true,
			debugMsg: false
		} );

		ps.addCommand( 'Set-Clipboard -AsHtml -Value ' + escape( html.replace( /\r?\n/g, '' ) ) );

		return ps.invoke();
	}
};