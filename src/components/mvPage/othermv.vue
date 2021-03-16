<template>
    <div class="othermv">
        <div class="othermv-imgbox">
         
            <slot name="img"></slot>
            <div class="othermv-playCount">
             
                <slot name="playCount"></slot>
            </div>
        </div>
        <div class="othermv-textbox">
           <slot name="title"></slot>
           <slot name="by"></slot>
           
        </div>
    </div>
</template>

<script>
export default {
    name:'othermv'
}
</script>

<style>
    .othermv
    {
        width: 300px;
        height: 80px;
        position: relative;
        margin-bottom: 10px;
    }
    .othermv .othermv-imgbox
    {
        width: 150px;
        height: 80px;
        border-radius: 8px;
        margin-right: 8px;
        position: relative;
        float: left;
    }
    .othermv .othermv-imgbox img
    {
        width: 100%;
        height: 100%;
        border-radius: 8px;
    }
    .othermv-playCount
    {
        position: absolute;
        right: 0px;
        top: 0px;
        width: 50px;
        height: 20px;
    }
    .othermv-playCount i
    {
        font-size: 13px;
        color: #FFFFFF;
    }
    .othermv-textbox
    {
        width: 140px;
        height: 100%;
        float: left;
        text-align: left;
    }
    .othermv-textbox .title
    {
        text-align: left;
        height: 40px;
        width: 200px;
        font-size: 14px;
        position: absolute;
        top: 10px;
    }
    .by
    {
        font-size: 14px;
        position: absolute;
        bottom: 15px;
        left: 158px;
        color:#AAA8A5;
    }
</style>