<template>
  <div>
    <login-auth @logout="logout" v-if="user" :email="user.email" />
    <login-not-auth v-else />
  </div>
</template>

<script>
import LoginAuth from "../components/LoginAuth";
import LoginNotAuth from "../components/LoginNotAuth";
import firebase from "firebase/app";
export default {
  name: "Login",
  components: {LoginAuth, LoginNotAuth},
  data: () => ({
    user: null
  }),
  mounted() {
    this.user = firebase.auth().currentUser;
  },
  methods: {
    logout() {
      this.user = null;
    }
  }
}
</script>

<style scoped>

</style>
