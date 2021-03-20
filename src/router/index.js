import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'


//import searchBar from '../components/searchBar/searchBar'


const about =()=>import('../views/About.vue')
//searchBar 的一些組件.....
/**
 * searchBar 的4個子組件....
 * 單曲...song
 * 歌手....singer
 * 專輯....album
 * 
 */
const searchBar =()=>import('../components/searchBar/searchBar')
const song=()=>import('../components/searchBar/song/song')
const singer=()=>import('../components/searchBar/singer/singer')
const album=()=>import ('../components/searchBar/album/album');
const movie=()=>import ('../components/searchBar/movie/movie');
const songlist=()=>import('../components/searchBar/songlist/songlist')

/**
 *  首頁的一些組件...
 *  midRightBar----首頁....即個性推薦
 *  下面的統一路徑是 /MidRightBarStuff/xxxx/xxx
 *  個性推薦.....midRightMidBar
 *  歌單....     midSongList
 *  主播電台.....streamer
 *  排行榜 ......ranking
 *  歌手.........midSinger
 *  最新音樂.....midNewMusic
 */
const midRightMidBar=()=>import('../components/midRightMidBar')
const midSongList=()=>import('../components/MidRightBarStuff/songList/midSongList');
const streamer=()=>import('../components/MidRightBarStuff/streamer/streamer');
const ranking=()=>import('../components/MidRightBarStuff/ranking/ranking');
const midSinger=()=>import('../components/MidRightBarStuff/singer/midSinger');
const midNewMusic=()=>import('../components/MidRightBarStuff/newmusic/midNewMusic');
// new music的一些小分頁...
const new1=()=>import('../components/MidRightBarStuff/newmusic/publish/new1');
const new2=()=>import('../components/MidRightBarStuff/newmusic/update/new2');

// midleftbar 的一些組件..
/**
 * 發現音樂---基于ok
 * 視頻-------開始....
 * 朋友
 * 直播
 * 私人FM
 */
const midleftvideo=()=>import('../components/midleftbar/midleftvideo')
//midleftvideo...的大頁面...
/**
 * 視頻--video
 * MV----midLeftMv
 */
const midleftmv=()=>import('../components/midleftbar/MV/midleftmv')
const myvideo=()=>import('../components/midleftbar/video1/myvideo')

/**------------------------------------------------------------------------- */

/**
 * 2021.3.15....開始汁手尾.....(以前做好的頁面....)
 * 獲取歌單....
 * 推薦歌單--彈出的頁面songpage...
 */
const songpage=()=>import('../components/songpage/songpage')
/**
 * 2021.3.16......
 * 歌單已做好....
 * MV界面.......mvpage
 */
const mvpage=()=>import('../components/mvPage/mvpage')
/**
 * 2021.3.17....
 * 這個是歌手界面.....
 * singerpage
 */
const singerpage=()=>import('../components/singerpage/singerpage')
/**
 * 2021.3.18....
 * 這個是專輯界面....
 * 最後了吧算????
 * albumpage
 */
const albumpage=()=>import('../components/albumpage/albumpage')
import midRightBar from '../components/midRightBar.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect: '/home/video/mv'
  },
  {
    path: '/home',
    component:Home,
    children:[
      {
         path: 'firstPage',
         component:midRightBar,
       
         //首頁.....
         /**
          * 個性推薦  歌單 主播電台  排行榜  歌手  最新音樂
          * firstPage為首級........   
          */
         // 視頻...
         children:[
          {
             path:'midRightMidBar',
             component:midRightMidBar,
        
          },
          {
            path:'midSongList',
            component:midSongList,
          },
          {
            path:'ranking',
            component:ranking,
          },
          {
            path:'midSinger',
            component:midSinger,
          },
          {
            path:'midNewMusic',
            component:midNewMusic,
            children:[
              //new1
              {
                  path:'',
                  redirect: '/home/firstPage/midNewMusic/new1'
              },
              {
                path:'new1',
                component:new1,
              },
              {
                path:'new2',
                component:new2,
              }
            ]
          },
         ]
      },
      {
        path:'searchPage',
        component:searchBar,
        children:[
          //首次先指向單曲...
          {
            path:'',
            redirect:'album'
          }, 
          //單曲....
          {
             path:'song',
             component:song
          },
          //歌手....
          {
             path:'singer',
             component:singer
          },
          //專輯....
          {
             path:'album',
             component:album
          },
          //視頻...
          {
            path:'movie',
            component:movie
          },
          //歌單
          {
            path:'songlist',
            component:songlist
          }
         ]
      },
      //視頻...
      {
        path:'video',
        component:midleftvideo,
        meta: {
          keepAlive: true
         },
        children:[
          {
            path:'',
            redirect: '/home/video/myvideo'
          },
          {
           path:'myvideo',
           component:myvideo,
           meta: {
            keepAlive: true
           }
          },
          {
            path:'mv',
            component:midleftmv,
            meta: {
              keepAlive: true
             }
          },
        ]
      },
      /*----------------------------------------------- */
      //獲取歌單頁面....
      /**
       * songpage
       * mvpage
       * singerpage
       * albumpage
       */
      {
        path:'songpage',
        component:songpage,
      },
      /**-------------------------------------------------- */
      {
         path:'mvpage',
         component:mvpage,
      },
      /**----------------------------------------------------- */
      {
        path:'singerpage',
        component:singerpage,
        
      },
      /**--------------------------------------------------------- */
      {
        path:'albumpage',
        component:albumpage,
      }
    ]
  },
  {
    path: '/about',
    component:about
  }
]

const router = new VueRouter({
  mode: 'history',
  
  routes
})





export default router
