<template lang="html">
  <nav>
    <div class="nav-wrapper orange">
        <router-link to="/" class="brand-logo">
          <img src="../assets/togg.png" alt="Togg" height="30" width="65"
            hspace="20" style="margin:20px">
        </router-link>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        <ul class="right hide-on-med-and-down">
          <li><router-link to="/login">My Dashboard</router-link></li>
          <li v-if="!isLoggedIn"><router-link to="/login">Login</router-link></li>
          <li v-if="!isLoggedIn"><router-link to="/register">Register</router-link></li>
          <li v-if="isLoggedIn" @click="logout"><router-link to="/">Logout</router-link></li>
        </ul>
    </div>
  </nav>
</template>

<script>
import firebase from "firebase";
export default {
  name: 'navbar',
  data: function() {
    return {
      isLoggedIn: false,
      currentUser: false
    }
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    logout: function() {
      var that = this;
      firebase.auth().signOut()
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
        })
        .then(function(res) {
          console.log(`You are logout`);
          // console.log("Logout path is ", that.$router.path)
          that.$router.go({ path: that.$router.path });
        });
    }
  }
}
</script>

<style lang="css">
</style>
