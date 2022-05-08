<template>
  <div>
    <div
      class="article-preview"
      v-for="article in articles"
      :key="article.slug"
    >
      <div class="article-meta">
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: article.author.username,
            },
          }"
        >
          <img :src="article.author.image" />
        </nuxt-link>
        <div class="info">
          <nuxt-link
            class="author"
            :to="{
              name: 'profile',
              params: {
                username: article.author.username,
              },
            }"
          >
            {{ article.author.username }}
          </nuxt-link>
          <span class="date">{{
            article.createdAt | date('MMM DD, YYYY')
          }}</span>
        </div>
        <button
          class="btn btn-outline-primary btn-sm pull-xs-right"
          :class="{ active: article.favorited }"
          @click="onFavorite(article)"
          :disabled="article.favoriteDisabled"
        >
          <i class="ion-heart"></i>{{ article.favoritesCount }}
        </button>
      </div>
      <nuxt-link
        :to="{
          name: 'article',
          params: {
            slug: article.slug,
          },
        }"
        class="preview-link"
      >
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>
        <span>Read more...</span>
        <ul class="tag-list">
          <li
            class="tag-default tag-pill tag-outline"
            v-for="tag in article.tagList"
            :key="tag"
          >
            {{ tag }}
          </li>
        </ul>
      </nuxt-link>
    </div>

    <!--分页-->
    <nav>
      <ul class="pagination">
        <li
          class="page-item"
          :class="{ active: item === page }"
          v-for="item in totalPage"
          :key="item"
        >
          <nuxt-link
            class="page-link"
            :to="{
              name: 'profile',
              params: { ...$route.params },
              query: {
                ...$route.query,
                page: item,
              },
            }"
            >{{ item }}</nuxt-link
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
/**
 * 如何在组件中使用异步数据？
    如果组件不是和路由绑定的页面组件，原则上是不可以使用异步数据的。因为 Nuxt.js 仅仅扩展增强了页面组件的 data 方法，使得其可以支持异步数据处理。

    对于非页面组件，有两种方式可以实现数据的异步获取：

    1.在组件的 mounted 方法里面实现异步获取数据的逻辑，之后设置组件的数据，限制是：不支持服务端渲染。
    2.在页面组件的asyncData或fetch方法中进行 API 调用，并将数据作为props传递给子组件。服务器渲染工作正常。缺点：asyncData或页面提取可能不太可读，因为它正在加载其他组件的数据。总之，使用哪种方法取决于你的应用是否需要支持子组件的服务端渲染。
  总之, 若需使用服务端渲染, 尽量不要拆分组件
 */
import { addFavorite, deleteFavorite } from '@/api/article'
export default {
  name: 'ArticlePreview',
  components: {},
  props: {
    articleList: {
      type: Array,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
    totalPage: {
      type: Number,
      required: true,
    },
  },
  data() {
    return { articles: [] }
  },
  computed: {},
  watch: {
    articleList(newVal, oldVal) {
      this.articles = newVal
    },
  },
  created() {},
  mounted() {
    this.articles = this.articleList
  },
  methods: {
    async onFavorite(article) {
      article.favoriteDisabled = true
      if (article.favorited) {
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount -= 1
      } else {
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favoriteDisabled = false
    },
  },
}
</script>

<style scoped></style>
