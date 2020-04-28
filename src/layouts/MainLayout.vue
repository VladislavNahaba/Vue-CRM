<template>
  <div>
    <Loader v-if="loading"></Loader>
    <div v-else class="app-main-layout">

      <navbar @clickMenu="isOpen = !isOpen" />

      <sidebar v-model="isOpen" :key="locale" />

      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn" v-tooltip:left="localize">
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/app/Navbar";
import Sidebar from "../components/app/Sidebar";
import messages from "../utils/messages";
import localizeFilter from "../filters/localize.filter";
export default {
  name: "MainLayout",
  components: { Navbar, Sidebar },
  data: () => ({
    isOpen: true,
    loading: true
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.loading = false;
  },
  computed: {
    error() {
      return this.$store.getters.error
    },
    locale() {
      return this.$store.getters.info.locale;
    },
    localize() {
      return localizeFilter('new_record')
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Что-то пошло не так');
    }
  }
}
</script>

<style scoped>

</style>
