<template>
    <div class="newmusic-update">
          <anytype @receivestr="receive">
                 <div slot="function" class="function">
                    <div class="relative-container">
                          <div @click="new2change(1,'new')" 
                          class="new-recommand"
                          :class="{active1:typenum===1}"
                          >推薦</div>
                          <div class="myline"></div>

                          <div @click="new2change(2,'hot')" 
                          class="new-forall"
                          :class="{active1:typenum===2}"
                          >全部</div>
                    </div>
                 </div>
            </anytype>

            <!--allmoviebox-->
            <div class="allmoviebox">
            <div v-if="type=='ALL'&&choose=='new'">
                <div class="left-text">本周新碟</div>
                <img-box id="my-imgbox" v-for="(item,index) in weekarr" :key="item+index" >
                 <img slot="img" :src="item.blurPicUrl" alt="">
                 <span slot="text" class="recommend-text">{{item.name}}</span>
                 <div slot="play" class="recommend-box-play">
                         <i class="fas fa-play"></i>
                 </div>
                 <div slot="user" class="new2-user">{{item.artists[0].name}}</div>
                 </img-box>
             </div>
             <div v-if="type!='ALL'">
                  <div class="left-text1"><img src="./date.png" alt=""></div>
                <img-box id="my-imgbox" 
                v-for="(item,index) in montharr" :key="item+index" >
                 <img slot="img" :src="item.blurPicUrl" alt="">
                 <span slot="text" class="recommend-text">{{item.name}}</span>
                 <div slot="play" class="recommend-box-play">
                         <i class="fas fa-play"></i>
                 </div>
                 <div slot="user" class="new2-user">{{item.artists[0].name}}</div>
                 </img-box>
             </div>
            </div>

    </div>
</template>

<script>
import axios from 'axios';
import ImgBox from '../../../ImgBox.vue';
import Anytype from '../anytype.vue';
import cut from '../../../publicfunction/function'
export default {
    name:'new2',
    data() {
        return {
            typearr:['全部','华语','欧美','韩国','日本'],
            typecontent:['ALL','ZH','EA','KR','JP'],
            type:'ALL',
            newsong:{},
            url:'',
            typenum:1,
            choose:'new',
            choosearr:['new','hot'],
            weekarr:[],
            montharr:[],
        }
    },
    watch:{
       weekarr:function()
       {
           //console.log(this.weekarr);
           this.cutdown();
           //先控制了40以內..
           /**
            * pic .blurPicUrl
            * name .name
            * ar-name .artists[0].name
            */
       },
       choose:function()
       {
           this.getnewsong1();
           console.log('choose');
       },
       type:function()
       {
            this.getnewsong1();
            console.log('type');
       }
    },
    mounted() {
        this.getnewsong();
    },
    methods: 
    {
             receive:function(str)
            {
           //console.log('receive');
           //console.log(str);
           //順便改下當時的tpye
           for(var i=0;i<this.typearr.length;i++)
           {
               if(str==this.typearr[i])
               {
                   this.type=this.typecontent[i];
                   break;
               }
           }
          },
          /**
           * 推薦 & 全部...
           * new2change()
           */
          new2change:function(index,str)
          {
            this.typenum=index;
            for(var i=0;i<2;i++)
            {
                if(str==this.choosearr[i])
                {
                    this.choose=this.choosearr[i];
                }
            }
          },
           /**
         * getnewsong()
         */
        getnewsong: function()
        {
              var that=this;
          this.$axios.get("https://autumnfish.cn/top/album?type="+that.type)
              .then(res=>{
                  //console.log(res.data);
                  that.newsong=res.data;
                  that.weekarr=res.data.weekData;
                  //that.montharr=res.data.monthData;
                  /**先控制在50以內... */
                  that.weekarr.length=12;
                  //that.montharr.length=50;

              })
        },
        getnewsong1: function()
        {
             var that=this;
             console.log("https://autumnfish.cn/top/album?type="+that.choose+'&area='+that.type);
            this.$axios.get("https://autumnfish.cn/top/album?type="+that.choose+'&area='+that.type)
              .then(res=>{
                  console.log(res.data);
                  that.newsong=res.data;
                  //that.weekarr=res.data.weekData;
                  that.montharr=res.data.monthData;
                  /**先控制在50以內... */
                  //that.weekarr.length=50;
                  that.montharr.length=12;

              })
        },
        /**
         * cutdonw()
         */
        cutdown:function()
        {
            for(var i=0;i<this.weekarr.length;i++)
            {
                if(this.weekarr[i].name.length>35)
                {
                    this.weekarr[i].name=cut(this.weekarr[i].name.length-30,this.weekarr[i].name);
                }
            }
        }
    },
    components:{
        Anytype,
        ImgBox,
    }
   
}
</script>

<style>
    .new-recommand
    {
      position: absolute;
      left: 170px;
      font-size: 12.5px;
      color: #676767;
      width: 35px;
      height: 20px;
      border-radius: 8px;
      text-align: center;
      line-height: 20px;
      cursor: pointer;
    }
    .new-forall
    {
          position: absolute;
          font-size: 12.5px;
          left: 230px;
          color: #676767;
           color: #676767;
          width: 35px;
          height: 20px;
          border-radius: 8px;
         text-align: center;
         line-height: 20px;
         cursor: pointer;
    }
    .myline
    {
        position:absolute;
        left: 220px;
        top: 5px;
        width: 1px;
        height: 20px;
        background-color: #F2F2F2;
    }
    .new-recommand:hover
    {
        color: #373737;
    }
    .new-forall:hover
    {
        color: #373737;
    }
    .active1
    {
    background-color: #FDEDED;
    color: #EC4141;
    }
    .active1:hover
    {
        color: #EC4141;
    }
    .allmoviebox
    {
        position: relative;
        width: 739px;
        padding-left: 50px;
        height: 360px;
    }
    .new2-user
    {
        padding-left: 5px;
        font-size: 12px;
        color: #9F9F9F;
    }
    #my-imgbox
    {
        margin-right: 40px;
    }
    .left-text
    {
        position: absolute;
        left: 10px;
        top: 0px;
        width: 20px;
        font-size: 16px;
    }
    .left-text1
    {
        position:absolute;
        left: -10px;
        
    }
    .left-text1 img
    {
        width: 90%;
    }
</style>