// import Api from "@/services/Api"
import axios from "axios"

// export default () => {
//   return axios.create({baseURL: "http://localhost:9090"});
// }

// export default {
//   register(credentials) {
//     return Api().post('register', credentials)
//   }
// }

export default {
  register(credentials) {
    return axios.create({baseURL: "http://localhost:9090"}).post("register", credentials);
  }
}
