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
                text: "Use the following rating scale to rate how well you did.", 
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

  console.log("Getting ari score");
  // var stringARIScore = window.ariNumPairs.toString();
  // alert (window.ariNumPairs);
  // window.onload = alert(localStorage.getItem("storageName"));

  alert(localStorage.getItem('ariNumPairs'));

  alert(localStorage.getItem('userNumPairs'));


  console.log("Alert - ari score thrown");

  



  // Add event listeners
  $("#next").on("touchend", function(){
   // parent.switchConfig("memory_game");
   //window.open("../playing_cards_mem_game/index.html", "_self");


   /*
----------------- POP-UP FUNCTION ------------------
  */
   (function(){  
 

    var Memory = {


      init: function(){
        this.$modal = $(".modal");
        this.$overlay = $(".modal-overlay");
        this.win();
      },


      win: function(){
        setTimeout(function(){
          //default_web.secondFrase();
          Memory.showModal();
          //Memory.$game.fadeOut();
        }, 1000);
      },

      showModal: function(){
        console.log("IN SHOW MODAL");
        this.$overlay.show();
        this.$modal.fadeIn("slow");
      },

      hideModal: function(){
        this.$overlay.hide();
        this.$modal.hide();
      }

    }; //close of Memory variable

    Memory.init();

  })();


  }); 

  $("#back").on("touchend", function(){
   // parent.switchConfig("memory_game");
   window.open("../playing_cards_mem_game/index.html", "_self");
  });
});

