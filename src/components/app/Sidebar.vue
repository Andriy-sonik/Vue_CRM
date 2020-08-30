<template>
  <ul class="sidenav app-sidenav" :class="{ open: value }">
    <router-link
      v-for="(item, index) of links"
      :key="index"
      tag="li"
      active-class="active"
      :to="item.url"
      :exact="item.exact"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{ item.title }}</a>
    </router-link>
  </ul>
</template>

<script>
import localizeFilter from "../../filters/localize.filter";
export default {
  name: "Sidebar",
  props: ["value"],
  data() {
    return {
      links: [
        { title: localizeFilter("Menu_Bill"), url: "/", exact: true },
        { title: localizeFilter("Menu_History"), url: "/history" },
        { title: localizeFilter("Menu_Planning"), url: "/planning" },
        { title: localizeFilter("Menu_NewRecord"), url: "/record" },
        { title: localizeFilter("Menu_Categories"), url: "/categories" }
      ]
    };
  }
};
</script>

<style scoped></style>
