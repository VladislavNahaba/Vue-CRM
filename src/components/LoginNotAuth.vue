<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{'home_accounting' | localize(currentLocale)}}</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small v-if="$v.email.$dirty && !$v.email.required" class="helper-text invalid">{{'validation_email_required' | localize(currentLocale)}}</small>
        <small v-else-if="$v.email.$dirty && !$v.email.email" class="helper-text invalid">{{'validation_email_incorrect' | localize(currentLocale)}}</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">{{'password' | localize(currentLocale)}}</label>
        <small v-if="$v.password.$dirty && !$v.password.required" class="helper-text invalid">{{'validation_password_required' | localize(currentLocale)}}</small>
        <small v-else-if="$v.password.$dirty && !$v.password.minLength" class="helper-text invalid">{{'validation_password_minimal' | localize(currentLocale)}} - 6</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          {{'enter' | localize(currentLocale)}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{'no_account' | localize(currentLocale)}}?
        <router-link to="/register">{{'register' | localize(currentLocale)}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
import messages from "../utils/messages";
import localizeFilter from "../filters/localize.filter";
export default {
  name: "LoginNotAuth",
  data: () => ({
    email: '',
    password: '',
    currentLocale: 'ru-RU'
  }),
  validations: {
    email: {required, email},
    password: {required, minLength: minLength(6)}
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  },
  methods: {
    determineLocale() {
      if (!localizeFilter()) {
        this.currentLocale = window.navigator.language || window.navigator.userLanguage;
      } else {
        this.currentLocale = localizeFilter();
      }
    },
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password
      };
      try {
        await this.$store.dispatch('login', formData);
        await this.$router.push('/');
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>

<style scoped>

</style>
