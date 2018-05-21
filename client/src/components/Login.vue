<template>
  <div class="loginPage">
    <h1>Login</h1>
      <input type="email" name="email" value="email" v-model="email">
      <br>
      <input type="password" name="password" value="password" v-model="password">
      <br>
      <button @click="Login">Login</button>
      <br>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
import firebase from "firebase";
export default {
  name: 'Login',
  data () {
    return {
      email: "*************",
      password: "*******"
    }
  },
  methods: {
    Login () {
      var that = this;
      var emailAndPassword = {
        email: this.email,
        password: this.password
      }
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
        })
        .then(function(res) {
          console.log(`You are logged in as ${res.user.email}`);
          that.$router.go({ path: that.$router.path });
        })

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
