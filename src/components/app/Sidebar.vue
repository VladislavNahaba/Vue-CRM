<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">

    <router-link
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
      v-for="(link, index) in links"
      :key="index"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
    </router-link>
  </ul>
</template>

<script>
import localizeFilter from "../../filters/localize.filter";
export default {
  name: "Sidebar",
  props: ['value'],
  data() {
    return {
      links: [
        {title: localizeFilter('menu_bill'), url: '/', exact: true},
        {title: localizeFilter('menu_history'), url: '/history'},
        {title: localizeFilter('menu_planning'), url: '/planning'},
        {title: localizeFilter('menu_record'), url: '/record'},
        {title: localizeFilter('menu_category'), url: '/categories'}
      ]
    }
  }
}
</script>

<style scoped>

</style>
