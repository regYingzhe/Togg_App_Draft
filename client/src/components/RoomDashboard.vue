<template>
  <div class="rooms-dashboard">
    <h1>{{ msg }}</h1>
    <ul class="collection">
      <li class="collection-item avatar" v-for="room in sortedRooms" :key="room.id">
        <i class="material-icons circle">domain</i>
        <span>Room#: {{room.roomNum}}</span>
        <p>careTaker: {{room.careTaker}}<br>
          resident: {{room.resident}}
        </p>
        <a class="secondary-content">
          <router-link :to="{ name: 'view-room', params: {room_id: room.roomNum} }">
            <i class="material-icons">send</i>
          </router-link>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import db from "@/services/firebaseInit";
const settings = {timestampsInSnapshots: true}
db.settings(settings);
export default {
  name: 'roomDashboard',
  data () {
    return {
      msg: 'Welcome to WonderLand Center',
      rooms: []
    }
  },
  created() {
    db.collection('room').get().then
    (querySnapshot => {
      querySnapshot.forEach(doc => {
        const room = {
          'id': doc.id,
          'roomNum': doc.data().roomNum,
          'careTaker': doc.data().careTaker,
          'resident': doc.data().resident
        }
        this.rooms.push(room);
      })
    })
    console.log("rooms data are ", this.rooms);
    // this.sortedRooms();
  },
  computed: {
    sortedRooms: function() {
      return this.rooms.sort(function(room1, room2) {
        return parseInt(room1.roomNum) - parseInt(room2.roomNum)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
