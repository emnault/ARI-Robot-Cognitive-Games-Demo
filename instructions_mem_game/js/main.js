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
                text: "<mark name='doTrick trickName=nod'/>Hello, I'm ARI! <mark name='doTrick trickName=alive_1'/> play a game of pairs with twenty red playing cards, <mark name='doTrick trickName=alive_5'/>Ace through ten. <mark name='doTrick trickName=alive_7'/>We will take turns to turn over any two cards. <mark name='doTrick trickName=alive_3'/>If both are a pair, for example, both are number fives, <mark name='doTrick trickName=alive_5'/>then that same player has another turn. <mark name='doTrick trickName=alive_4'/>If the cards are not a pair, then the other player takes a turn. <mark name='doTrick trickName=nod'/> We will continue to do this until the<mark name='doTrick trickName=alive_2'/> whole deck has been turned over. <mark name='doTrick trickName=alive_5'/>Try to remember where cards are. You should improve with practice. <mark name='doTrick trickName=show_left'/> The winner is the player with the most cards at the end of the game!", 
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
  $("#memory_game").on("touchend", function(){
   // parent.switchConfig("memory_game");
   window.open("../pre_ratings_mem_game/index.html", "_self");
  });
});

