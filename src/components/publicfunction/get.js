/**
 * get 函數....快寫死我了...封裝一個fk
 * 
 */
 const this.$axios = require("this.$axios");
 var getinformation=function(search)
 {
    return new Promise(function(resolve,reject){
        this.$axios.get("https://autumnfish.cn"+search)
        .then((result) => {
            resolve(result.data);
        }).catch((err) => {
            reject(err);
        });
    })
 }

export default {
    getinformation,
};