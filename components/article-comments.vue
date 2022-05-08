<template>
  <div class="">
    <form class="card comment-form" @submit.prevent="onSubmit">
      <div class="card-block">
        <textarea
          v-model="comment.body"
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          required
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">
          {{ comment.body }}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
          class="comment-author"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
          class="comment-author"
        >
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{
          comment.createdAt | date('MMM DD, YYYY')
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, addComment } from '@/api/article'
import { mapState } from 'vuex'
export default {
  name: 'ArticleComments',
  components: {},
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comments: [],
      comment: {
        body: '',
      },
    }
  },
  computed: { ...mapState(['user']) },
  watch: {},
  created() {},
  async mounted() {
    // 只在客户端渲染
    const { data } = await getComments(this.article.slug)
    this.comments = data.comments // 这里不能像 asyncData 中一样直接 return,需手动赋值
  },
  methods: {
    async onSubmit() {
      try {
        await addComment({
          slug: this.article.slug,
          comment: this.comment,
        })
        this.$router.go(0)
      } catch (error) {
        console.dir(error)
        this.errors = error.response.data.errors
      }
    },
  },
}
</script>

<style scoped></style>
