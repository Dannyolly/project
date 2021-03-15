<template>
    <div id="ranking">
        <div class="ranking-container">
            <div class="left">
                <h3>官方榜</h3>
                <rankingbox v-for="(item,index) in top5arr" :key="item+index">
                    <img :src="item.coverImgUrl" alt="" slot="img">
                </rankingbox>
            </div>
            <div class="right">
                <div class="ranking-list">
                   <list v-for="(item,index) in arr1" :key="item+index">
                   <span slot="index" class="1index firstthird">{{index+1}}</span>
                    <span slot="list-icon" class="list-icon">-</span>
                   <span slot="list-songname" class="list-songname">{{item.al.name}}</span>
                   <span slot="list-text" class="list-text">{{item.alia[0]}}</span>
                   </list>
                    <span class="watchall">
                      查看全部
                      <i class="fas fa-chevron-right" slot="text"></i>
                    </span>
                 </div>

                   <div class="ranking-list">
                   <list v-for="(item,index) in arr2" :key="item+index">
                   <span slot="index" class="1index firstthird">{{index+1}}</span>
                    <span slot="list-icon" class="list-icon">-</span>
                   <span slot="list-songname" class="list-songname">{{item.al.name}}</span>
                   <span slot="list-text" class="list-text">{{item.alia[0]}}</span>
                   </list>
                   <span class="watchall">
                      查看全部
                      <i class="fas fa-chevron-right" slot="text"></i>
                    </span>
                 </div>

                   <div class="ranking-list">
                   <list v-for="(item,index) in arr3" :key="item+index">
                   <span slot="index" class="1index firstthird">{{index+1}}</span>
                    <span slot="list-icon" class="list-icon">-</span>
                   <span slot="list-songname" class="list-songname">{{item.al.name}}</span>
                   <span slot="list-text" class="list-text">{{item.alia[0]}}</span>
                   </list>
                   <span class="watchall">
                      查看全部
                      <i class="fas fa-chevron-right" slot="text"></i>
                    </span>
                 </div>

                   <div class="ranking-list">
                   <list v-for="(item,index) in arr4" :key="item+index">
                   <span slot="index" class="1index firstthird">{{index+1}}</span>
                    <span slot="list-icon" class="list-icon">-</span>
                   <span slot="list-songname" class="list-songname">{{item.al.name}}</span>
                   <span slot="list-text" class="list-text">{{item.alia[0]}}</span>
                   </list>
                   <span class="watchall">
                      查看全部
                      <i class="fas fa-chevron-right" slot="text"></i>
                    </span>
                 </div>

                   <div class="ranking-list">
                   <list v-for="(item,index) in arr5" :key="item+index">
                   <span slot="index" class="1index firstthird">{{index+1}}</span>
                    <span slot="list-icon" class="list-icon">-</span>
                   <span slot="list-songname" class="list-songname">{{item.al.name}}</span>
                   <span slot="list-text" class="list-text">{{item.alia[0]}}</span>
                   </list>
                   <span class="watchall">
                      查看全部
                      <i class="fas fa-chevron-right" slot="text"></i>
                    </span>
                 </div>
            </div>

        </div>
        <!--暫不做..
        <div class="world">
            <h3>全球榜</h3>
        </div>   
        .接口太仆街了...-->
        
    </div>
</template>

<script>
import titleBoxVue from '../../titleBox.vue';
import List from './list.vue';
const axios = require("axios");
import rankingbox from './rankingbox.vue'
export default {
    name:'ranking',
    components:{
        rankingbox,
        List
    },
    data() {
        return {
            getrankingarr:[],
            top5arr:[],
            trackidsarr:[],
            ok:false,
            top5songarr:[{},{},{},{},{}],
            top5obj:{},
            top5obj1:[],
            top5obj2:[],
            top5obj3:[],
            top5obj4:[],
            //暫時先設了5個....
            arr:"",
            myindex:0,
            arr1:{},
            arr2:{},
            arr3:{},
            arr4:{},
            arr5:{},
        }
    },
    watch:{
        //第一步先得到全部歌單....
        //只取top5作官方榜...
        
        getrankingarr:function()
        {
            this.settop5arr();
            //this.top5obj=new Array();
            //console.log(this.top5obj);
            this.settop5song(0,this.top5obj,this.arr1);
            this.settop5song(1,this.top5obj1,this.arr2);
            this.settop5song(2,this.top5obj2,this.arr3);
            this.settop5song(3,this.top5obj3,this.arr4);
            this.settop5song(4,this.top5obj4,this.arr5);
            //this.settop5song(1,this.top5obj1);
            //this.settop5song(2);
            //this.settop5song(3);
            //this.settop5song(4);
        },
        arr:function()
        {
           console.log(this.arr1)
        },
        immediate:true,
        
    },
    mounted() {
        this.getarr();
    },
    methods: {
        /**
         * 前5的榜中前5首歌...1---5
         * settop5song
         * ...因為接口問題...只能從top5的前5名中的id 取出全部歌單...
         * 再找前5個放出面...
         * findallsong...
         * 這步已經是取了5個歌單..的全部歌曲...
         * 但暫時只要前5首...所以交給findallsong來剪取幾個新的arr....
         * top5songarr...暫存著....
         */
        findallsong:function()
        {
         
           
        },
        
        settop5song:async function(i,arr,list)
        {
          var that=this;
              await this.$axios.get("https://autumnfish.cn/playlist/detail?id="+that.top5arr[i].id)
              .then(res=>{
                  //console.log(res);
                  res.data.playlist.tracks.length=5;
                  //that.top5songarr[i]=res.data.playlist.tracks;
                  //console.log(that.top5songarr);
                  arr.arr=res.data.playlist.tracks;
                  //console.log(res.data.playlist.tracks);
              })
              if(that.arr1===list)
              {
               that.arr1=arr.arr
              }
              else if(that.arr2===list)
              {
                  that.arr2=arr.arr
              }
              else if(that.arr3===list)
              {
                  that.arr3=arr.arr
              }
              else if(that.arr4===list)
              {
                  that.arr4=arr.arr
              }
              else if(that.arr5===list)
              {
                  that.arr5=arr.arr;
              }
              //console.log(that.trackidsarr[0])
        },
        /**
         * settop5arr()
         * 設前5的數組....
         */
        settop5arr:function() 
        {
            //console.log(this.getrankingarr);
            this.top5arr=this.getrankingarr;
            this.top5arr.length=5;
           //console.log(this.top5arr);
        },
        //經典操作....
        getarr:async function()
        {
           var that=this;
           await this.$axios.get("https://autumnfish.cn/toplist")
           .then((result) => {
              that.getrankingarr=result.data.list;
              //console.log(that.getrankingarr)
           }).catch((err) => {
               
           });
           //console.log(that.getrankingarr);
        }
    },
}
</script>

<style>
    #ranking
    {
        width: 789px;
        padding-left: 30px;
        height: 482px;
        overflow: scroll;
        position: relative;
    }
    #ranking h3
    {
        margin:15px 0px;
    }
    .ranking-container
    {
        height: 255%;
    }
    .ranking-container .left
    {
      width: 170px;
      height: 100%;
      float: left;
      margin-right: 40px;
    }
    .ranking-container .right
    {
      width: 500px;
      height: 100%;
      float: left;
      padding-top: 53px;
    }
    .world
    {
       width: 779px;
       height: 500px;
       position: relative;
    }
    .world h3
    {
        position: absolute;
    }
</style>