---
title: "Commands"
description: "commands associated with whims-usermanual portal"
---

# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ npm
```

### Local Development

```
$ npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true npm deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> npm deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

### To Translate website in to any language

```bash
mkdir -p i18n/<SUPPORTED_LANG>/docusaurus-plugin-content-docs/current

cp -r docs/** i18n/<SUPPORTED_LANG>/docusaurus-plugin-content-docs/current
```

**To update/translate the new content**

```bash
npm run write-translations -- --locale <SUPPORTED_LANG>
```
