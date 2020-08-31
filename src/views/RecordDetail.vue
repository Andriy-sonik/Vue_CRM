<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{
          "Menu_History" | localize
        }}</router-link>
        <a @click.prevent="" class="breadcrumb">{{ record.typeText }}</a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="[record.typeClass]">
            <div class="card-content white-text">
              <p>{{ "description" | localize }}: {{ record.description }}</p>
              <p>
                {{ "amount" | localize }}: {{ record.amount | currency("RUB") }}
              </p>
              <p>{{ "category" | localize }}: {{ record.categoryName }}</p>

              <small>{{ record.date | date("datetime") }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>
      {{ "record_with" | localize }} id = {{ $route.params.id }}
      {{ "this_not_found" | localize }}
    </p>
  </div>
</template>

<script>
import localizeFilter from "../filters/localize.filter";
export default {
  name: "RecordDetail",
  metaInfo() {
    return {
      title: this.$title('history_record')
    };
  },
  data() {
    return {
      loading: true,
      record: null
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    const record = await this.$store.dispatch("fetchRecordsById", id);
    const category = await this.$store.dispatch(
      "fetchCategoriesById",
      record.categoryId
    );
    this.record = {
      ...record,
      categoryName: category.title,
      typeClass: record.type === "income" ? "green" : "red",
      typeText:
        record.type === "income"
          ? localizeFilter("income")
          : localizeFilter("cost")
    };
    this.loading = false;
  }
};
</script>

<style scoped></style>
