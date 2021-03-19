//alert("WORKING");

//Get the first video
var vid = document.getElementsByTagName("video")[0];

//If theres a video
if (vid !== undefined) {
    //alert(vid);
    
    //If the video type matches -> loop and mute
    t = vid.getElementsByTagName("source")[0].type;
    if ((t == "video/webm") || (t == "video/ogg")){
        vid.setAttribute("loop", "loop");
        vid.muted = true;
    }
}

void 0;