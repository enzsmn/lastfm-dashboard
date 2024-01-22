import "./style/style.scss";
import Vue from "vue";
import App from "./App.vue";
import axios from "axios";

Vue.config.productionTip = false;

axios.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  function(error) {
    // Any status code that lie out of the range of 2xx cause this function to trigger
    alert("Something went wrong");
    return Promise.reject(error);
  }
);

new Vue({
  render: h => h(App)
}).$mount("#app");
