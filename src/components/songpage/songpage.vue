<template >
    <div class="songpage">
        <toppage @getonesong="getonesong"
          @getallsong="getallsong"
        ></toppage>
    </div>
</template>

<script>
import toppage from './toppage.vue'
export default {
  components: { toppage },
  name:'songpage',
  data() {
      return {
          
      }
  },
  methods: {
      getonesong:function(arr)
      {
        this.$emit('getonesong',arr);
      },
      getallsong:function(arr,index)
      {
          //console.log('getallsong'+arr+index);
          this.$emit('getallsong',arr,index);
      }
  },
}
</script>

<style>
    .songpage
    {
        width: 819px;
        height: 540px;
        float: left;
    }
</style>