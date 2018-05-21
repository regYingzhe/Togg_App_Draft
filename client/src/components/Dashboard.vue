<template>
  <div class="dashboard">
    <h1>{{ msg }}</h1>
    <ul class="collection with-header">
      <li class="collection-header" v-for="room in sortedRooms" :key="rooms.id">
        <h6>Room#: {{room.roomNum}}</h6>
      </li>
    </ul>
  </div>
</template>

<script>
import db from "@/services/firebaseInit";
const settings = {timestampsInSnapshots: true}
db.settings(settings);
export default {
  name: 'Dashboard',
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
          'roomNum': doc.data().roomNum
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
