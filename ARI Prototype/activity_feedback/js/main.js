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
                text: "<mark name='doTrick trickName=open_hands_out'/>Great job!", 
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
// var time = 3;
// localStorage.setItem('time', time);

document.getElementById("time").innerHTML = "Time to complete activity: " + localStorage.getItem('time') + " seconds";
document.getElementById("errors").innerHTML = "Errors: " + localStorage.getItem('errors');
document.getElementById("pre_rating").innerHTML = "Pre-Rating Score: " + localStorage.getItem('pre_rating');
document.getElementById("post_rating").innerHTML = "Post-Rating Score: " + localStorage.getItem('post_rating');
localStorage.clear();



$(document).ready(function() {
//  shapes_demo.init();

    default_web.firstFrase();

    
  // Add event listeners
    $("#next").on("touchend", function(){
        default_web.secondFrase();
        parent.switchConfig("post_activity");
    // window.open("../post_activity/index.html", "_self");
  });
});

