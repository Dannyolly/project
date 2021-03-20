<template>
  <div id="app">
    
    <router-view></router-view>
  </div>
</template>


<script>
/**
 * 首頁按鈕都在topbar....
 * 
 * 
 */
import MidBar from './components/zuseless/midBar.vue';
import topBar from './components/topBar'
const axios = require("axios");
//輪播圖的請求...

export default {
  name: "App",
  components:{
    //banner---輪播圖封裝好了
    
  },
  methods: {
  
  },
  mounted() {
    //this.try();
  },
}
</script>

<style>

</style>


