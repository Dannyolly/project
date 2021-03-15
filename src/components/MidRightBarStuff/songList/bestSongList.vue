<template>
    <div id="best-song-list">
        <div class="bestSongContainer">
            <div class="best-imgbox">
                 <slot name="img"></slot>
            </div>
             <div class="best-textbox">
                <div class="button">
                    <i class="fas fa-crown"></i>
                    <span>精品歌曲</span>
                </div>
                <div class="best-text">
                    <slot name="title"></slot>
                    <slot name="text"></slot>
                </div>
             </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'bestSongList',
    components:{

    }
}
</script>

<style>
    #best-song-list
    {
     width: 799px;
     height: 195px;
     padding-left: 20px;
     padding-top: 20px;
     position: relative;
    }
    .bestSongContainer
    {
        width: 760px;
        height: 180px;
        position:relative;
        border-radius: 5px;
        background-image: linear-gradient(45deg,#58585D ,#543134,#2D4E57 ,#223A46 );
    }
    .best-imgbox
    {
      width: 150px;
      height: 150px;
      border-radius: 8px;
      position: absolute;
      top: 15px;
      left: 15px;
    }
    .best-imgbox img
    {
        width: 100%;
        height: 100%;
        border-radius: 8px;
    }
    .best-textbox
    {
        width: 400px;
        height: 150px;
        padding-top: 30px;
        left: 180px;
        position:absolute;
    }
    .best-textbox .button
    {
        width: 90px;
        height: 33px;
        text-align: center;
        padding-left: 5px;
        line-height: 33px;
        border-radius: 30px;
        background-color:rgba(0, 0,0,0.01);
        border:1px solid #E7AA5A;
        color: #E7AA5A;
        margin-bottom: 25px;
        
    }
    .best-textbox .button i
    {
        font-size: 13px;
        padding-bottom: 10px;
    }
    .best-textbox .button span
    {
        font-size: 14px;
        margin-left: 3px;
    }
    .best-text
    {
         width: 400px;
         height: 80px;
    }
    .best-text h3
    {
        margin-bottom: 4px;
        font-size: 17px;
        color: #FBFBFB;
    }
    .best-text span
    {
        margin-left: 0px;
        font-size: 13px;
        color: #848388;
    }
</style>