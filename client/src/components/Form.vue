<template>
  <div class="row" style="margin:40px">
    <form class="col s12" autocomplete="off" @submit="updateUser">
      <p>
        <label style="margin-right: 25em">
          <input name="position" type="radio" id="manager" value="manager" v-model="picked"/>
          <span>Care Manager</span>
        </label>

        <label>
          <input name="position" type="radio" id="caregiver" value="caregiver" v-model="picked"/>
          <span>Care Giver</span>
        </label>
      </p>

      <div class="row">
        <div class="input-field col s6">
          <input id="first_name" name="first_name" type="text" v-model="firstName" class="validate">
          <label for="first_name">First Name</label>
        </div>
        <div class="input-field col s6">
          <input id="last_name" name="last_name" type="text" v-model="lastName" class="validate">
          <label for="last_name">Last Name</label>
        </div>
      </div>

      <div class="row">
        <div class="input-field col s12">
          <input id="employee_id" name="employee_id" type="text" v-model="employeeID" class="validate" >
          <label for="employee_id">Employee ID</label>
        </div>
      </div>

      <div class="row">
        <div class="input-field col s12">
          <input id="email" type="email" name="contact_email" class="validate" v-model="contactEmail" autocomplete="off">
          <label for="email">Email</label>
        </div>
      </div>

      <div class="center">
        <button class="btn waves-effect waves-light" type="submit" name="action">
          Next
          <i class="material-icons right">send</i>
        </button>
      </div>


    </form>
  </div>
</template>

<script>
import firebase from "firebase";
import db from '@/services/firebaseInit'

export default {
  name: 'Form',
  data () {
    return {
      picked: null,
      firstName: null,
      lastName: null,
      employeeID:null,
      contactEmail: null,
      uid: this.$route.params.userID
    }
  },
  mounted() {
    // console.log("the route params are", this.$route)
    console.log("In form the userID is ", this.uid)
  },
  methods: {
    updateUser: function() {
      console.log("Inside updateUser");
      var formData = {
        position: this.picked,
        firstName: this.firstName,
        lastName: this.lastName,
        employeeID: this.employeeID,
        contactEmail: this.contactEmail
      }
      console.log("The form data is ", formData);
      db.collection('users').doc(this.uid).set(formData);
      if (formData.position === "manager") {
        this.$router.push("/form/" + this.uid + "/manager")
      }
    }
  }

}
</script>


<style scoped>
</style>
