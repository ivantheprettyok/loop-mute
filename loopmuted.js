//If the first thing on the page is a video
if (document.body.firstChild instanceof HTMLVideoElement) {
    //alert("VIDEO");

    //Get the first video
    var vid = document.getElementsByTagName("video")[0];

    //If theres a video.  Double check.
    if (vid !== undefined) {
        //If the video type matches -> loop and mute
        t = vid.getElementsByTagName("source")[0].type;
        if ((t == "video/webm") || (t == "video/ogg") || (t == "video/mp4")){
            vid.setAttribute("loop", "loop");
            vid.muted = true;
        }

        //mute hotkey
        document.addEventListener('keydown', logKey);

        function logKey(e) {
            if (e.altKey && (e.code == "KeyM")){
                vid.muted = !vid.muted;
                //alert("MUTE");
            }//if
        }//logkey

    }//If video present
}//If first thing is video
void 0;
