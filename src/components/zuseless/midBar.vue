<template>
    <div id="midBar">
        <mid-left-bar>
        </mid-left-bar>
        <mid-right-bar>
        </mid-right-bar>
    </div>
</template>

<script>
/**
 * 暫不用...............
 * 
 * 
 */
import midLeftBar from '../midleftbar/midLeftBar.vue';
import midRightBar from '../midRightBar.vue';
const axios = require("axios");
export default {
    name:'midBar',
    components:{
        midLeftBar,
        midRightBar

    }

}
</script>

<style>
   #midBar
   {
       width: 1020px;
       height: 600px;
  
       margin: 0px auto;
       background-color: #FFFFFF;
       box-shadow:15px 0 15px -15px rgba(0, 0, 0, 0.3),
                   -15px 0 15px -15px rgba(0, 0, 0, 0.3);

   }
</style>