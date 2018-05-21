<template>
  <div class="signOutPage">
    <h1>Signout</h1>
    <button @click="Signout">Signout</button>
    <br>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: 'Signout',
  data () {
    return {
      email: "email",
      password: "*******"
    }
  },
  methods: {
    Signout () {
      firebase.auth().signOut()
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
        })
        .then(function(res) {
          console.log(`You are signout in as ${res}`);
        });
      this.$router.push('/login');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
