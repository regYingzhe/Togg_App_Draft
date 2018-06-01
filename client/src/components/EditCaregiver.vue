<template>
  <div id="new-employee">
    <h3>Edit Employee</h3>
    <div class="row">
      <form @submit.prevent="updateEmployee" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input id="employee_id" type="text" v-model="employee_id" required>
            <label class="active" for="employee_id">Employee ID</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="first_name" type="text" v-model="first_name" required>
            <label class="active" for="first_name">first_name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="last_name" type="text" v-model="last_name" required>
            <label class="active" for="last_name">last_name</label>
          </div>
        </div>
        <button type="submit" class="btn">Submit</button>
        <router-link to="/caregivers" class="btn grey">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
  import db from '@/services/firebaseInit'
  export default {
    name: 'edit-employee',
    data () {
      return {
        employee_id: null,
        last_name: null,
        first_name: null,
      }
    },
    beforeRouteEnter (to, from, next) {
      db.collection('caregivers').where('employee_id', '==', to.params.employee_id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          next(vm => {
            vm.employee_id = doc.data().employee_id
            vm.first_name = doc.data().first_name
            vm.last_name = doc.data().last_name
          })
        })
      })
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        db.collection('employees').where('employee_id', '==', this.$route.params.employee_id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.employee_id = doc.data().employee_id
            this.first_name = doc.data().first_name
            this.last_name = doc.data().last_name
          })
        })
      },
      updateEmployee () {
        db.collection('caregivers').where('employee_id', '==', this.$route.params.employee_id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update({
              employee_id: this.employee_id,
              first_name: this.first_name,
              last_name: this.last_name,
            })
            .then(() => {
              this.$router.push({ name: 'view-caregiver', params: { employee_id: this.employee_id }})
            });
          })
        })
      }
    }
  }
</script>
