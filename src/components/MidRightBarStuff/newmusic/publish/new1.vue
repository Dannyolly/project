<template>
    <div class="newmusic-publish">

        <div class="new1-top-container">

            <anytype @receivestr="receive">
                 <div slot="function" class="function">
                    <div class="relative-container">
                          <div @click="getallsong" class="playall">
                            <i class="far fa-play-circle"></i>
                             <span>播放全部</span>
                          </div>
                          <div class="collectall">
                              <i class="far fa-folder"></i>
                              <span>收藏全部</span>
                          </div>

                    </div>
                 </div>
            </anytype>
           
             <div class="new1-song-box">
               <listbox v-for="(item,index) in newsongarr" 
               :key="item+index"
               :width="789">
                   <div  slot="index" class="index">{{index<9? '0'+(index+1):index+1}}</div>
                   <img  slot="img" :src="item.album.blurPicUrl" alt="">
                   <div @click="sendurl(index)" slot="icon" class="icon-play">
                       <i class="fas fa-play"></i>
                   </div>
                   <div slot="name" class="listbox-text">
                      <span>{{item.name}}</span>
                   </div>
                  <span slot="cname">{{item.artists[0].name}}</span>
                  <span slot="ename">{{item.album.name}}</span>
              
               </listbox>

             </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Listbox from '../../../searchBar/singer/listbox.vue';
import Anytype from '../anytype.vue'
export default {
    name:'new1',
    components:{
        Anytype,
        Listbox
        
    },
    data() {
        return {
            typearr:['全部','华语','欧美','韩国','日本'],
            typecontent:[0,7,96,16,8],
            //默認值為tpye=0....
            type:0,
            newsongarr:[],
            url:'',
        }
    },
    watch:{
        url:function()
        {
            //console.log(this.url);
            //this.$emit('getSongUrl',this.url);
        },
        type:function()
        {
            this.getsong();
        }
    },
    mounted() {
        this.getsong();
    },
    methods: {
           sendurl:function(index)
          {
              //console.log(url);
              var that=this;
              console.log(this.newsongarr[index]);
              this.$emit('getonesong',this.newsongarr[index]);
              /* 
              this.$axios.get("http://localhost:3000/song/url?id="+url)
              .then(res=>{
                  //console.log(res);
                  that.url=res.data.data[0].url;
              })
              */
          },
          getallsong:function()
          {
              this.$emit('getallsong',this.newsongarr,this.newsongarr.length);
          },
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
         * 請求新歌速递
         * getsong()
         */
        getsong:function()
        {
            var that=this;
            this.$axios.get("http://localhost:3000/top/song?type="+that.type)
            .then(res=>{
               
                that.newsongarr=res.data.data;
                that.newsongarr.length=10;
                 console.log(res.data.data);
                /**
                 * pic----.album.bluePicUrl
                 * name----.name
                 * artistname---.artists[0].name
                 * albumname----.album.name
                 */
            })
        }
    },
}
</script>

<style>
     .newmusic-publish
     {
         width: 100%;
         height: 400px;
         position: relative;
     }
     .new1-top-container
     {
         width: 100%;
         height: 40px;
         position: relative;
         padding-top: 40px;
     }
     .relative-container
     {
         position: relative;
         width: 250px;
         padding-left: 70px;
         height: 40px;
         padding-top: 6.5px;
     }
     .relative-container .playall
     {
         width: 100px;
         height: 25px;
         border-radius: 20px;
         background-color: #EC4141;
         margin-right: 5px;
         float: left;
         position: relative;
         color: #FFFFFF;
     }
     .relative-container .playall:hover
     {
         background-color: #D73535;
     }
     .relative-container .playall i
     {
          line-height: 25px;
          position: absolute;
          left: 10px;
          top:1px;
          font-size: 14px;
     }
     .relative-container .playall i:hover
     {
        color: #FFFFFF;
     }
     .playall span
     {
         font-size: 13px;
         line-height: 25px;
          position: absolute;
          left: 23px;
          top: 2px;
          color: #FFFFFF;
     }
     .collectall
     {
         width: 100px;
         height: 25px;
         border-radius: 20px;
         float: left;
          border:1px solid #D8D8D8;
          position: relative;
     }
     .collectall i 
     {
          line-height: 25px;
          position: absolute;
          left: 10px;
          top:1px;
          font-size: 14px;
     }
     .collectall span
     {
         font-size: 13px;
         line-height: 25px;
          position: absolute;
          left: 23px;
          top: 2px;
          color: #373737;
     }
     .collectall:hover
     {
         background-color: #F2F2F2;
     }
     .new1-song-box
     {
         width: 100%;
         height: 360px;
          overflow: scroll;
     }
     .new1-song-box .icon-play
     {
         position: absolute;
         left: 50px;
         top:  30px;
         width: 25px;
         height: 25px;
         border-radius: 20px;
         background-color: #EFEFEF;
         cursor: pointer;
     }
     .icon-play i
     {
         font-size: 12px;
         position: absolute;
         left: 8px;
         top: 6px;
         color: #EC4141;
     }
</style>