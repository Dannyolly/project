<template>
    <div id="midright-singer">
        <singerlanguage>
        <span slot="type" class="type">語種:</span>
            <div v-for="(item,index) in languagearr" 
             :key="item" slot="choose" class="which-container">
                <div class="which"
                :class="{acttive:languageindex===index}"
                @click="changestr('languagearr',index)"
                >{{item}}</div>
            </div>
        </singerlanguage>
        <singerlanguage>
         <span slot="type" class="type">分類:</span>
            <div v-for="(item,index) in typearr" :key="item" slot="choose" class="which-container">
                <div class="which"
                :class="{acttive:typeindex===index}"
                @click="changestr('typearr',index)"
                >{{item}}</div>
             </div>
        </singerlanguage>
        <singerlanguage>
         <span :style="{height:50+'px'}" slot="type" class="type">筛选:</span>
            <div v-for="(item,index) in firstword" :key="item" slot="choose" class="which-container">
                <div class="which"
                :class="{acttive:firstindex===index}"
                @click="changestr('firstword',index)"
                >{{item}}</div>
             </div>
        </singerlanguage>
        <div class="pic-container">
            <div class="real-container">
                <img-box v-for="(item,index) in songpicarr" :key="item.name+index" :width="135" :height="135">
                   <img @click="gotosingerpage(index)" slot="img" :src="item.img1v1Url" alt="">
                   <span slot="text" class="recommend-text">{{item.name}}</span>
                </img-box>
 

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ImgBox from '../../ImgBox.vue'
import singerlanguage from './singerlanguage.vue'
export default {
  components: { singerlanguage, ImgBox },
    name:'singer',
    data() {
        return {
            languagearr:['全部','华语','欧美','日本','韩国','其他'],
            //下面這個是各個的取值....用來get
            languagecontent:[-1,7,96,8,16,0],
            typearr:['全部','男歌手','女歌手','乐队组合'],
            typecontent:[-1,1,2,3],
            firstword:['热门','A','B','C','D','E','F','G','H','I','J',
                    'K','L','M','N','O','P','Q','R'
                    ,'S','T','U','V','W','X','Y','Z','#'],
            checkarr:['languagearr','typearr','firstword'],
            languageindex:0,
            typeindex:0,
            firstindex:-1,
            str1:'全部',
            str2:'全部',
            str3:'热门',
            num1:-1,
            num2:-1,
            num3:'',
            songpicarr:[],
        }
    },
    watch:{
        str1:function()
        {
            this.getsongpic();
        },
        str2:function()
        {
            this.getsongpic();
        },
        str3:function()
        {
            this.getsongpic();
        }
    },
    mounted() {
        this.getfirstsongpic();
    },
    methods: {
        /**----------------------------------------------------------- */
         /**
          * gotosingerpage(index)
          * 傳去歌手界面... 
          */
        gotosingerpage:function(index)
        {
          //
          //this.$router.push('/home/singerpage',this.songpicarr[index])
          this.$router.push({path:'/home/singerpage',query:{singerobj:this.songpicarr[index]}});
        },
        /**----------------------------------------------------------- */
        /**
         * 點擊然後改變str....
         * changestr()
         */
        changestr:function(name,index)
        {
            this.firstindex=-1;
            switch (name) {
                case 'languagearr':this.languageindex=index;this.str1=this.languagearr[index];this.num1=this.languagecontent[index];break;
                case 'typearr'    :this.typeindex=index;this.str2=this.typearr[index];this.num2=this.typecontent[index];break;
                case 'firstword'  :this.firstindex=index;if(index==0){break;}this.str3=this.firstword[index];this.num3=this.firstword[index];break;
                default:break;
            }
        },
        /**
         * getsonpic為後面所選的...
         */
        getsongpic:function()
        {
           //console.log(this.str1);
           //var c=this.str3;
           var that=this;
           if(that.num3=='')
           {
            this.$axios.get("http://localhost:3000/artist/list?limit=20&type="+this.num2+'&area='+this.num1)
               .then((result) => {
                  that.songpicarr=result.data.artists;
                  //console.log(that.songpicarr)
               }).catch((err) => {
                   
               });
           }
           else 
          {
              this.$axios.get("http://localhost:3000/artist/list?limit=20&type="+this.num2+'&area='+this.num1+'&initial='+this.num3)
               .then((result) => {
                  that.songpicarr=result.data.artists;
                 // console.log(that.songpicarr)
               }).catch((err) => {
                   
               });
          }
        },
        /**
         * 獲取圖片...歌手?????
         * 首次....
         */
       getfirstsongpic:function()
       {
           var that=this;

              
             this.$axios.get("http://localhost:3000/artist/list?type=-1&area=-1&limit=20")
               .then((result) => {
                  that.songpicarr=result.data.artists;
                  //console.log(that.songpicarr)
               }).catch((err) => {
                   
               });
           
           //console.log(a)
           //this.$axios.get("http://localhost:3000/")
       },
       getstrnum:function(str,arr,arrcontent)
       {
          
          
          for(var i=0;arr.length;i++)
          {
             if(str===this.arr[i])
             {
                 return arrcontent[i];
             }
          }
          
       }
    },
}
</script>

<style>
    #midright-singer
    {
      width: 799px;
      height: 460px;
      padding-top:20px;
      padding-left: 20px;
      position: relative;
      overflow: scroll;
    }
    .pic-container
    {
        width: 779px;
        height: 310px;
        padding-left: 10px;
        position: absolute;
        top: 170px;
        
    }
    .real-container
    {
        width: 100%;
        height: 100%;

    }
</style>