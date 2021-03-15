<template>
    <div class="commentbox">
        <div class="left-img-container">
            <div class="img-container">
                <slot name="img"></slot>
            </div>
        </div>
        <div class="commentbox-text-container">
                 <div class="text">
                     <slot name="user-name"></slot>
                     <slot name="content"></slot>
                  <slot name="date"></slot>
                  <div class="functionbox">
                       <div class="myfunction">
                           <div class="line1"></div>
                           <slot name="like"></slot>
                           <span class="send" id="send"><i class="fas fa-share-square"></i></span>
                           <span class="commentto" id="commentto"><i class="far fa-comment"></i></span>
                           <div class="line2"></div>
                       </div>
                  </div>
                 </div>
                
        </div>
    </div>
</template>

<script>

export default {
   name:'commentbox',
   data() {
       return {
         mydate:'',
         dateobj:{},    
       }
   },
   methods: {

   },
   mounted() {
      
   },
}
</script>

<style>
    .commentbox
    {
        width: 529px;
        min-height:90px; 
        height:auto;
        position: relative;
     
        margin-bottom: 20px;
    }
    .left-img-container
    {
        float: left;
        position: relative;
        width: 40px;
        padding-top: 20px;
        height: 100%;
       
        
    }
    .myfunction
    {
        display: flex;
        width: 120px;
    }
    .myfunction #click
    {
        color: #797979;
    }
    .myfunction span:nth-child(1)
    {
        flex:2;
        cursor: pointer;
    }
    .functionbox #like:hover
    {
       color: #333333;
    }
    .functionbox #send:hover
    {
        color: #333333;
    }
    .functionbox #commentto:hover{
        color: #333333;
    }
    .myfunction span:nth-child(2)
    {
        flex:1;
        margin-right: 10px;
        cursor: pointer;
    }
    .myfunction span:nth-child(3)
    {
        flex:1;
        cursor: pointer;
    }
    .left-img-container .img-container
    {
        width: 40px;
        height: 40px;
        border-radius: 50%;

    }
    .left-img-container .img-container img
    {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .commentbox-text-container
    {
        float: left;
        width: 459px;
        height: auto;
        padding-left: 20px;
        padding-bottom:20px;
        border-bottom: 1px solid #F3F3F3;

    }
    .commentbox-text-container .text
    {
        width: 100%;
        height: auto;
        padding-top: 10px;
        padding-bottom: 20px;
        position: relative;
    }
    .commentbox-text-container .text .content
    {
        color: #333333;
    }
    .commentbox-text-container .text .user-name
    {
        color: #507DAF;
        cursor: pointer;
    }
    .commentbox-text-container .text .user-name:hover
    {
        color: #0B58B0;
    }
    .commentbox-text-container .data
    {
        font-size: 12px;
        color: #999999;
        position: absolute;
        left: 0;
        bottom: 0px;
    }
    .commentbox-text-container .functionbox
    {
        position: absolute;
        right: 0px;
        bottom: 0px;
        font-size: 12px;


    }
    .line1
    {
        width: 1px;
        height: 14px;
        background-color: #D7D7D7;
        position: absolute;
        left: 45px;
    }
    .line2
    {
        width: 1px;
        height: 14px;
        background-color: #D7D7D7;
        position: absolute;
        left: 85px;
    }
    .click i 
    {
        color:red;
    }
</style>