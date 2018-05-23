<template>
  <div id="edit-room">
    <h3>Edit Room</h3>
    <div class="row">
    <form @submit.prevent="updateRoom" class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input id="Room#"  type="text" v-model="roomNum" required>
          <label class="active" for="Room#">Room#</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="careTaker" class="validate" type="text" v-model="careTaker" required>
          <label class="active" for="careTaker">CareTaker Name</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="resident" class="validate" type="text" v-model="resident" required>
          <label class="active" for="resident">Resident Name</label>
        </div>
      </div>
      <button type="submit" class="btn">Submit</button>
      <router-link to="/dashboard" class="btn grey">Cancel</router-link>
    </form>
  </div>
  </div>
</template>

<script>
  import db from '@/services/firebaseInit'
  export default {
    name: 'edit-room',
    data () {
      return {
        roomNum: null,
        careTaker: null,
        resident: null,
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
        db.collection('room').where('roomNum', '==', this.$route.params.room_id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.roomNum = doc.data().roomNum,
            this.careTaker = doc.data().careTaker,
            this.resident = doc.data().resident
          })
        })
      },
      updateRoom () {
        db.collection('room').where('roomNum', '==', this.$route.params.room_id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update({
              roomNum: this.roomNum,
              careTaker: this.careTaker,
              resident: this.resident,
            })
            .then(() => {
              this.$router.push({ name: 'view-room', params: { room_id: this.roomNum }})
            });
          })
        })
      }
    }
  }
</script>
