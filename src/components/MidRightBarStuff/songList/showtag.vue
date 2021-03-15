<template>
    <div id="showtag">
        <slot name="tag"></slot>
    </div>
</template>
<script>
export default {
    name:'showtag'
}
</script>

<style>
     #showtag
     {
        width: 50px;
        height: 20px;
        border-radius: 20px;
        font-size: 11.5px;
        text-align: center;
        line-height: 17px;
        cursor: pointer;
        color: #676767;
        float: left;
        position: relative;
     }
     #showtag:hover
     {
         color: #373737;
     }
     #showtag span
     {
         position:absolute;
         width: 40px;
         height: 20px;
         left: 0px;
         top: 4px;
     }
     .isActive
     {
        color: #ED4168;
        background-color: #FDF5F5;
     }
</style>