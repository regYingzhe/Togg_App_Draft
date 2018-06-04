<template>
  <div class="rooms-dashboard">
    <h1>{{ msg }}</h1>
    <ul class="collection">
      <li class="collection-item avatar" v-for="room in paginatedData" :key="room.id">
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
    <a class="waves-effect waves-light btn"
       :disabled="pageNumber === 0"
       @click="prevPage">Previous</a>
    <a class="waves-effect waves-light btn"
        :disabled="pageNumber >= pageCount - 1"
        @click="nextPage">Next</a>
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
      rooms: [],
      pageNumber: 0
    }
  },
  props: {
    listData: {
      type: Array,
      required: true
    },
    size: {
      type: Number,
      required: false,
      default: 2
    }
  },
  methods: {
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
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
    },
    pageCount() {
      let l = this.rooms.length;
      let s = this.size;
      return Math.floor(l/s);
    },
    paginatedData() {
      console.log("inside paginatedData")
      const start = this.pageNumber * this.size;
      const end = start + this.size;
      return this.rooms.slice(start, end);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
