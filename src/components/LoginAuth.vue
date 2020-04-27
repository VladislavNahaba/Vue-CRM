<template>
  <div>
    <Loader v-if="loading" />
    <form v-else class="card auth-card" @submit.prevent="submitHandler">
      <div class="card-content">
        <span class="card-title">Домашняя бухгалтерия</span>
        <div class="input-field">
          <input
              disabled
              id="name"
              type="text"
              :value="name"
          >
          <label for="name">Name</label>
        </div>
        <div class="input-field">
          <input
              disabled
              id="email"
              type="text"
              :value="email"
          >
          <label for="email">Email</label>
        </div>
      </div>
      <div class="card-action">
        <div>
          <button
              class="btn waves-effect waves-light auth-submit"
              type="submit"
          >
            Выйти
            <i class="material-icons right">exit_to_app</i>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginAuth",
  props: ['email'],
  data: () => ({
    loading: true
  }),
  methods: {
    async submitHandler() {
      await this.$store.dispatch('logout');
      this.$emit('logout');
      this.$router.push('/login?message=logout');
    }
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.loading = false;
    setTimeout(() => {
      window.M.updateTextFields();
    }, 0);
  },
  computed: {
    name() {
      return this.$store.getters.info.name
    }
  }
}
</script>

<style scoped>

</style>
