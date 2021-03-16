<template>
    <div id="singer">
        <listbox v-for="(item,index) in singerarr" :key="index">
            <img @click="getinfo" slot="img" :src="item.img1v1Url" alt="">
            <div slot="name" class="listbox-text">
                <span>{{item.name}}</span>
                <span>({{item.alias[0]}})</span>
            </div>
        </listbox>
        
    </div>
</template>

<script>
import Listbox from './listbox.vue'
const axios = require("axios");
export default {
    name:'singer',
      //      歌手(obj) 專輯(obj) str(別名) 歌列單(array)
     //      當前li(number)  搜索的關鍵字..
  props: ["artist", "album", "str", "allList", "thisIndex","searchstr"],
  components:{
    Listbox,

     
  },
  data() {
      return {
          singerarr:[],
          singerCount:0
      }
  },
  watch:{
     singerarr:function()
     {
         this.saveCount();
     }
  },
  mounted() {
       this.getinfo();
       this.saveCount();
  },
  methods: {
      getinfo:function()
      {
        var that=this
        this.$axios.get('http://localhost:3000/cloudsearch?keywords='+that.searchstr+"&type=100")
        .then((result) => { 
           that.singerarr=result.data.result.artists;
           that.singerCount=result.data.result.artistCount;
           console.log(that.singerCount);
        }).catch((err) => {
            
        });

      },
      saveCount:function()
      {
          //console.log(this.singerCount);
          this.$emit('receiveCount',this.singerCount+'位歌手')
          //console.log(this.singerCount+'位歌手');
      }
  },
}
</script>

<style>
      #singer{
         width: 799px;
         height: 83px;
         position: relative;
      }
</style>