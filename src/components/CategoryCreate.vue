<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'create' | localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model="title"
              :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >
          <label for="name">{{'title' | localize}}</label>
          <small
              v-if="$v.title.$dirty && !$v.title.required"
              class="helper-text invalid"
          >
            {{'enter_title_category' | localize}}
          </small>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model.number="limit"
              :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          >
          <label for="limit">{{'limit' | localize}}</label>
          <span
              class="helper-text invalid"
              v-if="$v.limit.$dirty && !$v.limit.minValue"
          >
            {{'minimal_value' | localize}} - 100
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{'create' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'
import localizeFilter from "../filters/localize.filter";
export default {
  name: "CategoryCreate",
  data: () => ({
    title: '',
    limit: 100
  }),
  validations: {
    title: {required},
    limit: {minValue: minValue(100)}
  },
  mounted() {
    window.M.updateTextFields();
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        });
        this.title = '';
        this.limit = 100;
        this.$v.$reset();
        this.$message(localizeFilter('category_created'));
        this.$emit('created', category);
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>

<style scoped>

</style>
