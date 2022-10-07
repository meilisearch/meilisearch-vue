<p align="center">
  <img src="https://raw.githubusercontent.com/meilisearch/integration-guides/main/assets/logos/meilisearch_vuejs.svg" alt="Meilisearch-Vue" width="200" height="200" />
</p>

<h1 align="center">Meilisearch Vue</h1>

<h4 align="center">
  <a href="https://github.com/meilisearch/meilisearch">Meilisearch</a> |
  <a href="https://docs.meilisearch.com">Documentation</a> |
  <a href="https://slack.meilisearch.com">Slack</a> |
  <a href="https://roadmap.meilisearch.com/tabs/1-under-consideration">Roadmap</a> |
  <a href="https://www.meilisearch.com">Website</a> |
  <a href="https://docs.meilisearch.com/faq">FAQ</a>
</h4>

<p align="center">
  <a href="https://github.com/meilisearch/meilisearch-vue/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-informational" alt="License"></a>
</p>

<p align="center">⚡ How to integrate a front-end search bar in your Vue application using Meilisearch</p>

**Meilisearch** is an open-source search engine. [Discover what Meilisearch is!](https://github.com/meilisearch/meilisearch)

This repository describes the steps to integrate a relevant front-end search bar with a search-as-you-type experience!


## Table of Contents <!-- omit in toc -->

- [🔧 Installation](#-installation)
- [🤘 Getting Started Vue 2](#-getting-started-vue-2)
- [🤟 Getting Started Vue 3](#-getting-started-vue-3)
- [👩‍🎨 Examples](#-examples)
- [💅 Customization and Documentation](#-customization-and-documentation)


## 🔧 Installation

To integrate a front-end search bar, you need to install two packages:
- the open-source [Vue InstantSearch](https://github.com/algolia/vue-instantsearch/) library powered by Algolia that provides all the front-end tools you need to highly customize your search bar environment.
- the Meilisearch client [instant-meilisearch](https://github.com/meilisearch/instant-meilisearch/) to establish the communication between your Meilisearch instance and the Vue InstantSearch library.<br>
_Instead of reinventing the wheel, we have opted to reuse the InstantSearch library for our own front-end tooling. We will contribute upstream any improvements that may result from our adoption of InstantSearch._

Run:

```bash
yarn add vue-instantsearch @meilisearch/instant-meilisearch
# or
npm install vue-instantsearch @meilisearch/instant-meilisearch
```

NB: If you don't have any Meilisearch instance running and containing your data, you should take a look at this [getting started page](https://docs.meilisearch.com/learn/tutorials/getting_started.html).

## 🤘 Getting Started Vue 2

The following getting started uses `Vue 2`. A `Vue 2` example is [provided here](#-examples).

In the `main.js` file:

```js
import { createApp } from "vue";
import App from "./App.vue";
import InstantSearch from "vue-instantsearch/vue3/es";
import "instantsearch.css/themes/algolia-min.css";

createApp(App).use(InstantSearch).mount("#app");
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
  <header class="header">
    <h1 class="header-title">MeiliSearch + Vue 3 InstantSearch</h1>
    <p class="header-subtitle">Search in Steam video games 🎮</p>
  </header>
  <p class="disclaimer">
    This is not the official Steam dataset but only for demo purpose. Enjoy
    searching with MeiliSearch!
  </p>
  <div class="container">
    <ais-instant-search
      :search-client="searchClient"
      index-name="steam-video-games"
    >
      <div class="search-panel__filters">
        <h2>Genres</h2>
        <ais-refinement-list attribute="genres" />
        <h2>Players</h2>
        <ais-refinement-list attribute="players" />
        <h2>Platforms</h2>
        <ais-refinement-list attribute="platforms" />
        <h2>Misc</h2>
        <ais-refinement-list attribute="misc" />
      </div>
      <div class="search-panel__results">
        <app-debounced-search-box :delay="10" class="ais-SearchBox-input" />
        <ais-hits>
          <template v-slot:item="{ item }">
            <div>
              <div class="hit-name">
                <ais-highlight :hit="item" attribute="name" />
              </div>
              <img :src="item.image" align="left" :alt="item.image" />
              <div class="hit-description">
                <ais-snippet :hit="item" attribute="description" />
              </div>
              <div class="hit-info">price: {{ item.price }}</div>
              <div class="hit-info">release date: {{ item.releaseDate }}</div>
            </div>
          </template>
        </ais-hits>
        <ais-configure
          :attributesToSnippet="['description:50']"
          snippetEllipsisText="…"
        />
      </div>
      <ais-pagination />
    </ais-instant-search>
  </div>
</template>

<script>
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import AppDebouncedSearchBox from "./DebouncedSearchBox";

export default {
  components: {
    AppDebouncedSearchBox,
  },
  data() {
    return {
      searchClient: instantMeiliSearch(
        "https://integration-demos.meilisearch.com",
        "99d1e034ed32eb569f9edc27962cccf90b736e4c5a70f7f5e76b9fab54d6a185",
        {
          paginationTotalHits: 40,
          finitePagination: true,
        }
      ),
    };
  },
};
</script>
<style>
body,
h1 {
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.ais-Hits-item {
  margin-bottom: 1em;
  width: calc(50% - 1rem);
}

.ais-Hits-item img {
  margin-right: 1em;
  width: 100%;
  height: 100%;
  margin-bottom: 0.5em;
}

.ais-Highlight-highlighted {
  background: cyan;
  font-style: normal;
}

.disclaimer {
  margin-left: 1em;
}

.hit-name {
  margin-bottom: 0.5em;
}

.hit-info {
  font-size: 90%;
}

.header {
  display: flex;
  align-items: center;
  min-height: 50px;
  padding: 0.5rem 1rem;
  background-image: linear-gradient(to right, #4dba87, #2f9088);
  color: #fff;
  margin-bottom: 1rem;
}

.header-title {
  font-size: 1.2rem;
  font-weight: normal;
}

.hit-description {
  font-size: 90%;
  margin-bottom: 0.5em;
  color: grey;
}

.header-title::after {
  content: " ▸ ";
  padding: 0 0.5rem;
}

.header-subtitle {
  font-size: 1.2rem;
}

.container {
  padding: 1rem;
}

.ais-InstantSearch {
  max-width: 960px;
  overflow: hidden;
  margin: 0;
}

.search-panel__filters {
  float: left;
  width: 200px;
}

.search-panel__results {
  margin-left: 210px;
}

.ais-SearchBox {
  margin-bottom: 2rem;
}

.ais-Pagination {
  margin: 2rem auto;
  text-align: center;
}
.ais-SearchBox-form {
  margin-bottom: 20px;
}
</style>
```

In the `DebouncedSearchBox.vue` file:

```vue
<template>
  <form action="" role="search" novalidate="" class="ais-SearchBox-form">
    <!-- :value/@input allows us to pass v-model to the component in v2 --><!-- :modelValue/@update:modelValue allows us to pass v-model to the component in v3 --><input
      type="search"
      v-model="query"
      autocorrect="off"
      autocapitalize="off"
      autocomplete="off"
      spellcheck="false"
      required=""
      maxlength="512"
      aria-label="Search"
      placeholder="Search here…"
      class="ais-SearchBox-input"
    /><button type="submit" title="Search" class="ais-SearchBox-submit">
      <svg
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        viewBox="0 0 40 40"
        class="ais-SearchBox-submitIcon"
      >
        <path
          d="M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z"
          fillRule="evenodd"
        ></path>
      </svg></button
    ><button type="reset" title="Clear" class="ais-SearchBox-reset" hidden="">
      <svg
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
        class="ais-SearchBox-resetIcon"
      >
        <path
          d="M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z"
          fillRule="evenodd"
        ></path>
      </svg></button
    ><!--v-if-->
  </form>
</template>

<script>
import { connectSearchBox } from "instantsearch.js/es/connectors";
import { createWidgetMixin } from "vue-instantsearch/vue3/es";

export default {
  mixins: [createWidgetMixin({ connector: connectSearchBox })],
  props: {
    delay: {
      type: Number,
      default: 200,
      required: false,
    },
  },
  data() {
    return {
      timerId: null,
      localQuery: "",
    };
  },
  destroyed() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  },
  computed: {
    query: {
      get() {
        return this.localQuery;
      },
      set(val) {
        this.localQuery = val;
        if (this.timerId) {
          clearTimeout(this.timerId);
        }
        this.timerId = setTimeout(() => {
          this.state.refine(this.localQuery);
        }, this.delay);
      },
    },
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
- The [instant-meilisearch documentation](https://github.com/meilisearch/instant-meilisearch/) to add some customization.
- The [Meilisearch documentation](https://docs.meilisearch.com/).

<hr>

**Meilisearch** provides and maintains many **SDKs and Integration tools** like this one. We want to provide everyone with an **amazing search experience for any kind of project**. If you want to contribute, make suggestions, or just know what's going on right now, visit us in the [integration-guides](https://github.com/meilisearch/integration-guides) repository.
