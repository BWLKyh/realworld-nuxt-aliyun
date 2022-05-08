<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.image"
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="user.bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.email"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  minlength="8"
                  required
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="onLogout()">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, updateUser } from '@/api/user'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  name: 'SettingsIndex',
  middleware: 'authenticated',
  components: {},
  props: {},
  data() {
    return {
      user: {},
    }
  },
  computed: {},
  watch: {},
  async created() {
    const { data } = await getUser()
    this.user = data.user
  },
  mounted() {},
  methods: {
    async onSubmit() {
      const { data } = await updateUser({
        user: this.user,
      })
      this.$store.commit('setUser', data.user)
      Cookie.set('user', JSON.stringify(data.user))
      this.$router.push({
        name: 'profile',
        params: {
          username: this.user.username,
        },
      })
    },
    onLogout() {
      this.$store.commit('setUser', null)
      Cookie.remove('user')
      this.$router.push('/')
    },
  },
}
</script>

<style scoped></style>
