<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>

    <section>
      <Loader v-if="loading"></Loader>
      <div v-else class="row">
        <category-create @created="addNewCategory" />
        <category-edit
            v-if="categories.length"
            @updated="updateCategory"
            :key="categories.length + updateCount"
            :categories="categories"
        />
        <p v-else class="center">Нет категорий</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "../components/CategoryCreate";
import CategoryEdit from "../components/CategoryEdit";
export default {
  name: "Categories",
  components: {CategoryCreate, CategoryEdit},
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    updateCategory(category) {
      const idx = this.categories.findIndex(c => c.id === category.id);
      this.categories[idx].title = category.title;
      this.categories[idx].limit = category.limit;
      this.updateCount++;
    }
  }
}
</script>

<style scoped>

</style>
