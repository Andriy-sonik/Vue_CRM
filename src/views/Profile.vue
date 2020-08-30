<template>
  <div>
    <div class="page-title">
      <h3>{{ "profileTitle" | localize }}</h3>
    </div>

    <form class="form" @submit.prevent="onSubmit">
      <div class="input-field">
        <input
          id="profile_name"
          type="text"
          v-model="name"
          :class="{
            invalid: $v.name.$dirty && !$v.name.required
          }"
        />
        <label for="profile_name">{{ "name" | localize }}</label>
        <span
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >
          {{ "inputName" | localize }}
        </span>
      </div>
      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale" />
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ "update" | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
  name: "Profile",
  data() {
    return {
      name: "",
      isRuLocale: true
    };
  },
  validations: {
    name: { required }
  },
  computed: {
    ...mapGetters({
      info: "info"
    })
  },
  methods: {
    ...mapActions(["updateInfo"]),
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? "ru-RU" : "en-US"
        });
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
  },
  mounted() {
    this.name = this.info.name;
    this.isRuLocale = this.info.locale === "ru-RU" ? true : false;
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      M.updateTextFields();
    }, 0);
  }
};
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
