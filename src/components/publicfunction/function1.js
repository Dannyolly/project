/**
 * 封裝一個當數字>99999
 * 則改為10万...
 * 
 */
var cutdownString2=function( playCount )
{
      //開始cut....
      var a=String(playCount);
      var b=a.substring(a.length-4);
      a=a.replace(b,'');
      a=a+'万'
      return a;
}

export default cutdownString2