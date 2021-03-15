<template>
    <div>
         <el-carousel :interval="4000" type="card" height="200px">
           <el-carousel-item v-for="(item,index) in streamerarr" :key="index+item.typeTitle">
             <el-image
             style="width: 100%; height: 200px"
              fit="cover"
              :src="item.pic"
               >
            </el-image>
      </el-carousel-item>
    </el-carousel>
    </div>
</template>

<script>
export default {
    name:'streamBanner',
    props:['streamerarr'],
    data() {
        return {
            myarr:[]
        }
    },
    components:{

    },
    mounted() {
         this.check();
    },
    methods: {
        check:function()
        {
            this.myarr=this.streamerarr;
            console.log(this.myarr)
            console.log("hello");
        }

    },
}
</script>