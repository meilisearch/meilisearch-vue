<p align="center">
  <img src="https://raw.githubusercontent.com/meilisearch/integration-guides/main/assets/logos/meilisearch_vuejs.svg" alt="Meilisearch-Vue" width="200" height="200" />
</p>

<h1 align="center">Meilisearch Vue</h1>

<h4 align="center">
  <a href="https://github.com/meilisearch/meilisearch">Meilisearch</a> |
  <a href="https://www.meilisearch.com/pricing?utm_campaign=oss&utm_source=integration&utm_medium=meilisearch-vue">Meilisearch Cloud</a> |
  <a href="https://www.meilisearch.com/docs">Documentation</a> |
  <a href="https://discord.meilisearch.com">Discord</a> |
  <a href="https://roadmap.meilisearch.com/tabs/1-under-consideration">Roadmap</a> |
  <a href="https://www.meilisearch.com">Website</a> |
  <a href="https://www.meilisearch.com/docs/faq">FAQ</a>
</h4>

<p align="center">
  <a href="https://github.com/meilisearch/meilisearch-vue/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-informational" alt="License"></a>
</p>

<p align="center">⚡ How to integrate a front-end search bar in your Vue application using Meilisearch</p>

**Meilisearch** is an open-source search engine. [Discover what Meilisearch is!](https://github.com/meilisearch/meilisearch)

This repository describes the steps to integrate a relevant front-end search bar with a search-as-you-type experience!


## Table of Contents <!-- omit in toc -->

- [⚡ Supercharge your Meilisearch experience](#-supercharge-your-meilisearch-experience)
- [🔧 Installation](#-installation)
- [🤘 Getting Started Vue 2](#-getting-started-vue-2)
- [🤟 Getting Started Vue 3](#-getting-started-vue-3)
- [👩‍🎨 Examples](#-examples)
- [💅 Customization and Documentation](#-customization-and-documentation)

## ⚡ Supercharge your Meilisearch experience

Say goodbye to server deployment and manual updates with [Meilisearch Cloud](https://www.meilisearch.com/pricing?utm_campaign=oss&utm_source=integration&utm_medium=meilisearch-ruby). Get started with a 14-day free trial! No credit card required.

## 🔧 Installation

To integrate a front-end search bar, you need to install two packages:
- the open-source [Vue InstantSearch](https://github.com/algolia/vue-instantsearch/) library powered by Algolia that provides all the front-end tools you need to highly customize your search bar environment.
- the Meilisearch client [instant-meilisearch](https://github.com/meilisearch/meilisearch-js-plugins/tree/main/packages/instant-meilisearch) to establish the communication between your Meilisearch instance and the Vue InstantSearch library.<br>
_Instead of reinventing the wheel, we have opted to reuse the InstantSearch library for our own front-end tooling. We will contribute upstream any improvements that may result from our adoption of InstantSearch._

Run:

```bash
yarn add vue-instantsearch @meilisearch/instant-meilisearch
# or
npm install vue-instantsearch @meilisearch/instant-meilisearch
```

NB: If you don't have any Meilisearch instance running and containing your data, you should take a look at this [getting started page](https://www.meilisearch.com/docs/learn/getting_started/installation#installation).

## 🤘 Getting Started Vue 2

The following getting started uses `Vue 2`. A `Vue 2` example is [provided here](#-examples).

In the `main.js` file:

```js
import Vue from 'vue';
import App from './App.vue';
import InstantSearch from 'vue-instantsearch';

Vue.use(InstantSearch);

new Vue({
  el: '#app',
  render: h => h(App),
});
```

In the `App.vue` file:

```vue
<template>
  <ais-instant-search :search-client="searchClient" index-name="steam-video-games">
    <ais-search-box />
    <ais-hits>
      <div slot="item" slot-scope="{ item }">
        <h2>{{ item.name }}</h2>
      </div>
    </ais-hits>
  </ais-instant-search>
</template>

<script>
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

export default {
  data() {
    return {
      searchClient: instantMeiliSearch(
        "https://integration-demos.meilisearch.com",
        "q7QHwGiX841a509c8b05ef29e55f2d94c02c00635f729ccf097a734cbdf7961530f47c47"
      ),
    };
  },
};
</script>

<style>
body {
  font-family: sans-serif;
  padding: 1em;
}
</style>
```

## 🤟 Getting Started Vue 3

The following getting started uses `Vue 3`. A `Vue 3` example is [provided here](#-examples).

In the `main.js` file:

```js
import { createApp } from 'vue'
import App from './App.vue'
import InstantSearch from 'vue-instantsearch/vue3/es';

createApp(App)
    .use(InstantSearch)
    .mount('#app')
```

In the `App.vue` file:

```vue
<template>
  <ais-instant-search
    :search-client="searchClient"
    index-name="steam-video-games"
  >
    <ais-search-box />
    <ais-hits>
      <template v-slot:item="{ item }">
        <h2>{{ item.name }}</h2>
      </template>
    </ais-hits>
  </ais-instant-search>
</template>

<script>
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import "instantsearch.css/themes/algolia-min.css";


export default {
  data() {
    return {
      searchClient: instantMeiliSearch(
        "https://ms-adf78ae33284-106.lon.meilisearch.io",
        "a63da4928426f12639e19d62886f621130f3fa9ff3c7534c5d179f0f51c4f303"
      ),
    };
  },
};
</script>
```

## 👩‍🎨 Examples

🚀 For a full example, please take a look at this CodeSandbox:

For Vue 2 <br>

[![Edit MS + Vue2-IS](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/ms-vue-is-1d6bi?fontsize=14&hidenavigation=1&theme=dark)

For Vue 3 <br>

[![Edit MS + Vue3-IS](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/ms-vue3-is-0293zk?file=/src/App.vue:0-1)

💡 If you have never used Vue InstantSearch before, we recommend reading this [getting started documentation](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/vue/).

## 💅 Customization and Documentation

- The open-source Vue InstantSearch library is widely used and well documented in the [Algolia documentation](https://www.algolia.com/doc/api-reference/widgets/vue/). It provides all the widgets to customize and improve your search bar environment in your Vue application.
- The [instant-meilisearch documentation](https://github.com/meilisearch/meilisearch-js-plugins/tree/main/packages/instant-meilisearch) to add some customization.
- The [Meilisearch documentation](https://www.meilisearch.com/docs/).

<hr>

**Meilisearch** provides and maintains many **SDKs and Integration tools** like this one. We want to provide everyone with an **amazing search experience for any kind of project**. If you want to contribute, make suggestions, or just know what's going on right now, visit us in the [integration-guides](https://github.com/meilisearch/integration-guides) repository.
