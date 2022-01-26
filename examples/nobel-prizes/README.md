## Meilisearch Search in Nobel Winners

In this directory, you will find the front-end interface to search through all Nobel Prize winners and their details.
The search is powered by [Meilisearch](https://github.com/meilisearch/meilisearch), a powerful, fast and open-source search engine easy to use and deploy.

## Demo

_Based on [How to Search Nobel Prize Winners Faster With Meilisearch and JavaScript](https://blog.meilisearch.com/how-to-search-nobel-prize-winners-faster-with-meilisearch-api-for-javascript/)._

[![Nobel prices demo](misc/marie-heavy.gif)](https://nobel.meilisearch.com)

## Run and develop locally

First, you will need to install [yarn](https://classic.yarnpkg.com/en/docs/install/) or [npm](https://www.npmjs.com/get-npm).</br>
Then run:

```bash
$ git clone git@github.com:meilisearch/meilisearch-vue.git
$ cd meilisearch-vue/examples/nobel-prizes
$ yarn # or npm install
$ yarn serve # or npm run serve
```

You can now visit `http://localhost:8080/` in your browser.

We've included some credentials in the code, allowing you to test the demo without having to create your own Meilisearch instance.

## Data import

If you want to replicate this demo using your own Meilisearch instance, you will have to follow these steps:

### 1. Download and launch Meilisearch

[Download and launch Meilisearch](https://docs.meilisearch.com/reference/features/installation.html) using the basic configuration. For example, by using [cURL](https://curl.haxx.se/) in your terminal.

```bash
$ curl -L https://install.meilisearch.com | sh
$ ./meilisearch
```

This walkthrough runs Meilisearch in a development environment, and therefore it does not use any [master key](https://docs.meilisearch.com/reference/features/configuration.html#master-key).

### 2. Run the setup

Go inside the `setup` directory and run the following commands:
```bash
$ cd setup/
$ yarn # or npm install
$ yarn start # or npm run start
```

This will do the following:
- Create an index called `prizes` in your Meilisearch instance.
- Add all Nobel prizes documents to that index.
- Add custom settings for a more relevant search.

### 3. Change the credentials in the front-end client

The credentials of the Meilisearch instance are written inside `src/meilisearch-client.js`. By default, these are the public credentials for the Nobel dataset.

You have to change these credentials with your local instance:

```javascript
const MEILISEARCH_HOST = "http://127.0.0.1:7700"
const MEILISEARCH_API_KEY = ""

export {
  MEILISEARCH_HOST,
  MEILISEARCH_API_KEY
}
```

Because we did not set any API key at [step 1](#1-download-and-launch-meilisearch), we don't need to provide any `MEILISEARCH_API_KEY` here.

### 4. Run the project

You can now go back to the root directory and run the project. The front-end client is now communicating with your Meilisearch instance.

```bash
$ cd ..
$ yarn serve # or npm run serve
```

You can now visit `http://localhost:8080/` in your browser.

## Working example

A working example can be tested on CodeSandBox:

[![Nobel Prize Demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/naughty-napier-zdy1r?file=/src/App.vue)

💡 If you have never used InstantSearch, we recommend reading this [getting started documentation](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/js/).
