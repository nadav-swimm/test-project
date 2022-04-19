---
id: 98qr5
name: 🛠 Dev Environment Setup
file_version: 1.0.2
app_version: 0.8.1-0
file_blobs:
  package.json: ed8dcff0a35b108f77da6badaaf843ebd4ca8739
  package copy.json: b7bea0a9d322e4c7ee77f936352a38c08be394f6
  svgTransform.js: 116d870206d5879575e2e890127e1effe3ad2378
---

To run your local dev environment you will need a few things on your machine. Follow the steps below.

<br/>

Next: [🔘 Adding an Instance of Component](adding-an-instance-of-component.wtlkh.sw.md)

<br/>

## Installations

*   Install [Node JS](https://nodejs.org/en/download/), version `14.x`
    
*   Install an IDE (preferably [VS Code](https://code.visualstudio.com/))
    
*   Install git (if you don't already have it on your machine).
    
*   Install [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

<br/>

<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 package.json
```json
⬜ 4        "description": "Chat forms website",
⬜ 5        "main": "index.js",
⬜ 6        "scripts": {
🟩 7          "test": "jest",
🟩 8          "build": "webpack --config build/webpack.prod.js",
🟩 9          "dev": "webpack-dev-server --hot --config build/webpack.dev.js",
🟩 10         "lint": "eslint --ext .js,.vue src",
🟩 11         "lint:fix": "eslint --ext .js,.vue src --fix",
🟩 12         "cypress:open": "cypress open",
🟩 13         "deploy-staging": "aws --region eu-west-1 --profile ia-webapp-staging s3 sync ./dist s3://ia-webapp-staging --delete"
🟩 14       },
🟩 15       "author": "",
🟩 16       "license": "ISC",
🟩 17       "dependencies": {
🟩 18         "@johmun/vue-tags-input": "^2.1.0",
🟩 19         "axios": "^0.21.1",
🟩 20         "emoji-vue": "^0.2.5",
🟩 21         "eslint-config-airbnb-base": "^14.2.1",
🟩 22         "vue": "^2.6.12",
🟩 23         "vue-class-component": "^7.2.5",
🟩 24         "vue-confetti": "^2.2.1",
⬜ 25         "vue-cookies": "^1.7.4",
⬜ 26         "vue-google-api": "^0.2.0",
⬜ 27         "vue-google-oauth2": "^1.5.8",
```

<br/>

## Getting the sources

Clone the repository locally:

```
git clone https://github.com/my_company/company_repo.git
```

<br/>

## Build

*   Within the repository directory, run `yarn install` to install the project's dependencies.
    
*   Then, build the project by running `yarn build`.

Here's what `yarn build` doing behind the scenes:

<br/>

### Troubleshooting

```
Error! Cannot execute command (...) "need executable 'ar' to convert dir to deb"(...)
```

*   For electron builder to run, the package `binutils` needs to be installed. Although it should be included when installing electron on the machine/VM - it sometimes fails
    
*   To avoid build issues, please run `sudo apt-get install binutils` to install this dependency before trying to build the app

<br/>

## Windows additional steps

{Insert additional steps here}

<br/>

## Run the Tests

To run all the tests, run:

```
$ yarn test
```

To run subsets of the tests - you can use `yarn test:<name>`. For example:

```
$ yarn test:server
$ yarn test:utils
```

<br/>

<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 package copy.json
```json
⬜ 6        "scripts": {
⬜ 7          "test": "jest",
⬜ 8          "build": "webpack --config build/webpack.prod.js",
🟩 9          "dev": "webpack-dev-server --hot --config build/webpack.dev.js",
🟩 10         "lint": "eslint --ext .js,.vue src",
🟩 11         "lint:fix": "eslint --ext .js,.vue src --fix",
🟩 12         "cypress:open": "cypress open",
🟩 13         "deploy-staging": "aws --region eu-west-1 --profile ia-webapp-staging s3 sync ./dist s3://ia-webapp-staging --delete"
🟩 14       },
🟩 15       "author": "",
🟩 16       "license": "ISC",
🟩 17       "dependencies": {
🟩 18         "@johmun/vue-tags-input": "^2.1.0",
⬜ 19         "axios": "^0.21.1",
⬜ 20         "emoji-vue": "^0.2.4",
⬜ 21         "mixpanel-browser": "^2.40.1",
```

<br/>

## Run

### macOS and Linux

```
./scripts/run.sh
```

### Windows

```
 .\scripts\run.bat
```

### Web

```
yarn web
```

<br/>

## Scripts worth mentioning ⚡️✨

Serve your code with a development web server

```
$ yarn dev
```

Pack for Production. This will generate installers.

```
$ yarn pack
```

See package.json for full list of supported yarn scripts:

<br/>

## Debugging

* Open DevTools by pressing Command+Option+I (Mac) or Control+Shift+I (Windows, Linux). This shortcut opens the Console panel.

* Click the Sources tab and pick a file from the files navigator.

* A common method for debugging a problem is to insert a lot of console.log() statements into the code, in order to inspect values as the script executes, but breakpoints can get it done faster.

<br/>

## Congrats

You now have your dev environment ready 🎉

<br/>

<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 svgTransform.js
```javascript
⬜ 1      // this is a custom Jest transformation file 
⬜ 2      // to assist importing svg icon files within testing
🟩 3      module.exports = {
🟩 4          process(fileContent) {
🟩 5            return "module.exports = " + JSON.stringify(fileContent) + ";";
🟩 6          }
🟩 7          
🟩 8        };
```

<br/>

This file was generated by Swimm. [Click here to view it in the app](https://swimm-web-app.web.app/repos/Z2l0aHViJTNBJTNBdGVzdC1wcm9qZWN0JTNBJTNBbmFkYXYtc3dpbW0=/docs/98qr5).