(function(){
    var mainDiv = document.getElementsByClassName('pageMsg')[0];

    if(mainDiv == undefined || mainDiv == null)
        return;

    mainDiv.style.position = "fixed";
    mainDiv.style.width = "100%";
    mainDiv.style.top = "0%";
    mainDiv.style.right = "0%";
    mainDiv.style.left = "-1%";
    mainDiv.style.zIndex = 99999999999;
    mainDiv.style.textAlign = "center";
    mainDiv.style.fontWeight = "bold";
    mainDiv.style.height = "28px";
    mainDiv.style.fontSize = "large";
    mainDiv.style.backgroundColor = "blue";

    var parents = mainDiv.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes;

    for(i=0; i < parents.length; i++){
        parents[i].style.paddingTop="30px";
    }
    
    var headerBar = document.getElementById('globalHeaderBar');
    
    if(headerBar != undefined && headerBar != null)
        headerBar.style.margin = '36px -12px';
})();
