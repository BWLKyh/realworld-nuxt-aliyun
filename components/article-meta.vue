<template>
  <div class="article-meta">
    <nuxt-link
      class="inline"
      :to="{
        name: 'profile',
        params: {
          username: article.author.username,
        },
      }"
      ><img :src="article.author.image"
    /></nuxt-link>
    <div class="info inline-block">
      <nuxt-link
        :to="{
          name: 'profile',
          params: {
            username: article.author.username,
          },
        }"
        >{{ article.author.username }}</nuxt-link
      >
      <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
    </div>
    <div v-if="user.username === article.author.username" class="inline-block">
      <nuxt-link
        :to="{
          name: 'editor',
          query: {
            slug: article.slug,
          },
        }"
      >
        <button class="btn btn-sm btn-outline-secondary">
          <i class="ion-edit"></i>&nbsp; Edit Article
        </button>
      </nuxt-link>
      &nbsp;&nbsp;
      <button class="btn btn-sm btn-outline-danger" @click="onDelete(article)">
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </div>
    <div v-else class="inline-block">
      <button
        class="btn btn-sm btn-outline-secondary"
        :class="{ active: article.author.following }"
        @click="onFollow(article.author)"
        :disabled="article.author.followDisabled"
      >
        <i
          :class="
            article.author.following ? 'ion-checkmark-round' : 'ion-plus-round'
          "
        ></i>
        &nbsp; {{ `Follow ${article.author.username}` }}
        <!-- 粉丝数数据缺失-->
        <!-- <span class="counter">(10)</span> -->
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{ active: article.favorited }"
        @click="onFavorite(article)"
        :disabled="article.favoriteDisabled"
      >
        <i class="ion-heart"></i>
        &nbsp; Favorite Post
        <span class="counter">{{ `(${article.favoritesCount})` }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import { addFavorite, deleteFavorite, deleteArticle } from '@/api/article'
import { addFollow, deleteFollow } from '@/api/profile'
import { mapState } from 'vuex'
export default {
  name: 'ArticleMeta',
  components: {},
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: { ...mapState(['user']) },
  watch: {},
  created() {},
  mounted() {},
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
    async onFollow(author) {
      author.followDisabled = true
      if (author.following) {
        await deleteFollow(author.username)
        author.following = false
      } else {
        await addFollow(author.username)
        author.following = true
      }
      author.followDisabled = false
    },
    async onDelete(article) {
      try {
        await deleteArticle(article.slug)
        alert('Delete Success!')
        this.$router.push('/')
      } catch (error) {
        alert('Delete Fail!')
        console.dir(error)
      }
    },
  },
}
</script>

<style scoped>
.inline-block {
  display: inline-block;
}
</style>
