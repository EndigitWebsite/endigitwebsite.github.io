myVar = window.setInterval(windowResizeTimer, 500);

function windowResizeTimer(){
    //clearTimeout(myVar);
    //check for the window width
    
    if($(window).width() > 1200){ 
       document.getElementById("head1").style.marginLeft = $(window).width()/2 - 230 + "px";    
        
    }else{
       document.getElementById("head1").style.marginLeft = 0 + "px";    
    }
    
}