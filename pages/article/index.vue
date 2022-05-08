<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <article-meta :article="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <!-- <div class="col-md-12">
          {{ article.body }}
        </div> -->
        <div class="col-md-12" v-html="article.body">
          {{ article.body }}
        </div>
      </div>

      <ul class="tag-list">
        <li
          class="tag-default tag-pill tag-outline ng-binding ng-scope"
          v-for="(tag, i) in article.tagList"
          :key="i"
        >
          {{ tag }}
        </li>
      </ul>
      <hr />

      <div class="article-actions">
        <article-meta :article="article" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <article-comments :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
import MarkdownIt from 'markdown-it'
import ArticleMeta from '@/components/article-meta.vue'
import ArticleComments from '@/components/article-comments.vue'

export default {
  name: 'ArticleIndex',
  async asyncData({ params }) {
    const { data } = await getArticle(params.slug)
    const { article } = data
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    return {
      article,
    }
  },
  components: { ArticleMeta, ArticleComments },
  head() {
    return {
      title: `${this.article.title} - RealWord-LKyh`,
      meta: [
        {
          hid: 'description', // 避免子组件不能正确覆盖父组件中相同标签
          name: 'description',
          content: this.article.description,
        },
      ],
    }
  },
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style scoped></style>
