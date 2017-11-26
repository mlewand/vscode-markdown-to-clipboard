# Building

After fixing [#1](https://github.com/mlewand/vscode-markdown-to-clipboard/issues/1) building got very tricky, follow these steps to build extension (for targeting VSCode 1.18.1 64bit):

```bash
# Electron's version.
export npm_config_target=1.7.9
# The architecture of Electron, can be ia32 or x64.
export npm_config_arch=x64
export npm_config_target_arch=x64
# Download headers for Electron.
export npm_config_disturl=https://atom.io/download/electron
# Tell node-pre-gyp that we are building for Electron.
export npm_config_runtime=electron
# Tell node-pre-gyp to build module from source code.
export npm_config_build_from_source=true
# Install all dependencies, and store cache to ~/.electron-gyp.
HOME=~/.electron-gyp npm install
```

References:

* https://github.com/Microsoft/vscode/issues/658
* https://github.com/electron/electron/blob/master/docs/tutorial/using-native-node-modules.md
* https://github.com/bartosz-antosik/vscode-spellright/issues/3