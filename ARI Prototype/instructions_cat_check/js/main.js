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
                text: "<mark name='doTrick trickName=alive_7'/>Touch the category from the top row that corresponds to the image at the bottom of the screen. If you select correctly, <mark name='doTrick trickName=alive_1'/>you will hear a ding sound, and the bottom image will change. If you get it wrong, you can try again until you categorise it correctly. The goal is to complete the task both quickly and accurately.", 
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

    default_web.firstFrase();

    var video = document.getElementById('video');
    video.setAttribute('src', 'Intro.mp4'); 
    video.play();

  //   $("#back").on("touchend", function(){
  //  parent.switchConfig("activity_choice_slideshow");
  //   // window.open("../post_ratings_cat_check/index.html", "_self");
  // });

    
  // Add event listeners
    $("#next").on("touchend", function(){
   // parent.switchConfig("memory_game");
    window.open("../customisation_category/index.html", "_self");
  });
    $("#back").on("touchend", function(){
   parent.switchConfig("activity_choice_slideshow");
    // window.open("../customisation_category/index.html", "_self");
  });
});

