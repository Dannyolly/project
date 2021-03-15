<template>
    <div id="titleBox">
        <div class="recommend-title">
             <slot name="content"> 
               <slot name="text"></slot>
             </slot>
        </div>
    </div>
</template>

<script>
export default {
    name:'titleBox',
}
</script>

<style>
    h2
   {
    font-size: 21px;
    cursor: pointer;
    color: #373737;
   }
    h2:hover
   {
      color: black;
   }
   #titleBox
   {
       width: 799px;
       height: 40px;
   }
   h2 i
   {
       font-size: 17px;
       color: #4C4C4C;
   }
</style>