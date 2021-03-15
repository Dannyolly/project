
<template>
   <div>
    <div id="banner" @click="getBannerMusic">
        <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item  v-for="(url) in urls" :key="url">
        <el-image
          style="width: 375px; height: 200px"
          fit="cover"
          :src="url"
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
      urls: [
        "http://p1.music.126.net/-1TJHA34lGCWxr7M2NrYow==/109951165774366292.jpg",
        "http://p1.music.126.net/X3Bsjz54eU6rRHbcQojzRg==/109951165773456947.jpg",
        "http://p1.music.126.net/tMOKd3kvmGbHr2zRVdixhA==/109951165774357920.jpg",
        "http://p1.music.126.net/Bi2mTg7ZmpHIPVHx0qMuxw==/109951165773471774.jpg",
        "http://p1.music.126.net/LYeknP-ERyv7Q7o108KSpQ==/109951165774310206.jpg",
        "http://p1.music.126.net/xVhPqGQpU4BB4t-FKhi7MA==/109951165773526196.jpg",
        "http://p1.music.126.net/F3hm_odk92T9pnLL8FAJqA==/109951165774425112.jpg",
        "http://p1.music.126.net/FGxHpgm5aIPPoC9SyiBwPg==/109951165773531409.jpg",
        "http://p1.music.126.net/RlyewvCBhGn9wzN01E1AYA==/109951165774431016.jpg",
        "http://p1.music.126.net/aXR1SHRoY-FoAeLG3w4-GQ==/109951165774378059.jpg",
      ],

      imgArr: [],
    };
  },
  methods: {
        getPic:function()
        {
          this.$axios.get("https://autumnfish.cn/banner?type=0")
          .then((result) => {
            console.log(result);
          }).catch((err) => {
            
          });
        },
        getBannerMusic:function()
        {
            this.$axios.get("https://autumnfish.cn//song/url?id=1823305772")
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

