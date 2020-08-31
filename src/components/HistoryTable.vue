<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{ "amount" | localize }}</th>
        <th>{{ "date" | localize }}</th>
        <th>{{ "category" | localize }}</th>
        <th>{{ "type" | localize }}</th>
        <th>{{ "open" | localize }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, index) of records" :key="record.id">
        <td>{{ index + 1 }}</td>
        <td>{{ record.amount | currency("RUB") }}</td>
        <td>{{ record.date | date("datetime") }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="[record.typeClass]">
            {{ record.typeText }}
          </span>
        </td>
        <td>
          <button
            class="btn-small btn"
            v-tooltip="'view_record'"
            @click="$router.push('/detail/' + record.id)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "HistoryTable",
  props: {
    records: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped></style>
