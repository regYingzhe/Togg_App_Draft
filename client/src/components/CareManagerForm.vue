<template>
  <div class="row" style="margin:40px">
    <form class="col s12" autocomplete="off" @submit.prevent="updateFacility">
      <div class="row">
        <div class="input-field col s6">
          <input id="facility_name" type="text" name="facility_name" v-model="facilityName" class="validate">
          <label for="facility_name">Facility name</label>
        </div>

        <div class="input-field col s6">
          <input id="total_rooms" type="text" name="total_rooms" v-model="totalName" class="validate">
          <label for="total_rooms">Total Rooms</label>
        </div>
      </div>

      <div class="row">
        <div class="input-field col s12">
          <input id="facility_address" type="text" name="facility_address" v-model="facilityAddress" class="validate">
          <label for="facility_address">Facility Address</label>
        </div>
      </div>

      <div class="row">
        <div class="input-field col s12">
          <input id="total_caregiver" type="text" name="total_caregiver" v-model="caregiverNum" class="validate">
          <label for="total_caregiver">Total Employeed Caregiver</label>
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
  name: 'CareManagerForm',
  data () {
    return {
      uid: this.$route.params.uid,
      caregiverNum: null,
      facilityAddress: null,
      totalName: null,
      facilityName: null
    }
  },
  mounted() {
    // console.log("the route params are", this.$route)
    // console.log("In form the userID is ", this.$route)
  },
  methods: {
    updateFacility: function() {
      console.log("inside updateFacility")
      var facilityData = {
        caregiverNum: this.caregiverNum,
        facilityAddress: this.facilityAddress,
        totalName: this.totalName,
        facilityName: this.facilityName
      }
      db.collection("facilities").doc(this.uid).set(facilityData);
    }

  }

}
</script>


<style scoped>
</style>
