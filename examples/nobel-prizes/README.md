## MeiliSearch Search in Nobel Winners

In this directory, you will find the front end to search through all Nobel winners and their prizes' specifics.
The search is powered by [MeiliSearch](https://github.com/meilisearch/meilisearch), a powerful, fast, open-source, easy to use and deploy search engine.

## Demo

<!-- TODO: CHANGE LINK -->
_Based on [How to Search Nobel Prize Winners Faster With MeiliSearch and JavaScript](https://blog.meilisearch.com/p/8b7238e0-eb2f-47ee-90d4-815a8357f12b/)._

[![Nobel prices demo](misc/marie-heavy.gif)](https://nobel.meilisearch.com)

## Run and develop locally

First, you will need [yarn](https://classic.yarnpkg.com/en/docs/install/) or [npm](https://www.npmjs.com/get-npm).</br>
Then run:

```bash
$ git clone git@github.com:meilisearch/meilisearch-vue.git
$ cd meilisearch-vue/examples/nobel-prizes
$ yarn # or npm install
$ yarn serve # or npm run serve
$ open http://localhost:8080/
```

We've included some credentials in the code, allowing you to test the demo without having to create your own MeiliSearch instance.

## Data import

If you want to replicate this demo using your own MeiliSearch, you will have to follow these steps:

### 1. Download and Launch

[Download and launch MeiliSearch](https://docs.meilisearch.com/guides/advanced_guides/installation.html) using the basic configuration. For example, by using [cURL](https://curl.haxx.se/) in your terminal.

```bash
$ curl -L https://install.meilisearch.com | sh
$ ./meilisearch
Server is listening on: http://127.0.0.1:7700
```

This walkthrough does not uses the [master key](https://docs.meilisearch.com/guides/advanced_guides/configuration.html#master-key) option.

### 2. Run the setup

Go inside the `setup` directory and run the following:
```bash
$ cd setup/
$ yarn # or npm install
$ yarn start # or npm run start
```

This will do the following:
- Create an index called `prizes` in your MeiliSearch instance.
- Add all Nobel prizes documents to that index.
- Add custom settings for a more relevant search.

### 3. Change the credentials in the front

The credentials of the MeiliSearch instance are written inside `src/meilisearch-client.js`. By default, these are the public credentials for the Nobel dataset.

You have to change these credentials with your local instance:

```javascript
const MEILISEARCH_HOST = "http://127.0.0.1:7700"
const MEILISEARCH_API_KEY = ""

Because we did not set any API key at [step 1](#1.-download-and-launch), we don't need to provide any `MEILISEARCH_API_KEY` here.
export {
  MEILISEARCH_HOST,
  MEILISEARCH_API_KEY
}
```

### 4. Run the project

You can now go back to the root directory and run the project. The front-end is now communicating with your MeiliSearch instance.

```bash
$ cd ..
$ yarn serve # or npm run serve
$ open http://localhost:8080/
```
