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
    secondFrase() {
        let goal_id = '';                       
        // Respond
        this.tts_action.sendGoal({
            rawtext: {
                text: "<mark name='doTrick trickName=alive_6'/>Use the following rating scale to predict how well you will do this task. <mark name='doTrick trickName=alive_5'/>If you'd like to skip this part, press next without selecting an option.",
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });
    }
}

let default_web = new DefaultWeb();

$(document).ready(function() {
//  shapes_demo.init();
  default_web.secondFrase();
  // Add event listeners
  // $("#next").on("touchend", function(){
  //  // parent.switchConfig("memory_game");
  //  window.open("../playing_cards_mem_game/index.html", "_self");
  // });
  $("#back").on("touchend", function(){
   // parent.switchConfig("memory_game");
   window.open("../customisation_cue/index.html", "_self");
  });
  $("#next").on("touchend", function(){
   // parent.switchConfig("memory_game");
   var preRating = document.querySelector('input[name="pre_rating"]:checked').value;
    localStorage.setItem('pre_rating', preRating);

   window.open("../category_checker/index.html", "_self");
  });
});

