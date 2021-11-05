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
                text: "This is a memory game<mark name='doTrick trickName=alive_1'/>  the goal is to find matching pairs <mark name='doTrick trickName=nod'/>. Press the cards in pairs to find the same ones!  ",
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
                text: "Great!<mark name='doTrick trickName=nod'/> you've done very well<break time='500ms'/>",
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });
    }
    thirdFrase() {
        let goal_id = '';                       
        // Respond
        this.tts_action.sendGoal({
            rawtext: {
                text: "You are great! <mark name='doTrick trickName=bow'/> I love playing with you!",
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });
    }
}

let default_web = new DefaultWeb();




// Add event listeners
$(document).ready(function() {
  default_web.firstFrase();
  $("#restart").on("touchend", function(){
    window.open("../memory_game/index.html", "_self");
  });
  $("#exit").on("touchend", function(){
    window.open("../games_menu/index.html", "_self");

  });
});

/*
----------------- GAME FUNCTION ------------------
*/
(function(){
	
	var Memory = {

		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.paused = false;
     	this.guess = null;
			this.binding();
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},
		// kinda messy but hey
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		win: function(){
			this.paused = true;
			setTimeout(function(){
                                default_web.secondFrase();
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
	   	// While there are elements in the array
	   	while (counter > 0) {
        	// Pick a random index
        	index = Math.floor(Math.random() * counter);
        	// Decrease counter by 1
        	counter--;
        	// And swap the last element with it
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="../ari_shapes_common/images/shapes_logo_memory_game.png"/></div></div>\
				</div>';
			});
			return frag;
		}
	};

	var cards = [
		{
			name: "bee",
			img: "../memory_game/images/bee.png",
			id: 1,
		},
		{
			name: "camel",
			img: "../memory_game/images/camel.png",
			id: 2
		},
		{
			name: "clownfish",
			img: "../memory_game/images/clownfish.png",
			id: 3
		},
		{
			name: "dog",
			img: "../memory_game/images/dog.png",
			id: 4
		}, 
		{
			name: "forest",
			img: "../memory_game/images/forest.png",
			id: 5
		},
		{
			name: "hot-air-balloon",
			img: "../memory_game/images/hot-air-balloon.png",
			id: 6
		},
		{
			name: "owl",
			img: "../memory_game/images/owl.png",
			id: 7
		},
		{
			name: "panda",
			img: "../memory_game/images/panda.png",
			id: 8
		},
		{
			name: "sunflower",
			img: "../memory_game/images/sunflower.png",
			id: 9
		},
		{
			name: "turtle",
			img: "../memory_game/images/turtle.png",
			id: 10
		},
		// {
		// 	name: "sublime",
		// 	img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/sublime-logo.png",
		// 	id: 11
		// },
		// {
		// 	name: "wordpress",
		// 	img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/wordpress-logo.png",
		// 	id: 12
		// },
	];
    
	Memory.init(cards);


})();
