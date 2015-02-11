(function(){
var mainDiv = document.getElementsByClassName('pageMsg')[0];
    mainDiv.style.position="fixed";
    mainDiv.style.width="100%";
    mainDiv.style.top="0%";
    mainDiv.style.right="0%";
    mainDiv.style.left="-2%";
    mainDiv.style.zIndex=99999999999;
    mainDiv.style.textAlign="center";
    mainDiv.style.fontWeight="bold";
var parents = mainDiv.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes;
    for(i=0;i<parents.length;i++){
        parents[i].style.paddingTop="30px";
    }
})();