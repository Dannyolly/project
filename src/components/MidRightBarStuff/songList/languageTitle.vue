<template>
         <div :style="{height:height+'px'}" class="language-title">
              
              <slot name="icon"></slot>
             <slot name="category"></slot>
         </div>
</template>

<script>
export default {
    name:'languageTitle',
    props:['height'],
    computed:{
        
    },
    data() {
        return {
             myheight:0,
        }
    },
}
</script>

<style >
    
</style>