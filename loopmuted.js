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


var allVids = document.getElementsByTagName("video");
var vid = allVids[0];

if (vid != undefined){

    var startTime = "0";
    var endTime = "10";
    var timeCrop;
    var speed = 1.0;

    //Initial settings
    if (document.body.firstChild instanceof HTMLVideoElement) {
        vid.setAttribute("loop", "loop");
        vid.muted = true;
        vid.controls = false;
        vid.setAttribute("width", "100%");
        vid.setAttribute("height", "100%");
    }

    //Hotkeys
    if (true){

        document.addEventListener('keydown', logKey);
        function logKey(e) {
            
            //Switch on keypress
            switch(e.code){
                //Mute
                case "KeyM":
                    vid.muted = !vid.muted;
                    break;
            
                    
                //Controls
                case "KeyC":
                    vid.controls = !vid.controls;
                    break;
            
            
                //Zoom
                case "KeyZ":
                    //alert(vid.getAttribute("width"));
                    if (vid.getAttribute("width") == "100%") {
                        vid.removeAttribute("width");
                        vid.removeAttribute("height");
                    } else {
                        vid.setAttribute("width", "100%");
                        vid.setAttribute("height", "100%");
                    }//If/else already zoomed
                    break;
                    
                    
                //Time loop.  Enter start_time,end_time to loop.  if blank, defaults to 0/duration respectively.
                case "KeyT":
                    startTime = String(startTime);
                    var inputTime = prompt("Time range:", startTime.concat(",", endTime));
                    
                    //Stop time cropping if no comma, else -> make a time crop loop
                    if (inputTime == null) {clearInterval(timeCrop);}
                    
                    var shouldStop = (inputTime.includes(","));
                    if (!shouldStop) {
                        clearInterval(timeCrop);
                    } else {//Set defaults if a value is blank
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
                    break;

            
                //Jump time or move frame
                case "KeyL":
                    if (vid.paused) {vid.currentTime = vid.currentTime + (1.0/60.0);} else {vid.currentTime = vid.currentTime + 3;}
                    break;
                case "KeyJ":               
                    if (vid.paused) {vid.currentTime = vid.currentTime - (1.0/60.0);} else {vid.currentTime = vid.currentTime - 3;}
                    break;
                    
                    
                //Time travel
                case "Digit0":
                    vid.currentTime = 0.0*vid.duration;
                    break;
                case "Digit1":
                    vid.currentTime = 0.1*vid.duration;
                    break;
                case "Digit2":
                    vid.currentTime = 0.2*vid.duration;
                    break;
                case "Digit3":
                    vid.currentTime = 0.3*vid.duration;
                    break;
                case "Digit4":
                    vid.currentTime = 0.4*vid.duration;
                    break;
                case "Digit5":
                    vid.currentTime = 0.5*vid.duration;
                    break;
                case "Digit6":
                    vid.currentTime = 0.6*vid.duration;
                    break;
                case "Digit7":
                    vid.currentTime = 0.7*vid.duration;
                    break;
                case "Digit8":
                    vid.currentTime = 0.8*vid.duration;
                    break;
                case "Digit9":
                    vid.currentTime = 0.9*vid.duration;
                    break;

                    
                //Speed
                case "Minus":
                    speed = speed - 0.25;
                    if (speed < 0.25) {
                        speed = 0.25;
                    }
                    vid.playbackRate = speed;
                    break;

                case "Equal": //The plus key is shiftEqual.  This avoids the shift.  May need to be changed in the future
                    speed = speed + 0.25;
                    if (speed > 5) {
                        speed = 5;
                    }
                    vid.playbackRate = speed;
                    break;


                //Play/pause
                case "KeyK":
                    if (vid.paused){vid.play();} else {vid.pause();}
                    break;

                    
                //Open source in new tab
                case "KeyN":
                    window.open(vid.currentSrc);
                    break;
                    
                    
            }//Switch
        }//logkey function


        //time cropping
        function checkTime() {
            if (vid.currentTime > endTime) {
                //alert("Replay");
                vid.currentTime = startTime;
            }//If past end time
            if (vid.currentTime < startTime) {
                vid.currentTime = startTime;
            }//If before start time
        }//checkTime function

    }//hotkeys if
}//if vid exists
