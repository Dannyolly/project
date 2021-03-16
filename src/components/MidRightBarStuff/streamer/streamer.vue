<template>
    <div id="midright-streamer">
        <stream-banner  :streamerarr="streamerarr">

        </stream-banner>
    </div>
</template>

<script>
import Banner from '../../Banner.vue'
import StreamBanner from './streamBanner.vue';
const axios = require("axios");
export default {
    name:'streamer',
    components:{
        Banner,
        StreamBanner
    },
    data() {
        return {
            streamerarr:[],
            
        }
    },
    mounted() {
        this.getstreamer();
    },
    methods: {
        getstreamer:function()
        {
            var that=this;
            this.$axios.get("http://localhost:3000/dj/banner")
            .then((result) => {
              console.log(result.data.data);  
              this.streamerarr=result.data.data;
            }).catch((err) => {
                
            });
        }
    },
}
</script>

<style>
      #midright-streamer
      {
          width: 779px;
          height: auto;
          padding-left: 20px;
      }
</style>