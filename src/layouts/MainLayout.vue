<template>
  <div>
    <Loader v-if="loading" />
    <div v-else>
      <div class="app-main-layout">
        <Navbar @click="isOpen = !isOpen" />
        <Sidebar v-model="isOpen" :key="locale" />
        <main class="app-content" :class="{ full: !isOpen }">
          <div class="app-page">
            <router-view />
          </div>
        </main>
        <div class="fixed-action-btn" :key="locale + '1'">
          <router-link
            class="btn-floating btn-large blue"
            to="/record"
            v-tooltip="'create_new_record'"
          >
            <i class="large material-icons">add</i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/app/Navbar";
import Sidebar from "../components/app/Sidebar";
import messages from "../utils/messages";
export default {
  name: "MainLayout",
  components: {
    Navbar,
    Sidebar
  },
  data() {
    return {
      isOpen: true,
      loading: true
    };
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    locale(){
      return this.$store.getters.info.locale
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || "Щось пішло не так!");
    }
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }
    this.loading = false;
  }
};
</script>

<style scoped></style>
