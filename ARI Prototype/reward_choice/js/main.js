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
                text: "<mark name='doTrick trickName=nod'/> This is where you can select the rewards to be used throughout the session. <mark name='doTrick trickName=alive_3'/>For today we will use the fireworks and bubbly. Press next to continue.", 
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
                text: "<mark name='doTrick trickName=rh_point_at_self'/> From this menu you can select what activity you'd like to do. <mark name='doTrick trickName=nod'/>For the sake of this demonstration, we will do the category checker activity.", 
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
    $("#next").on("touchend", function(){
        default_web.secondFrase();
        parent.switchConfig("activity_choice_slideshow");
    //window.open("../activity_choice_slideshow", "_self");
  });
    $("#back").on("touchend", function(){
        parent.switchConfig("home_page");
    //window.open("../activity_choice_slideshow", "_self");
  });
});

