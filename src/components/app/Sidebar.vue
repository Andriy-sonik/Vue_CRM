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
export default {
  name: "Sidebar",
  props: ['value'],
  data() {
    return {
      links: [
        { title: "Счет", url: "/", exact: true },
        { title: "История", url: "/history" },
        { title: "Планирование", url: "/planning" },
        { title: "Новая запись", url: "/record" },
        { title: "Категории", url: "/categories" }
      ]
    };
  }
};
</script>

<style scoped></style>
