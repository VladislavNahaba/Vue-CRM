<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>{{localize('sum')}}</th>
      <th>{{localize('date')}}</th>
      <th>{{localize('category')}}</th>
      <th>{{localize('type')}}</th>
      <th>{{localize('open')}}</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(record, idx) in records" :key="record.id">
      <td>{{idx + 1}}</td>
      <td>{{record.amount | currency('RUB')}}</td>
      <td>{{record.date | date('datetime')}}</td>
      <td>{{record.categoryName}}</td>
      <td>
        <span class="white-text badge" :class="[record.typeClass]">{{record.typeText}}</span>
      </td>
      <td>
        <button
            v-tooltip="localize('open_record')"
            class="btn-small btn"
            @click="$router.push('/detail-record/' + record.id)"
        >
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import localizeFilter from "../filters/localize.filter";
export default {
  name: "HistoryTable",
  props: {
    records: {
      required: true,
      type: Array
    }
  },
  methods: {
    localize(id) {
      return localizeFilter(id);
    }
  }
}
</script>

<style scoped>

</style>
