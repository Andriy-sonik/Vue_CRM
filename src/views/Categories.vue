<template>
  <div>
    <div class="page-title">
      <h3>{{ "Menu_Categories" | localize }}</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <CategoryCreate @created="addNewCategory" />
        <CategoryEdit
          v-if="categories.length"
          :categories="categories"
          @updated="updatedCategories"
          :key="categories.length + updateCount"
        />
        <p v-else class="center">Категорій поки немає</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "../components/CategoryCreate";
import CategoryEdit from "../components/CategoryEdit";
export default {
  name: "Categories",
  components: {
    CategoryCreate,
    CategoryEdit
  },
  data() {
    return {
      categories: [],
      loading: true,
      updateCount: 0
    };
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    updatedCategories(category) {
      const index = this.categories.findIndex(elem => elem.id === category.id);
      this.categories[index].title = category.title;
      this.categories[index].limit = category.limit;
      this.updateCount++;
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
  }
};
</script>

<style scoped></style>
