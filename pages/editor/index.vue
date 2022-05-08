<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset class="form-group">
              <input
                v-model="article.title"
                type="text"
                class="form-control form-control-lg"
                placeholder="Article Title"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="article.description"
                type="text"
                class="form-control"
                placeholder="What's this article about?"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <textarea
                v-model="article.body"
                class="form-control"
                rows="8"
                placeholder="Write your article (in markdown)"
                required
              ></textarea>
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="tag"
                type="text"
                class="form-control"
                placeholder="Enter tags"
                @keyup.enter="onAddTag(tag)"
              />
              <div class="tag-list"></div>
            </fieldset>
            <div class="tag-list">
              <span
                class="tag-default tag-pill ng-binding ng-scope"
                v-for="tag in article.tagList"
                :key="tag"
              >
                <i class="ion-close-round" @click="onDeleteTag(tag)"></i>
                {{ tag }}
              </span>
            </div>
            <button
              class="btn btn-lg pull-xs-right btn-primary"
              @click="onSubmit"
              type="button"
            >
              Publish Article
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle, updateArticle, addArticle } from '@/api/article'
export default {
  name: 'EditorIndex',
  middleware: 'authenticated',
  components: {},
  props: {},
  data() {
    return {
      slug: null,
      article: {
        tagList: [],
      },
      tag: '',
    }
  },
  computed: {},
  watch: {},
  async created() {
    const slug = this.$route.query.slug
    if (!!slug) {
      const { data } = await getArticle(slug)
      this.slug = slug
      this.article = data.article
    } else {
      this.article = { tagList: [] }
    }
  },
  mounted() {},
  methods: {
    onAddTag(tag) {
      if (!!tag) {
        this.article.tagList.push(tag)
        this.tag = ''
      }
    },
    onDeleteTag(tag) {
      this.article.tagList.splice(this.article.tagList.indexOf(tag), 1)
    },
    async onSubmit() {
      const { data } = !this.slug
        ? await addArticle({ article: this.article })
        : await updateArticle({ slug: this.slug, article: this.article })
      this.$router.push({
        name: 'article',
        params: { slug: data.article.slug },
      })
    },
  },
}
</script>

<style scoped></style>
