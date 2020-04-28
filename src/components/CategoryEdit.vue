<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'edit' | localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="category">
            <option
                v-for="cat in categories"
                :key="cat.id"
                :value="cat.id"
            >{{cat.title}}</option>
          </select>
          <label>{{'chose_category' | localize}}</label>
        </div>

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
          {{'refresh' | localize}}
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
  name: "CategoryEdit",
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    select: null,
    category: null,
    title: '',
    limit: 100
  }),
  validations: {
    title: {required},
    limit: {minValue: minValue(100)}
  },
  watch: {
    category(value) {
      const {title, limit} = this.categories.find(cat => cat.id === value);
      this.title = title;
      this.limit = limit;
    }
  },
  created() {
    const {id, title, limit} = this.categories[0];
    this.category = id;
    this.title = title;
    this.limit = limit;
  },
  mounted() {
    this.select = window.M.FormSelect.init(this.$refs.select);
    window.M.updateTextFields();
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        const categoryData = {
          id: this.category,
          title: this.title,
          limit: this.limit
        };
        await this.$store.dispatch('updateCategory', categoryData);
        this.$message(localizeFilter('category_updated'));
        this.$emit('updated', categoryData);
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

</style>
