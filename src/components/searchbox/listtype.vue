<template>
    <div class="listtype">
        <div class="searchword-type">
            <slot name="icon"></slot>
            <slot name="type"></slot>
            
        </div>
        <slot name="list"></slot>

    </div>
</template>

<script>
export default {
     name:'listtype'    
}
</script>

<style>
    .listtype
    {
        width: 300px;
     
        padding-bottom:1px;
        float: left;
    }
    .searchword-type
    {
        width: 340px;
        line-height: 25px;
        padding-left: 10px;
        height: 25px;
        background-color: #F5F5F7;
    }
    #type-icon
    {
        color: #313132;
      
    }
    .listtype .searchword-list
    {
        width: 320px;
        padding-left: 30px;
        line-height: 30px;
        height: 30px;
        cursor: pointer;
    }
    .listtype .searchword-list:hover
    {
        background-color:#F5F5F7 ;
    }
</style>