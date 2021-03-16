/**
 * 方法....
 * 接口方法和各種方法都在此...
 * 2021/3/3
 * ....
 */

 //請求輪播圖...
  function getBannerImage() {
    axios.get("http://localhost:3000/banner?type=2").then(
      function (response) {
        console.log(response.data.banners);
      },
      function (error) {}
    )
  }

  export{
      getBannerImage
  }
