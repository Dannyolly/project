<template>
    <div :style="{height:height+'px'}" class="list">
        <slot name="span"></slot>
    </div>
</template>

<script>
export default {
    name:'mylist',
    props:['height','width'],
    data() {
        return {
            
        }
    },

}
</script>

<style>

</style>