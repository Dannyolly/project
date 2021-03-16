<template>
    <div id="searchtag">
        <div class="searchtag-container">
             <div class="button"   @click="showTheTagBox">
               {{thetag}}
              <i class="fas fa-chevron-right"></i>
              </div>
            <!--暫不用這麼多子組件...因為要傳兩次咁樣的話....-->
               <div class="showtag-container">
                <showtag  v-for="(item,index) in showtagarr" 
                          :class="{isActive:thisIndex===index}"
      
                          :key="item">
                    <span  @click="clickthetag(index)" slot="tag">{{item}}</span>
                </showtag>
               </div>
           </div>
          <div class="taglist-container">
                <taglist :languagearr="languagearr"
                         :stylearr="stylearr"
                         :viewarr="viewarr"
                         :feelarr="feelarr"
                         :topicalarr="topicalarr"
                          v-show="isShowTag"
                          @collect="changetag"
                 ></taglist>
            </div>
    </div>
</template>

<script>
import axios from 'axios';
import showtag from './showtag'
import Taglist from './taglist';

export default {
    name:'searchTag',
    data() {
        return {
            thetag:'全部歌單',
            tagarr:[],   //全部tag的數組
            //下列分幾種tag數組...
            languagearr:[],
            stylearr:[],
            viewarr:[],
            feelarr:[],
            topicalarr:[],
            showtagarr:['流行','摇滚','民谣','另类','轻音乐','综艺','ACG'],
            categoriesarr:["语种","风格","场景","情感","主题"],
            isShowTag:false,
            thisIndex:0,
        }
    },
    components:{
        showtag,
        Taglist,

        
    },
    watch:{
      tagarr:function()
      {
          this.setalltag();
      },
      thetag:function()
      {
         this.send();
      }
    },
    mounted() {
        this.getAllTag();
    },
    methods: {
        /**
         * 再從這個組件send去上面....fk
         */
        send:function()
        {
         this.$emit('receivetag',this.thetag);
        },
        //.......changetag()
        /**
         * 子組件showtag傳過來的tag...
         * 再改自身的thetag..
         */
        changetag:function(name)
        {
          //console.log('receive');
          //console.log(name);
          this.thetag=name;
        },
        //clickthetag...
        /**
         * 1.改thisindex
         * 2.改thetag...
         */
        clickthetag:function(index)
        {
           this.thisIndex=index;
           console.log(this.showtagarr[index]);
           this.thetag=this.showtagarr[index];
           //the
        },
        //改isShowTag
        showTheTagBox:function()
        {
           //console.log(this.isShowTag);
           if(this.isShowTag)
           {
               this.isShowTag=false
           }
           else this.isShowTag=true
        },
        //setalltagarr
        //分類.....
        setalltag:function()
        {
          for(var i=0;i<this.tagarr.length;i++)
          {
             switch(this.tagarr[i].category)
             {
                 case 0:this.languagearr.push(this.tagarr[i]);break;
                 case 1:this.stylearr.push(this.tagarr[i]);break;
                 case 2:this.viewarr.push(this.tagarr[i]);break;
                 case 3:this.feelarr.push(this.tagarr[i]);break;
                 case 4:this.topicalarr.push(this.tagarr[i]);break;
                 default:break;
             }
          }
          //console.log(this.languagearr);
          //console.log(this.stylearr);
          //console.log(this.viewarr);
          //console.log(this.feelarr);
          //console.log(this.topicalarr)
         
        },
        //獲取全部的tag
        getAllTag:function()
        {
           var that=this;
           this.$axios.get("http://localhost:3000/playlist/catlist")
           .then((res)=>{
               //console.log(res.data);
               that.tagarr=res.data.sub
           })
        },
    },
}
</script>

<style>
    #searchtag
    {
       width: 799px;
       height: 50px;
       padding-left: 20px;
       position: relative;
    }
    .searchtag-container
    {
        width: 779px;
        height: 40px;
        
    }
    .searchtag-container .button
    {
        width: 110px;
        height: 30px;
        float: left;
        margin-right: 170px;
        border-radius: 20px;
        border:1px solid #DBDBDB;
        cursor: pointer;
        background-color: #FFFFFF;
        text-align: center;
        line-height: 30px;
        font-size: 13.5px;
    }
    .searchtag-container .button:hover
    {
        background-color: #F2F2F2;
    }
    .searchtag-container .button i
    {
        color: #545454;
        font-size: 15px;
    }
    .showtag-container
    {
         width: 490px;
         height: 24px;
         float: left;
         line-height: 32px;
         padding-top: 8px;
    }
</style>