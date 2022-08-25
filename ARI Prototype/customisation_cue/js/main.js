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
  //   showModal() {
  //   	console.log ("IN SHOW MODAL");
		// overlay.show();
		// modal.fadeIn("slow");
  //   }
  //   hideModal() {
		// overlay.hide();
		// modal.hide();
  //   }
  //   resetModal() {
  //       localStorage.clear();
		// hideModal();
  //   }

    async firstFrase() {
        let goal_id = '';                       
        // Respond
        this.tts_action.sendGoal({
            rawtext: {
                text: "<mark name='doTrick trickName=alive_7'/> The other part you can customise for the category checker is how you would like the target object to be displayed. <mark name='doTrick trickName=alive_2'/> For the sake of this demonstration, we will use the image only option. Press next to continue.", 
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
window.ariNumPairs = 0;
window.userNumPairs = 0;
// var overlay = document.getElementsByClassName("modal-overlay");
// var modal = document.getElementsByClassName("modal");




$(document).ready(function() {
//  shapes_demo.init();

    default_web.firstFrase();

    
  // Add event listeners
    $("#back").on("touchend", function(){
        // parent.switchConfig("post_activity");
        window.open("../customisation_category/index.html", "_self");
  });
    $("#next").on("touchend", function(){
        window.open("../pre_ratings_cat_check/index.html", "_self");
        // console.log("SHOWING MODAL");
  //       overlay.show();
		// modal.fadeIn("slow");
        // default_web.showModal();
        // document.getElementsByClassName("modal-overlay").style.display = "inline";
        // document.getElementsByClassName("modal").style.display = "inline";
  });
  //   $("#next").on("touchend", function(){
  //       default_web.secondFrase(); //Phrase for next slide
  //       default_web.hideModal();
  // });
});


// (function(){

// 	var Memory = {

// 		//this.ids = [1,2,3,4,5,6,7,8,9,10,11,22,33,44,55,66,77,88,99,110]; 


// 		init: function(){
// 			this.$modal = $(".modal");
// 			this.$overlay = $(".modal-overlay");
// 		},

// 		showModal: function(){
// 			this.$overlay.show();
// 			this.$modal.fadeIn("slow");
// 		},

// 		hideModal: function(){
// 			this.$overlay.hide();
// 			this.$modal.hide();
// 		},

// 		reset: function(){
// 			localStorage.clear();
// 			this.hideModal();
// 			this.shuffleCards(this.cardsArray);
// 			this.setup();
// 			this.$game.show("slow");
// 		}
// 	};

// 	Memory.init();
// })();

