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
                text: "<mark name='doTrick trickName=alive_5'/> Wonderful job Judy, this is our longest session in a while. Press finish to complete today's session.", 
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });

        return;
    }
     async secondFrase() {
        let goal_id = '';                       
        // Respond
        this.tts_action.sendGoal({
            rawtext: {
                text: "<mark name='doTrick trickName=alive_7'/> What would you like to do next?", 
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

    
  // Add event listeners
    $("#back").on("touchend", function(){
        default_web.secondFrase();
        parent.switchConfig("post_activity");
    // window.open("../post_ratings_cat_check/index.html", "_self");
  });

    $("#next").on("touchend", function(){
        // default_web.secondFrase();
        // parent.switchConfig("post_activity");
    window.open("../prototype_conclusion/index.html", "_self");
  });
});

