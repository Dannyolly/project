<template>
    <div id="taglist">
           <div class="taglist-all">
               <span @click="alllistsend">全部歌單</span>
           </div>
           <!--語種.....-->
           <div class="tag-category">
              <div class="language"> <!--此為最外容器....-->
                 <!--左面的圖案-->
                 <language-title :height="60">
                      <i slot="icon" class="fas fa-globe"></i>
                      <span  slot="category">語種</span>
                 </language-title>
                 <mylist>
                     <div v-for="(item,index) in languagearr" :key="item.name" slot="span">
                        <span 
                        :class="{tagactive:languageindex===index}"
                        @click="sendback(item,index)" 
                        >
                            {{item.name}}
                        </span>
                     </div>
                 </mylist>
              </div>
           </div>
           <!--偷屁懶...都系要組件化.......-->
           <!-- 風格....-->
           <div class="tag-style">
             <div class="language" id="style">
                 <language-title :height="180">
                     <i slot="icon" class="far fa-keyboard"></i>
                    <span class="" slot="category">風格</span>
                 </language-title>
                 <mylist :height="180">
                     <div v-for="(item,index) in stylearr" :key="item.name" slot="span">
                        <span :class="{tagactive:styleindex===index}"
                        @click="sendback(item,index)"
                        >
                            {{item.name}}
                        </span>
                     </div>
                 </mylist>
              </div>
           </div>
           <div class="view">
               <div class="language"> <!--此為最外容器....-->
                 <!--左面的圖案-->
                 <language-title :height="100">
                     <i slot="icon" class="fas fa-mug-hot"></i>
                      <span slot="category">場景</span>
                 </language-title>
                 <mylist :height="110">
                     <div v-for="(item,index) in viewarr" :key="item.name" slot="span">
                        <span @click="sendback(item,index)"
                        :class="{tagactive:viewindex===index}">
                            {{item.name}}
                        </span>
                     </div>
                 </mylist>
              </div>
           </div>
           <div class="feel">
                <div class="language"> <!--此為最外容器....-->
                 <!--左面的圖案-->
                 <language-title :height="100">
                      <i slot="icon" class="fas fa-smile"></i>
                      <span slot="category">情感</span>
                 </language-title>
                 <mylist :height="110">
                     <div v-for="(item,index) in feelarr" :key="item.name" slot="span">
                        <span @click="sendback(item,index)" 
                        :class="{tagactive:feelindex===index}">
                            {{item.name}}
                        </span>
                     </div>
                 </mylist>
              </div>
           </div>
           <div class="topical">
                  <div class="language"> <!--此為最外容器....-->
                 <!--左面的圖案-->
                 <language-title :height="150">
                     <i slot="icon" class="fas fa-th-large"></i>
                      <span slot="category">主題</span>
                 </language-title>
                 <mylist :height="150">
                     <div v-for="(item,index) in topicalarr" :key="item.name" slot="span">
                        <span @click="sendback(item,index)" 
                        :class="{tagactive:topicalindex===index}">
                            {{item.name}}
                        </span>
                     </div>
                 </mylist>
              </div>
           </div>
    </div>
</template>

<script>
import LanguageTitle from './languageTitle.vue'
import Mylist from './mylist.vue'
export default {
    name:'taglist',
    props:['languagearr', 'stylearr','viewarr','feelarr','topicalarr'],
    data() {
        return {
            languageindex:-1,
            styleindex:-1,
            viewindex:-1,
            feelindex:-1,
            topicalindex:-1,
            indexarr:[-1,-1,-1,-1,-1],
        }
    },
    components:
    {
      LanguageTitle,
      Mylist,
    },
    methods: {
        /**
         * sendback(arr)
         * 選中的tag會傳回去....
         * 并加上class tagactive
         * indexarr
         * 0 是對應languageindex...如此類推...
         * 
         */
        check:function(arr,index)
        {
           return this.indexarr[0]===index;
        },
        alllistsend:function()
        {
            this.$emit('collect',"全部歌单");
        },
        sendback:function(arr,index)
        {
           
           this.$emit('collect',arr.name)
           this.languageindex=-1;
           this.styleindex=-1;
           this.viewindex=-1;
           this.feelindex=-1;
           this.topicalindex=-1;
           this.indexarr[arr.category]=index;
           console.log(this.indexarr[arr.category]);
           switch(arr.category)
           {
               case 0:this.languageindex=index;break;
               case 1:this.styleindex=index;break;
               case 2:this.viewindex=index;break;
               case 3:this.feelindex=index;break;
               case 4:this.topicalindex=index;break;
           }
           //console.log(arr.category);
           //console.log('當前選中的值:'+index);
           //console.log('當前類型:'+arr.category)
           //console.log('當前類型的值:'+this.indexarr[arr.category]);
           //console.log(this.indexarr[arr.category]==index)
           //全部清除...
           /*
           for(var i=0;i<this.indexarr.length;i++)
           {
               if(i==arr.category) continue;
               this.indexarr[i]=-1;
           }
           */
           

        }
    },
}
</script>

<style>
    #taglist
     {
         width: 730px;
         height: 780px;
         position: absolute;
         border-radius: 5px;
         box-shadow: 1px 1px 3.5px rgba(0, 0, 0, 0.3);
         z-index: 999;
         background-color: #FFFFFF;
     }
     .taglist-all
     {
         width: 700px;
         height: 58px;
         line-height: 58px;
         padding-left: 30px;
         font-size: 14px;
         border-bottom: 1px solid #E5E5E5;
     }
     .taglist-all span:hover
     {
         color:#EC4141;
     }
     .tag-category
     {
         width: 665px;
         height: 80px;
         position: relative;
     }
     .language
     {
         width: 700px;
         height: 60px;
         text-align:center;
         line-height: 60px;
         float: left;
     }
     .language i
     {
         font-size: 22px;
         color: #999999;
         position: absolute;
         left: 29px;
         top:18px
     }
     .language-title
     {
         height: 100%;
         width: 100px;
         float: left;
     }
     .language span
     {
         font-size: 12.5px;
         color: #CFCFCF;
         position: absolute;
     }
     .list
     {
         width: 570px;
         padding-left: 30px;
         float: left;
         height: 40px;
     }
     .list div
      {
          float: left;
          width: 40px;
          height: 38px;
          margin-right: 51px;
          font-size: 14px;
          position: relative;
      }
      .list div span
      {
          height: 25px;
          width: 50px;
          top:20px;
          border-radius: 20px;
          line-height: 25px;
          position: absolute;
          cursor: pointer;
          color: #373737;
      }
      .tag.active
      {
          background-color:#FDF5F5;
      }
      .list div span:hover
      {
           color: #EC4141;
      }
      .tag-style
      {
          width: 100%;
          height: 180px;
          position: relative;
      }
      #style
      {
          height: 180px;
      }
      .view
      {
          width: 100%;
          height: 110px;
          position: relative;
      }
      .feel
      {
           width: 100%;
          height: 110px;
          position: relative;
      }
      .topical
      {
          width: 100%;
          height: 150px;
          position: relative;
      }
      .tagactive
      {
          background-color:  #FDF5F5;;
          color: #ED4168;
      }
</style>