<template>
  <div>
    <div class="page-title">
      <h3>{{'menu_planning' | localize}}</h3>
      <h4>{{info.bill | currency('RUB')}}</h4>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">{{'no_categories' | localize}}. <router-link to="/categories">{{'add_category' | localize}}</router-link></p>

    <section v-else>
      <div v-for="cat in categories" :key="cat.id">
        <p>
          <strong>{{cat.title}}:</strong>
          {{cat.spend | currency('RUB')}} {{'of' | localize}} {{cat.limit | currency('RUB')}}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
              class="determinate"
              :class="[cat.progressColor]"
              :style="{width: cat.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import currencyFilter from "../filters/currency.filter";
import localizeFilter from "../filters/localize.filter";
export default {
  name: "Planning",
  data: () => ({
    loading: true,
    categories: []
  }),
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');
    this.categories = categories.map(cat => {
      const spend = records
        .filter(rec => rec.categoryId === cat.id)
        .filter(rec => rec.type === 'outcome')
        .reduce((total, record) => {
          return total += +record.amount;
        }, 0);

      const percent = 100 * spend / cat.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      const progressColor = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red';
      const tooltipValue = cat.limit - spend;
      const tooltip = `${tooltipValue < 0 ? localizeFilter('excess') : localizeFilter('left')} ${currencyFilter(Math.abs(tooltipValue), 'RUB')}`;
      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip
      }
    });
    this.loading = false;
  },
  computed: {
    ...mapGetters(['info'])
  }
}
</script>

<style scoped>

</style>
