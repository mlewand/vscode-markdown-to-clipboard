# Markdown to clipboard

Renders selected markdown into rich text in your clipboard, so that you can paste it as a formatted text to any rich text application.

## Motivation

As for programmer I prefer to write stuff quickly in markdown. Be it email, docs, specs - you name it. Some apps, e.g. my e-mail client doesn't support markdown and are just PITA to use, so I actually create a msg in vscode and then paste it into the email.

## Major Changes

### 0.0.2

This extension switched to [win-clipboard](https://github.com/mlewand/win-clipboard) library, which uses [native module addons that are currently not supported by VSCode](https://github.com/Microsoft/vscode/issues/658). I have included prebuilt binaries for the `x64` architecture, and for the time being I have no other workaround for that.

## Known Issues

* Currently it works only on Windows, since it uses [win-clipboard](https://github.com/mlewand/win-clipboard). **Pull requests are welcome.**