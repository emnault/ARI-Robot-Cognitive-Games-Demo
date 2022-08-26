import * as RRLIB from '../../js/modules/rrlib.js'


// RRLIB speech for the games

class DefaultWeb {
    constructor() {
        this.ros = new RRLIB.Ros({
            host: 'http://' + window.location.hostname
        });
        this.tts_action = new RRLIB.ActionClient({
            ros: this.ros,
            name: 'tts'
        });
    }

    init() {
        let param = new RRLIB.Param({
            ros: this.ros,
            name: 'robot_info'
        });
    }
    async firstFrase() {
        let goal_id = '';                       
        // Respond
        this.tts_action.sendGoal({
            rawtext: {
                text: "<mark name='doTrick trickName=wave'/> Hello Judy and welcome back! Let’s start our cognitive training session.", 
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });

        return;
    }

    secondFrase() {
        let goal_id = '';                       
        // Respond
        this.tts_action.sendGoal({
            rawtext: {
                // text: "<mark name='doTrick trickName=rh_point_at_self'/> From this menu you can select what activity you'd like to do.", 
                text: "<mark name='doTrick trickName=alive_7'/> This is the home screen, which you can access throughout the session. Press the home button when you're ready to continue.", 
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });

        return;
    }
    pressNext() {
        let goal_id = '';                       
        // Respond
        this.tts_action.sendGoal({
            rawtext: {
                // text: "<mark name='doTrick trickName=rh_point_at_self'/> From this menu you can select what activity you'd like to do.", 
                text: "<mark name='doTrick trickName=alive_1'/> Press next to continue.", 
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });

        return;
    }

    
}

let default_web = new DefaultWeb();

$(document).ready(function() {
//  shapes_demo.init();

    var video = document.getElementById('video');
    video.setAttribute('src', 'Ski_Slalom_Start.mp4'); 
    default_web.firstFrase();

    function delay(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    }


    async function playVideo(){
        await delay(7000);
        //wait for ARI to finish speaking before playing video
        
        video.play();
        await delay(7000);
        document.getElementById("next").style.background='#99ff99';
        default_web.pressNext();
    }
    //Play ski video
    playVideo();



    
  // Add event listeners
    $("#next").on("touchend", function(){
        default_web.secondFrase();
        parent.switchConfig("home_page");
    //window.open("../activity_choice_slideshow", "_self");
  });
});

