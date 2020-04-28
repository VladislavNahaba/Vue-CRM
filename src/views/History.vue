<template>
  <div>
    <div class="page-title">
      <h3>{{'history_title' | localize}}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      {{'history_no_records' | localize}}
      <router-link to="/record">{{'history_add_record' | localize}}</router-link>
    </p>

    <section v-else>
      <history-table :records="items" />
      <paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="localize('back')"
        :next-text="localize('next')"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import HistoryTable from "../components/HistoryTable";
import paginationMixin from "../mixins/pagination.mixin";
import {Pie} from "vue-chartjs";
import localizeFilter from "../filters/localize.filter";
export default {
  name: "History",
  extends: Pie,
  components: {HistoryTable},
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: []
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');

    this.setup(categories);
    this.loading = false;
  },
  methods: {
    localize(id) {
      return localizeFilter(id);
    },
    setup(categories) {
      this.setupPagination(this.records.map(record => {
        return {
          ...record,
          categoryName: categories.find(cat => cat.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? this.localize('income') : this.localize('outcome')
        }
      }));

      this.renderChart({
        labels: categories.map(cat => cat.title),
        datasets: [{
          label: 'Расходы по категориям',
          data: categories.map(cat => {
            return this.records.reduce((acc, val) => {
              if (val.categoryId === cat.id && val.type === 'outcome') {
                acc += +val.amount;
              }
              return acc;
            }, 0);
          }),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      });
    }
  }
}
</script>

<style scoped>

</style>
