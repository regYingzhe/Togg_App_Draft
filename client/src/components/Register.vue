<template>
  <div class="registerPage">
    <h1>Register</h1>
    <input type="email" name="email" value="email" v-model="email" autocomplete="off">
    <br>
    <input type="password" name="password" value="password" v-model="password" autocomplete="off">
    <br>
    <button @click="register">Register</button>
    <br>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
import firebase from "firebase";

export default {
  name: 'Register',
  data: function() {
    return {
      email: "example@gmail.com",
      password: "*********"
    }
  },
  created: function() {
    // this.routePath();
  },
  methods: {
    async register () {
      var emailAndPassword = {
        email: this.email,
        password: this.password
      }
      const response = await AuthenticationService.register(emailAndPassword);
      this.routePath()
      console.log("response is ", response)
    },
    routePath: function() {
      console.log("inside routePath")
      this.$router.push("RoomDashboard");
      // this.$router.go({ path: this.$router.path });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
