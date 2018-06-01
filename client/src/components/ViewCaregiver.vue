<template>
  <div id="view-employee">
    <ul class="collection with-header">
      <li class="collection-header"><h4>Caregiver</h4></li>
      <li class="collection-item">Employee ID#: {{employee_id}}</li>
      <li class="collection-item">First Name: {{first_name}}</li>
      <li class="collection-item">Last Name: {{last_name}}</li>
    </ul>
    <router-link to="/caregivers" class="btn grey">Back</router-link>
    <button @click="deleteEmployee" class="btn red">Delete</button>

    <div class="fixed-action-btn">
      <router-link v-bind:to="{ name: 'edit-caregiver', params: { employee_id: employee_id }}" class="btn-floating btn-large red">
        <i class="material-icons">edit</i>
      </router-link>
    </div>
  </div>
</template>

<script>
  import db from '@/services/firebaseInit'
  export default {
    name: 'view-caregiver',
    data () {
      return {
        employee_id: null,
        first_name: null,
        last_name: null
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
        db.collection('caregivers').where('employee_id', '==', this.$route.params.employee_id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.employee_id = doc.data().employee_id
            this.first_name = doc.data().first_name
            this.last_name = doc.data().last_name
          })
        })
      },
      deleteEmployee () {
        if(confirm ('Are you sure?')) {
          db.collection('caregivers').where('employee_id', '==', this.$route.params.employee_id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete();
              this.$router.push('/caregivers')
            })
          })
        }
      }
    }
  }
</script>
