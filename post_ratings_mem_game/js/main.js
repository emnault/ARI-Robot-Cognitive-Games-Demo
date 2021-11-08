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
    firstFrase() {
        let goal_id = '';                       
        // Respond
        this.tts_action.sendGoal({
            rawtext: {
                text: "I am going to shuffle a deck of twenty red playing cards, Ace through ten, and place the cards face on my tablet in four rows. <mark name='doTrick trickName=alive_1'/>  We will then take turns to turn over any two of these cards. We will flip them back over in exactly the same place we took them from, unless they are a pair. For example, both are queens or number fives, in which case they are placed next to the person that chose them. If a person finds a pair, then that same player has another turn. If the cards are not a pair, then the other player takes a turn. We will continue to do this until the whole deck has been turned over. <mark name='doTrick trickName=nod'/>. Try to remember where cards are. You should improve with practice. The winner is the player with the most cards at the end of the game. ",
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
  // Add event listeners
  $("#next").on("touchend", function(){
   // parent.switchConfig("memory_game");
   window.open("../playing_cards_mem_game/index.html", "_self");
  }); //////^^^TO BECOME FEEDBACK PAGE^^^^
  $("#back").on("touchend", function(){
   // parent.switchConfig("memory_game");
   window.open("../playing_cards_mem_game/index.html", "_self");
  });
});

