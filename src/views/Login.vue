<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">{{ "authorization" | localize }}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{
            invalid:
              ($v.email.$dirty && !$v.email.required) ||
              ($v.email.$dirty && !$v.email.email)
          }"
        />
        <label for="email">{{ "email" | localize }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >
          {{ "email_field" | localize }}
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >
          {{ "email_correct" | localize }}
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{
            invalid:
              ($v.password.$dirty && !$v.password.required) ||
              ($v.password.$dirty && !$v.password.minLength)
          }"
        />
        <label for="password">{{ "password" | localize }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >
          {{ "enter_password" | localize }}
        </small>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.minLength"
        >
          {{ "must_password_least" | localize }}
          {{ $v.password.$params.minLength.min }} .{{ "Now he is" | localize }}
          {{ password.length }}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{ "log_in" | localize }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ "no_account" | localize }}
        <router-link to="/registering">{{ "register" | localize }}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";
import messages from "../utils/messages";
export default {
  name: "Login",
  metaInfo() {
    return {
      title: this.$title('log_in')
    };
  },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(8) }
  },
  methods: {
    onSubmit: async function() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formDate = {
        email: this.email,
        password: this.password
      };
      try {
        await this.$store.dispatch("login", formDate);
        this.$router.push("/");
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  }
};
</script>

<style scoped></style>
