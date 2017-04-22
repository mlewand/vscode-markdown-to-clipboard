'use strict';

import * as vscode from 'vscode';
import commands from './commands';

export function activate( context: vscode.ExtensionContext ) {
    context.subscriptions.push( vscode.commands.registerTextEditorCommand( 'vscode-markdown-to-clipboard', commands.copyToClipboard.bind( commands ) ) );
}

export function deactivate() { }