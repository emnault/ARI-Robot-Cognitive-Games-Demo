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
                text: "<mark name='doTrick trickName=nod'/> Great job today! <mark name='doTrick trickName=close_hands_together'/>I’m looking forward to seeing you next time, where we’ll focus on memory activities.", 
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
    video.setAttribute('src', 'Ski_Slalom_Conclusion.mp4'); 
    default_web.firstFrase();

    function delay(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    }


    async function playVideo(){
        await delay(7000);
        //wait for ARI to finish speaking before playing video
        
        video.play();
    }
    //Play ski video
    playVideo();



    
  // Add event listeners
  //   $("#next").on("touchend", function(){
  //  // parent.switchConfig("memory_game");
  //   window.open("../pre_ratings_mem_game/index.html", "_self");
  // });
});

