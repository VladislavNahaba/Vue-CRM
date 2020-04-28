<template>
  <div>
    <div class="page-title">
      <h3>{{'menu_record' | localize}}</h3>
    </div>

    <Loader v-if="loading"></Loader>

    <p v-else-if="!categories.length" class="center">{{'no_categories' | localize}}. <router-link to="/categories">{{'add_category' | localize}}</router-link></p>

    <form v-else class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option
              v-for="c in categories"
              :value="c.id"
              :key="c.id"
          >{{c.title}}</option>
        </select>
        <label>{{'chose_category' | localize}}</label>
      </div>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              v-model="type"
              value="income"
          />
          <span>{{'income' | localize}}</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              v-model="type"
              value="outcome"
          />
          <span>{{'outcome' | localize}}</span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model.number="amount"
            :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        >
        <label for="amount">{{'sum' | localize}}</label>
        <small
            v-if="$v.amount.$dirty && !$v.amount.minValue"
            class="helper-text invalid"
        >
          {{'sum' | localize}} {{'bigger' | localize}} 1
        </small>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="description"
            :class="{invalid: $v.description.$dirty && !$v.description.required}"
        >
        <label for="description">{{'description' | localize}}</label>
        <small
            v-if="$v.description.$dirty && !$v.description.required"
            class="helper-text invalid"
        >
          {{'enter_description' | localize}}
        </small>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'create' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators';
import {mapGetters} from 'vuex';
import localizeFilter from "../filters/localize.filter";
export default {
  metaInfo() {
    return {
      title: this.$title('menu_record')
    }
  },
  name: "Record",
  data: () => ({
    loading: true,
    categories: [],
    select: null,
    category: null,
    type: 'outcome',
    amount: 1,
    description: ''
  }),
  validations: {
    amount: {minValue: minValue(1)},
    description: {required}
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          });
          const bill = this.type === 'income'
            ? this.info.bill + this.amount
            : this.info.bill - this.amount;
          await this.$store.dispatch('updateInfo', {bill});
          this.$message(localizeFilter('record_created'));
          this.$v.$reset();
          this.type = 'outcome';
          this.amount = 1;
          this.description = '';
        } catch (e) {
          console.log(e);
        }
      } else {
        this.$message(`${localizeFilter('not_enough_money')} (${this.amount - this.info.bill})`);
      }
    }
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true;
      }
      return this.info.bill >= this.amount;
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
    if (this.categories.length) {
      this.category = this.categories[0].id;
    }
    setTimeout(() => {
      this.select = window.M.FormSelect.init(this.$refs.select);
      window.M.updateTextFields();
    }, 0);
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
