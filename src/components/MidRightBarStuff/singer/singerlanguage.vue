<template>
    <div class="singer-language">

            <slot name="type"></slot>
            <slot name="choose"></slot>

    </div>
</template>

<script>
export default {
    name:'singerlanguage'
}
</script>

<style>
  .singer-language
    {
        width: 100%;
        height: 20px;
        padding-top: 5px;
        padding-bottom: 5px;
    }
    .type
    {
        font-size: 13px;
        line-height: 20px;
        padding-left: 10px;
        float: left;
        display: block;
    }
    .which-container
    {
        float: left;
        width: 40px;
        height: 20px;
        padding: 0px 10px;
        margin-bottom: 4px;
    }
    .which
    {
        float: left;
        width: 58px;
        height: 18px;
        border-radius: 5px;
        font-size: 13px;
        line-height: 20px;
        text-align: center;
        margin-right: 27px;
        color:#676767;
        margin-bottom: 0px;
    }
    .which:hover
    {
        color: black;
        cursor: pointer;
    }
    .acttive
    {
        background-color: #FDF5F5;
        color: #EC4141;
    }
</style>