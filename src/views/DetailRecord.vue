<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{'menu_history' | localize}}</router-link>
        <a @click.prevent class="breadcrumb">
          {{record.detailText}}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="[record.detailColor]">
            <div class="card-content white-text">
              <p>{{'description' | localize}}: {{record.description}}</p>
              <p>{{'sum' | localize}}: {{record.amount | currency}}</p>
              <p>{{'category' | localize}}: {{record.categoryName}}</p>

              <small>{{record.date | date('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>{{'record' | localize}} id=<strong>{{$route.params.id}}</strong> {{'not_found_f' | localize}}</p>
  </div>
</template>

<script>
import localizeFilter from "../filters/localize.filter";
export default {
  metaInfo() {
    return {
      title: this.$title('detail_record')
    }
  },
  name: "DetailRecord",
  data: () => ({
    record: null,
    loading: true
  }),
  async mounted() {
    const id = this.$route.params.id;
    const record = await this.$store.dispatch('fetchRecordById', id);
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId);
    const detailColor = record.type === 'income' ? 'green' : 'red';
    const detailText = record.type === 'income' ? localizeFilter('income') : localizeFilter('outcome');
    this.record = {
      ...record,
      categoryName: category.title,
      detailColor,
      detailText
    };
    this.loading = false;
  }
}
</script>

<style scoped>

</style>
