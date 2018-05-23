<template>
  <div id="view-room">
    <ul class="collection with-header">
      <li class="collection-header"><h4>Room#: {{roomNum}}</h4></li>
      <li class="collection-item">Caretaker: {{careTaker}}</li>
      <li class="collection-item">Resident: {{resident}}</li>
    </ul>
    <router-link to="/dashboard" class="btn grey">Back</router-link>
    <router-link :to="{name: 'edit-room', params: {room_id: roomNum}}" class="btn grey">
      Edit
    </router-link>
    <div class="fixed-action-btn">

    </div>
  </div>
</template>

<script>
  import db from '@/services/firebaseInit'
  export default {
    name: 'view-room',
    data () {
      return {
        roomNum: null,
        careTaker: null,
        resident: null
      }
    },
    beforeRouteEnter (to, from, next) {
      db.collection('room').where('roomNum', '==', to.params.room_id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          next(vm => {
            vm.roomNum = doc.data().roomNum,
            vm.careTaker = doc.data().careTaker,
            vm.resident = doc.data().resident
          })
        })
      })
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        console.log("Inside fetchdata", this.$route.params)
        db.collection('room').where('roomNum', '==', this.$route.params.room_id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.roomNum = doc.data().roomNum,
            this.careTaker = doc.data().careTaker,
            this.resident = doc.data().resident
          })
        })
      },
    }
  }
</script>
