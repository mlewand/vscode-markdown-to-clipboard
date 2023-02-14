declare module 'vscode-test-content' {
  export function get(content: string): Promise<import('vscode').TextEditor>;
  export function getWithSelection(content: string): Promise<import('vscode').TextEditor>;
  export function set(content: string): Promise<import('vscode').TextEditor>;
  export function setWithSelection(content: string): Promise<import('vscode').TextEditor>;
}
