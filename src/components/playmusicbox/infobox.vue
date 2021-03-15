<template>
  <div class="infobox">
    <div class="info-real-container">
      <div class="info-left-container">
        <div class="info-img-container">
          <img
            v-show="isinfo == true"
            class="top"
            src="../../assets/img/top1.png"
            alt=""
          />
          <img
            v-show="isinfo == true"
            class="circle move"
            src="../../assets/img/musiccircle1.png"
            alt=""
          />
          <img v-if="songinfo.al.picUrl" class="ownpic move" :src="songinfo.al.picUrl" alt="" />
        </div>
        <div class="info-left-choose">
          <div class="box">
            <div class="love">
              <i class="far fa-heart"></i>
            </div>
          </div>
          <div class="box">
            <div class="myfolder">
              <i class="far fa-folder"></i>
            </div>
          </div>
          <div class="box">
            <div class="download">
              <i class="fas fa-arrow-circle-down"></i>
            </div>
          </div>
          <div class="box">
            <div class="share">
              <i class="far fa-share-square"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="info-right-container">
        <h2 v-if="songinfo.name" class="info-title">{{ songinfo.name }}</h2>
        <div class="real-info">
          <div class="info-word">
            <div class="album">專輯:</div>
            <div v-if="songinfo.al.name" class="album-name">{{ songinfo.al.name }}</div>
          </div>
          <div class="info-word">
            <div class="album">歌手:</div>
            <div v-if="songinfo.ar" class="album-name">{{ songinfo.ar[0].name }}</div>
          </div>

          <div class="info-word">
            <div class="album">來源:</div>
            <div class="album-name">網易雲傷感迿樂</div>
          </div>
        </div>
        <!--歌詞容器..-->
        <div v-if="songwordarr" class="word-container">
          <div 
            v-for="(item, index) in songwordarr"
            class="song-word"
            :key="item + index"
          >
            {{ item }}
          </div>
        </div>
      </div>

      <!--這里是留言區...-->
      <div class="comment-container">
        <h4>
          評論
          <span>(已有xxxxx條評論)</span>
        </h4>
        <div class="own-comment-box">
          <input type="text" name="" id="" placeholder="發表評論" />
          <div class="pen">
            <i class="fas fa-pen"></i>
          </div>
          <div class="own-smile">
            <i class="far fa-smile"></i>
          </div>
          <div class="add">@</div>
        </div>

        <div class="nice-comment">
          <h4>精彩評論</h4>
          <commentbox v-for="(item,index) in commentarr" :key="item+index">
                 <img slot="img" :src="item.user.avatarUrl" alt="">
                <span slot="user-name" class="user-name">{{item.user.nickname}}: </span>
                <span slot="content" class="content">{{item.content}}</span>
                <div slot="date" class="data">2021年7月1日 11:21</div>
                <span :class="{click:clickarr[index]===index}"
                slot="like" class="like" id="like">
                    <i @click="clicked(index)"  class="fas fa-thumbs-up">{{item.likedCount}}</i>
                </span>
          </commentbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Commentbox from "./commentbox.vue";
export default {
  name: "infobox",
  props: ["isinfo", "songword", "songinfo"],
  data() {
    return {
      thesongword: "",
      songwordarr: [],
      a: {
        name: "恋爱ing",
        id: 385973,
        pst: 0,
        t: 0,
        ar: [
          {
            id: 13193,
            name: "五月天",
            tns: [],
            alias: ["Mayday"],
            alia: ["Mayday"],
          },
        ],
        alia: [],
        pop: 100,
        st: 0,
        rt: "600902000000534531",
        fee: 8,
        v: 132,
        crbt: null,
        cf: "",
        al: {
          id: 38247,
          name: "知足 最真杰作选",
          picUrl:
            "http://p3.music.126.net/_B1Fn_Z1WxHzqGLzLZDf-w==/109951163263882447.jpg",
          tns: [],
          pic_str: "109951163263882447",
          pic: 109951163263882450,
        },
        dt: 169000,
        h: {
          br: 320000,
          fid: 0,
          size: 6776206,
          vd: -34300,
        },
        m: {
          br: 192000,
          fid: 0,
          size: 4065741,
          vd: -31800,
        },
        l: {
          br: 128000,
          fid: 0,
          size: 2710508,
          vd: -30500,
        },
        a: null,
        cd: "1",
        no: 4,
        rtUrl: null,
        ftype: 0,
        rtUrls: [],
        djId: 0,
        copyright: 0,
        s_id: 0,
        mark: 8704,
        originCoverType: 1,
        originSongSimpleData: null,
        single: 0,
        noCopyrightRcmd: null,
        rtype: 0,
        rurl: null,
        mst: 9,
        cp: 684010,
        mv: 0,
        publishTime: 1122825600000,
        privilege: {
          id: 385973,
          fee: 8,
          payed: 0,
          st: 0,
          pl: 128000,
          dl: 0,
          sp: 7,
          cp: 1,
          subp: 1,
          cs: false,
          maxbr: 999000,
          fl: 128000,
          toast: false,
          flag: 68,
          preSell: false,
          playMaxbr: 999000,
          downloadMaxbr: 999000,
          freeTrialPrivilege: {
            resConsumable: false,
            userConsumable: false,
          },
          chargeInfoList: [
            {
              rate: 128000,
              chargeUrl: null,
              chargeMessage: null,
              chargeType: 0,
            },
            {
              rate: 192000,
              chargeUrl: null,
              chargeMessage: null,
              chargeType: 1,
            },
            {
              rate: 320000,
              chargeUrl: null,
              chargeMessage: null,
              chargeType: 1,
            },
            {
              rate: 999000,
              chargeUrl: null,
              chargeMessage: null,
              chargeType: 1,
            },
          ],
        },
      },
      commentarr:[],
      clickarr:[],
      clickindex1:-1,
    };
  },
  components: {
    Commentbox,
  },
  watch: {
    songword: function () {
      //console.log(this.songword);
      this.thesongword = this.songword;
      this.getsongword();
    },
    songinfo: function () {
      this.getsongcomment();
    },
    commentarr:function()
    {
       this.clickarr.length=this.commentarr.length;
       for(var i=0;i<this.clickarr.length;i++)
       {
           this.clickarr[i]=-1;
       }
    }
  },
  methods: 
  {
    clicked:function(index)
    {
      console.log(index);
      this.clickarr[index]=index;
    },
    getsongword: function () 
    {
      var a = /(\[.*\])/g;
      this.thesongword = this.thesongword.replace(a, "");
      //console.log(this.thesongword);
      var arr = this.thesongword.split("\n");
      this.songwordarr = arr;
      //console.log(arr);
    },
    // 留言comment
     getsongcomment:function()
       {
           var that =this;
           /**
            * res.data.hotComments
            * .content...內容..
            * .user.avatarUrl  頭像...
            * .user.nickname   名...
            */
           //console.log(this.songinfo.id);
           this.$axios.get("https://autumnfish.cn/comment/hot?type=0&id="+this.songinfo.id)
           .then(res=>{
               //console.log(res);
               that.commentarr=res.data.hotComments;
           })
       },
       getnewcomment:function()
       {
           var that=this;
           this.$axios.get("https://autumnfish.cn/")
       }
  },
};
</script>

<style>
.nice-comment {
  padding-top: 40px;
}
.comment-container {
  width: 500px;
  height: auto;
  float: left;
  padding-left: 90px;
}
.comment-container span {
  font-size: 12px;
  color: #999999;
  margin-left: 0px;
}
.own-comment-box {
  width: 500px;
  height: 65px;
  padding-top: 30px;
  position: relative;
}
.own-comment-box input {
  width: 100%;
  height: 100%;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  padding-left: 25px;
  line-height: 0px;
  text-align: left;
  padding-top: 2px;
}
.own-comment-box .pen {
  position: absolute;
  top: 35px;
  left: 10px;
  cursor: pointer;
}
.own-comment-box .own-smile {
  position: absolute;
  top: 35px;
  right: 15px;
  cursor: pointer;
}
.own-comment-box .add {
  position: absolute;
  top: 33.5px;
  right: -15px;
  cursor: pointer;
}
/*居上??? */
::-webkit-input-placeholder {
  vertical-align: top;
}
.infobox {
  width: 0px;
  height: 0px;
  transition: width 0.3s, height 0.3s;
  z-index: 9999;
}
.infobox.infoactive {
  position: absolute;
  width: 100%;
  height: 540px;
  background-color: #ffffff;
}
.info-real-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: scroll;
}
.info-left-container {
  width: 50%;
  height: 490px;
  float: left;
}
.info-img-container {
  width: 100%;
  height: 400px;
  position: relative;
}
.info-img-container .top {
  width: 300px;
  position: absolute;
  left: 90px;
}
.info-img-container .circle {
  width: 327px;
  height: 327px;
  top: 57px;
  left: 80px;
  position: absolute;
}
@keyframes myfirst2 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
/**兩個動晝... */
.move {
  animation: myfirst2 15s infinite linear;
}
.info-left-choose {
  width: 316px;
  padding-left: 84px;
  height: 50px;
  display: flex;
}
.info-left-choose .box {
  flex: 1;
  text-align: center;
  position: relative;
}
.love {
  width: 45px;
  height: 45px;
  position: absolute;
  line-height: 50px;
  font-size: 17px;
  left: 25.5px;
  border-radius: 50%;
  color: #595959;
  cursor: pointer;
  background-color: #f5f5f5;
}
.love:hover {
  background-color: #ebebeb;
}
.myfolder {
  width: 45px;
  height: 45px;
  position: absolute;
  line-height: 50px;
  font-size: 17px;
  color: #595959;
  cursor: pointer;
  left: 25.5px;
  border-radius: 50%;
  background-color: #f5f5f5;
}
.myfolder:hover {
  background-color: #ebebeb;
}
.download {
  width: 45px;
  height: 45px;
  position: absolute;
  line-height: 50px;
  font-size: 17px;
  color: #595959;
  cursor: pointer;
  left: 25.5px;
  border-radius: 50%;
  background-color: #f5f5f5;
}
.download:hover {
  background-color: #ebebeb;
}
.share {
  width: 45px;
  height: 45px;
  position: absolute;
  line-height: 50px;
  color: #595959;
  cursor: pointer;
  font-size: 17px;
  left: 25.5px;
  border-radius: 50%;
  background-color: #f5f5f5;
}
.share:hover {
  background-color: #ebebeb;
}
.ownpic {
  position: absolute;
  left: 133px;
  top: 108px;
  width: 225px;
  height: 225px;
  border-radius: 50%;
}
.info-right-container {
  width: 500px;
  height: 490px;
  float: left;
  padding-left: 10px;
}
.info-title {
  padding-top: 30px;
  font-size: 26px;
  font-weight: 200;
  margin-bottom: 10px;
}
.real-info {
  width: 450px;
  height: 50px;
  display: flex;
}
.real-info .info-word {
  flex: 1;
  margin-right: 10px;
}
.real-info .info-word:nth-child(2)
{
    flex:0.7;
}
.real-info .album {
  float: left;
  color: #666666;
  line-height: 50px;
  font-size: 13px;
  margin-right: 7px;
}
.real-info .album-name {
  float: left;
  line-height: 49px;
  font-size: 13px;
  color: #5984b3;
  cursor: pointer;
}
.real-info .album-name:hover {
  color: #0b58b0;
}
.word-container {
  width: 400px;
  height: 330px;
  border-right: 1px solid #f3f3f3;

  overflow: scroll;
}
.song-word {
  width: 300px;
  height: 30px;
  line-height: 30px;
  font-size: 15px;
  color: #666666;
}
</style>