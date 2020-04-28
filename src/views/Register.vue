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
      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label for="name">{{'name' | localize(currentLocale)}}</label>
        <small v-if="$v.name.$dirty && !$v.name.required" class="helper-text invalid">{{'validation_name' | localize(currentLocale)}}</small>
      </div>
      <p>
        <label>
          <input
              type="checkbox"
              v-model="agree"
          />
          <span>{{'rules_agree' | localize(currentLocale)}}</span>
        </label>
      </p>
      <small v-if="$v.agree.$dirty && !$v.agree.checked" class="helper-text invalid">{{'validation_rules_agree' | localize(currentLocale)}}</small>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          {{'register' | localize(currentLocale)}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
import localizeFilter from "../filters/localize.filter";
export default {
  metaInfo() {
    return {
      title: this.$title('register')
    }
  },
  name: "Register",
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false,
    currentLocale: 'ru-RU'
  }),
  validations: {
    email: {required, email},
    password: {required, minLength: minLength(6)},
    name: {required},
    agree: {checked: v => v}
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
        password: this.password,
        name: this.name
      };

      try {
        await this.$store.dispatch('register', formData);
        this.$router.push('/');
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>

<style scoped>

</style>
