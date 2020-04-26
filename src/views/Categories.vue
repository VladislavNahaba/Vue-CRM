<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <category-create @created="addNewCategory" />
        <category-edit />
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
    categories: []
  }),
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    }
  }
}
</script>

<style scoped>

</style>
