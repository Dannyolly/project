<template>
    <div class="anytype">
        <span class="anytype-text" :class="{aaactive:num===index}" 
           v-for="(item,index) in arr" 
           :key="item+index" 
           @click="send(item,index)"
           >
            {{item}}
        </span>

        <slot name="function"></slot>
    </div>
</template>
<script>
export default {
    name:'anytype',
    data() {
        return {
            arr:['全部','华语','欧美','韩国','日本'],
            num:0,
        }
    },
    methods: {
        //sendtofather
        send:function(str,index)
        {
            this.$emit('receivestr',str);
            this.num=index;
        }
    },
}
</script>
<style>
    .anytype
    {
        width: 240px;
        height: 40px;
         display: flex;
    }
    .anytype span
    {
        font-size: 15px;
        line-height: 40px;
        flex: 1;
        color: #676767;
        cursor: pointer;
    }
    .aaactive
    {
        font-weight:bolder;
        color: #373737;
    }
    .anytype .anytype-text:hover
    {
        color: #373737;
    }
    .function
    {
        height: 100%;
        width: 300px;
        position: absolute;
        right: 0;
    }
</style>