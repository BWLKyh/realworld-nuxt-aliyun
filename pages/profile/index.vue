<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <button
              class="btn btn-sm btn-outline-secondary action-btn"
              v-if="profile.username === user.username"
            >
              <i class="ion-gear-a"></i>
              &nbsp; Edit Profile Setting
            </button>
            <button
              class="btn btn-sm btn-outline-secondary action-btn"
              v-else
              :class="{ active: profile.following }"
              @click="onFollow(profile)"
              :disabled="profile.followDisabled"
            >
              <i
                :class="
                  profile.following ? 'ion-checkmark-round' : 'ion-plus-round'
                "
              ></i>
              &nbsp; Follow {{ profile.username }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: isMyArticles }"
                  exact
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'my_articles',
                    },
                  }"
                  >My Articles</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: !isMyArticles }"
                  exact
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'favorited_articles',
                    },
                  }"
                  >Favorited Articles</nuxt-link
                >
              </li>
            </ul>
          </div>

          <article-preview
            :articleList="articles"
            :page="page"
            :totalPage="totalPage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProfile, addFollow, deleteFollow } from '@/api/profile'
import { getArticles } from '@/api/article'
import { mapState } from 'vuex'
import ArticlePreview from '@/components/article-preview.vue'
export default {
  name: 'ProfileIndex',
  middleware: 'authenticated',
  components: { ArticlePreview },
  props: {},
  data() {
    return {
      profile: {},
      articles: [],
      articlesCount: 0,
      limit: 5,
      page: 0,
    }
  },
  computed: {
    ...mapState(['user']),
    isMyArticles() {
      return this.$route.query.tab !== 'favorited_articles'
    },
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    },
  },
  watch: {
    $route(newVal, oldVal) {
      this.getArticleList()
    },
  },
  created() {
    this.getArticleList()
  },
  mounted() {},
  methods: {
    async getArticleList() {
      const {
        query,
        params: { username },
      } = this.$route

      const page = Number.parseInt(query.page || 1)

      const data = {
        limit: this.limit,
        offset: (page - 1) * this.limit,
      }

      this.isMyArticles ? (data.author = username) : (data.favorited = username)

      const [
        {
          data: { profile },
        },
        {
          data: { articles, articlesCount },
        },
      ] = await Promise.all([getProfile(username), getArticles(data)])

      this.profile = profile
      this.articles = articles
      this.articlesCount = articlesCount
      this.page = page
    },
    async onFollow(profile) {
      profile.followDisabled = true
      if (profile.following) {
        await deleteFollow(profile.username)
        profile.following = false
      } else {
        await addFollow(profile.username)
        profile.following = true
      }
      profile.followDisabled = false
    },
  },
}
</script>

<style scoped></style>
