<template>
  <div>
    <div class="page-title">
      <h3>{{'ProfileTitle' | localize}}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="name"
            :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label for="description">{{'name' | localize}}</label>
        <small
            v-if="$v.name.$dirty && !$v.name.required"
            class="helper-text invalid"
        >{{'nameRequired' | localize}}</small>
      </div>

      <div class="input-field">
        <select ref="select" v-model="locale">
          <option value="ru-RU">Русский</option>
          <option value="en-US">English</option>
        </select>
        <label>{{'choseLanguage' | localize}}</label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'refresh' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'
import {mapGetters, mapActions} from 'vuex';
export default {
  name: "Profile",
  data: () => ({
    select: null,
    name: '',
    locale: 'ru-RU'
  }),
  validations: {
    name: {required}
  },
  mounted() {
    this.name = this.info.name;
    this.locale = this.info.locale;
    setTimeout(() => {
      this.select = window.M.FormSelect.init(this.$refs.select);
      window.M.updateTextFields();
    }, 0);
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        await this.updateInfo({
          name: this.name,
          locale: this.locale
        });
      } catch (e) {
        console.log(e);
      }
    }
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  }
}
</script>

<style scoped>
.input-field {
  margin-bottom: 2rem;
}
</style>
