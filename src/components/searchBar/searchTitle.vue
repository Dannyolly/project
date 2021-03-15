<template>
    <div id="search-title">
        <!--line-->
        <div class="line"></div>
        <!--search-title-->
        <div class="title">
          <span>音樂標題</span>
          <span>歌手</span>
          <span>專輯</span>
          <span>時長</span>
          <span>熱度</span>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
    #search-title
    {
        width: 819px;
        height: 36px;
    }
    #search-title .line
    {
        border-top: 1px solid #E6E6E6;
    }
    #search-title .title
    {
        width: 819px;
        height: 36px;
        
    }
    #search-title .title span
    {
        color: #909399;
        font-size: 13.5px;
        line-height: 36px;
        
    }
    /*
    *  120  220  100 100 40
       第一格占  176+220=396
       第二格占  128
       第三格占  128
       第四格占  68
       第五格占  99
     */
    #search-title .title span:nth-child(1)
    {
        margin-left: 120px;
    }
    #search-title .title span:nth-child(2)
    {
        margin-left: 220px;
    }
        #search-title .title span:nth-child(3)
    {
        margin-left: 100px;
    }
     #search-title .title span:nth-child(4)
    {
        margin-left: 100px;
    }
     #search-title .title span:nth-child(5)
    {
        margin-left: 40px;
    }
   
</style>

