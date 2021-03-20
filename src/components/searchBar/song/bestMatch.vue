<template>
    <div id="best-match">
         <div class="best-match">
            <h5 class="best-match-title">
                最佳匹配
            </h5>
            <!--組件bestbox....盒子...-->
             <best-box >
                 <img @click="gotosingerpage" slot="img" :src="artist.img1v1Url" alt="">
              <span slot="best-box-information" class="best-box-information">
                 歌手: {{artist.name}}
                 <!--  {{artist.occupation+":"}} {{artist.name}}  -->
                 <!--v-if是為廢事報錯....又是因為異步操作...
                 http://www.cnblogs.com/xxm980617/p/10849941.html
                 .所導致第一次查的時候為空?-->
                <span v-if="artist.alias">{{'('+artist.alias[0] +')'}}</span>
             </span>
             <div slot="contries" class="best-box-right">
                 <i class="fas fa-chevron-right"></i>
             </div>
             </best-box>
             <!--上為歌手....下為作品-->
             <best-box v-if="album.type">
                 <img  slot="img" :src="album.picUrl" alt="">
              <span slot="best-box-information" class="best-box-information">
                 {{album.type+":"}} {{album.name}}
                <span >{{'('+str+')'}}</span>
             </span>
             <div slot="contries" class="best-box-right">
                 <i class="fas fa-chevron-right"></i>
             </div>
             </best-box>
         </div>
    </div>
</template>

<script>
import bestBox from '../bestBox'
export default {
    name:'bestMatch',
    props:['artist','album','str'],
    data() {
        return {
            
        }
    },
    components:{
         bestBox,
    },
    methods: {
        /**------------------------------------------------------------- */
        /**
         * gotosingerpage...
         * 直接發對象....
         */
        gotosingerpage:function()
        {
          this.$router.push({path:'/home/singerpage',query:{singerobj:this.artist}});
        },
    },
}
</script>

<style>


</style>

