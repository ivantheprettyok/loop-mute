//If the first thing on the page is an image
if (document.body.firstChild instanceof HTMLImageElement) {
    var im = document.getElementsByTagName("img")[0];
    //Hotkeys
    document.addEventListener('keydown', logKey);
    function logKey(e) {
        //Zoom hotkey
        if (e.code == "KeyZ"){
            if (im.getAttribute("height") == "100%") {
                im.setAttribute("width", "100%");
                im.setAttribute("height", "auto");
            } else if (im.getAttribute("width") == "100%") {
                im.removeAttribute("width");
                im.removeAttribute("height");
            } else {
                im.setAttribute("width", "auto");
                im.setAttribute("height", "100%");
            }
            
        }//If z pressed
    }//logkey function
    
}//If image


//============================================================================================

//If the first thing on the page is a video
if (document.body.firstChild instanceof HTMLVideoElement) {
    var startTime = "0";
    var endTime = "10";
    var timeCrop;

    //Get the first video
    var vid = document.getElementsByTagName("video")[0];

    //If theres a video.  Double check. bc idk why
    if (vid !== undefined) {
        //If the video type matches -> loop, mute, hide controls, zoom
        t = vid.getElementsByTagName("source")[0].type;
        if ((t == "video/webm") || (t == "video/ogg") || (t == "video/mp4")){
            vid.setAttribute("loop", "loop");
            vid.muted = true;
            vid.controls = false;
            vid.setAttribute("width", "100%");
            vid.setAttribute("height", "100%");
        }

        //Hotkeys
        document.addEventListener('keydown', logKey);
        function logKey(e) {
            //Mute hotkey
            if (e.code == "KeyM"){
                vid.muted = !vid.muted;
                //alert("MUTE");
            }//If m pressed
            
            //Controls hotkey
            if (e.code == "KeyC"){                
                vid.controls = !vid.controls;
            }//If c pressed
            
            //Zoom hotkey
            if (e.code == "KeyZ"){
                //alert(vid.getAttribute("width"));
                if (vid.getAttribute("width") == "100%") {
                    vid.removeAttribute("width");
                    vid.removeAttribute("height");
                } else {
                    vid.setAttribute("width", "100%");
                    vid.setAttribute("height", "100%");
                }//If/else already zoomed
            }//If z pressed
            
            //Time hotkey.  Enter start_time,end_time to loop.  if blank, defaults to 0/duration respectively.
            if (e.code == "KeyT"){
                startTime = String(startTime);
                var inputTime = prompt("Time range:", startTime.concat(",", endTime));
                //alert(inputTime);
                
                //Stop time cropping if no comma, else -> make a time crop loop
                if (inputTime == null) {
                    clearInterval(timeCrop);
                }
                var shouldStop = (inputTime.includes(","));
                if (!shouldStop) {
                    clearInterval(timeCrop);
                } else {  //Set defaults if a value is blank
                    var res = inputTime.split(",");
                    if (res[0] == "") {
                        res[0] = 0.0;
                    }
                    if (res[1] == "") {
                        res[1] = vid.duration - 0.05;
                    }
                    
                    startTime = res[0];
                    endTime = res[1];
                    timeCrop = setInterval(checkTime, 100);
                }
            }//If t pressed
            
            
        }//logkey

        //time cropping
        function checkTime() {
            if (vid.currentTime > endTime) {
                //alert("Replay");
                vid.currentTime = startTime;
            }//If past end time
            if (vid.currentTime < startTime) {
                vid.currentTime = startTime;
            }//If before start time
        }//checkTime
        
    }//If video present
}//If first thing is video
void 0;
