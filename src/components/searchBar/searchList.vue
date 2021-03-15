<template>
    <div id="search-list" >
      <div class="search-list-musictitle">
          <slot name="num"></slot>
          <slot name="icon-like"></slot>
          <slot name="icon-download"></slot>
          <slot name="the-title"></slot>
      </div>
      
      <div class="search-list-musicsinger">
          <slot name="the-singer"></slot>
      </div>
      
      <div class="search-list-album">
          <slot name="the-album"></slot>
      </div>
      <div class="search-list-time">
          <slot name="time"></slot>

      </div>
      <!--熱度條...-->
      <div class="search-list-hot">
         <slot name="hot"></slot>
         <!--檔住xx%-->
         <div class="nonum"></div>
      </div>
    </div>
</template>

<script>
export default {
    name:'searchList',
    data() {
        return {
          isActive:false,
        }
    },
    methods: {
        chance:function()
        {
          
        }
    },
}
</script>

<style>
      .active
      {
          background: #E5E5E5;
      }
      #search-list i{
          cursor: pointer;
      }
      #search-list
      {
          width: 818px;
          height: 36px;   
          overflow: hidden;
          position: relative;
      }
      .search-list-hot
      {
          width: 120px;
          height: 100%;
          line-height: 36px;
          float: left;
          position: absolute;
          right: -20px;

      }
      .search-list-hot .el-progress.el-progress--line
      {
          margin-top: 8px;
          width: 144px;
      }
      .search-list-musictitle
      {
          line-height: 35px;
          padding-left: 25px;
          color:#909399;
          width: 366px;
          float: left;
          position: relative;
      }
      .search-list-musictitle span
      {
          font-size: 13.5px;
      }
      .search-list-musictitle span:nth-child(1)
      {
         margin-right: 15px;
      }
      .search-list-musictitle i:nth-child(2)
      {
          margin-right: 10px;
      }
      .search-list-musictitle i:nth-child(3)
      {
          margin-right: 12px;
      }
      .the-title
      {
          width: 271px;
          height: 100%;
          display: inline-block;
      }
      .search-list-musicsinger
      {
          width: 127px;
          height: 100%;
           float: left;
           font-size: 13.5px;
            color:#909399;
            line-height: 36px;
      }
      .the-singer
      {
          width: 127px;
          height: 100%;
          display: inline-block;
      }
      .search-list-album
      {
           width: 127px;
            height: 100%;
           float: left;
           font-size: 13.5px;
            color:#909399;
            line-height: 36px;
    
      }
      .search-list-time
      {
          width: 67px;
          height: 100%;
          float: left;
          line-height: 36px;
          font-size: 15px;
        color:#909399;
      }
      #search-list:nth-child(2n+1)
      {
          background-color: #F9F9F9;
      }
      #search-list:hover
      {
          background-color: #F0F1F2;
      }
      /*
    *  120  220  100 100 40
       第一格占  176+220=396
       第二格占  128
       第三格占  128
       第四格占  68
       第五格占  99
     */
</style>