<template>
  <div id="new-employee">
    <h3>New Caregiver</h3>
    <div class="row">
    <form @submit.prevent="saveEmployee" class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="employee_id" required>
          <label>Employee ID#</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="first_name" required>
          <label>First Name</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="last_name" required>
          <label>Last Name</label>
        </div>
      </div>

      <button type="submit" class="btn">Submit</button>
      <router-link to="/caregivers" class="btn grey">Cancel</router-link>
    </form>
  </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from '@/services/firebaseInit'
export default {
  name: 'new-employee',
  data () {
    return {
      employee_id: null,
      first_name: null,
      last_name: null,
    }
  },
  methods: {
    saveEmployee () {
      db.collection('caregivers').add({
        employee_id: this.employee_id,
        first_name: this.first_name,
        last_name: this.last_name,
      })
      .then(docRef => {
        console.log('Client added: ', docRef.id)
        this.$router.push('/caregivers')
      })
      .catch(error => {
        console.error('Error adding employee: ', error)
      })
    }
  }
}
</script>
