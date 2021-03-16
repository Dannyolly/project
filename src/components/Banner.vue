
<template>
   <div>
    <div id="banner" @click="getBannerMusic">
        <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item  v-for="(url,index) in imgArr" :key="url.imageUrl+index">
        <el-image
          style="width: 375px; height: 200px"
          fit="cover"
          :src="url.imageUrl"
        ></el-image>
      </el-carousel-item>
    </el-carousel>
    </div>
   </div>
</template>
<script>
/**
 * 輪播圖....封裝....
 */
const axios = require("axios");
export default {
  name: 'banner',
  data() {
    return {

      imgArr: [],
    };
  },
  mounted() {
    this.getPic();
  },
  methods: {
        getPic:function()
        {
          var that=this;
          this.$axios.get("http://localhost:3000/banner?type=0")
          .then((result) => {
            //console.log(result);
            that.imgArr=result.data.banners;
            //console.log(that.imgArr)
          }).catch((err) => {
            
          });
        },
        getBannerMusic:function()
        {
            this.$axios.get("http://localhost:3000//song/url?id=1823305772")
            .then((result) => {
              console.log(result);
            }).catch((err) => {
              
            });
        }
     },
}
</script>

<style>
.el-carousel__item {
  border-radius: 10px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel__item img 
{

}

#banner {
  height: 200px;
  width: 750px;
}
</style>

