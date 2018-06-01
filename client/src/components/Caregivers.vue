<template lang="html">
  <div class="">
    <h3>There are Total {{caregivers}} caregivers. Please Enter their Info</h3>
    <ul class="collection with-header">
      <li class="collection-header"><h4>Caregivers</h4></li>
      <li v-for="(employee, index) in employees" v-bind:key="employee.id" class="collection-item">
        <div class="chip">{{index + 1}}</div>
        {{employee.employee_id}}: {{employee.first_name}} {{employee.last_name}}
         <router-link class="secondary-content" v-bind:to="{ name: 'view-caregiver', params: { employee_id: employee.employee_id }}">
           <i class="material-icons">send</i>
         </router-link>
      </li>
    </ul>
    <div class="fixed-action-btn">
      <router-link to="/new-caregiver" class="btn-floating btn-large red">
        <i class="material-icons">add</i>
      </router-link>
    </div>

  </div>

</template>

<script>
import db from '@/services/firebaseInit'
import firebase from 'firebase';
export default {
  data() {
    return {
      employees: [],
      caregivers: 5
    }
  },
  mounted() {

  },
  created() {
    db.collection('caregivers').orderBy('employee_id').get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = {
          'first_name': doc.data().first_name,
          'last_name': doc.data().last_name,
          'employee_id': doc.data().employee_id,
          'id': doc.id
        }
        this.employees.push(data);
      })
    })
    .catch(()=> {
      console.log("not exist")
    })

  }
}
</script>

<style lang="css">
</style>
