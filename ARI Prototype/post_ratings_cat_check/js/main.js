import * as RRLIB from '../../js/modules/rrlib.js'
// import { ariNumPairs } from '../../playing_cards_mem_game/js/main.js'



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
    firstFrase() {
        let goal_id = '';                       
        // Respond
        this.tts_action.sendGoal({
            rawtext: {
                text: "<mark name='doTrick trickName=show_right'/>Use the following rating scale to rate how well you did.", 
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });
    }
    secondFrase() {
        let goal_id = '';                       
        // Respond
        this.tts_action.sendGoal({
            rawtext: {
                text: "<mark name='doTrick trickName=alive_2'/> Would you like feedback on this activity?", 
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
  default_web.firstFrase();

  // var uppercaseModule = require('../../playing_cards_mem_game/js/main.js')
  // var {ariNumPairs, userNumPairs} = require('../../playing_cards_mem_game/js/main.js')

  // console.log("Getting ari score");
  // var stringARIScore = window.ariNumPairs.toString();
  // alert (window.ariNumPairs);
  // window.onload = alert(localStorage.getItem("storageName"));

  // alert(localStorage.getItem('ariNumPairs'));

  // alert(localStorage.getItem('userNumPairs'));


  // console.log("Alert - ari score thrown");

  
  // document.getElementById("user-score").innerHTML = "You: " + localStorage.getItem('userNumPairs') + " pairs.";
  // document.getElementById("ari-score").innerHTML = "ARI: " + localStorage.getItem('ariNumPairs') + " pairs.";


  $("#back").on("touchend", function(){
   // parent.switchConfig("memory_game");
   window.open("../reward_fireworks/index.html", "_self"); //to activity customisation
  });
  $("#next").on("touchend", function(){
  //default_web.secondFrase();
   window.open("../feedback_choice/index.html", "_self");
   // window.open("../playing_cards_mem_game/index.html", "_self"); //goes to activity feedback choice
  });
});

