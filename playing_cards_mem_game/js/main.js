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
  $("#back").on("touchend", function(){
    window.open("../pre_ratings_mem_game/index.html", "_self");
  });
  $("#next").on("touchend", function(){
    window.open("../post_ratings_mem_game/index.html", "_self");

  });
});

/*
----------------- GAME FUNCTION ------------------
*/
(function(){	
	var ids = [1,2,3,4,5,6,7,8,9,10,11,22,33,44,55,66,77,88,99,110]; 
	var Memory = {

		//this.ids = [1,2,3,4,5,6,7,8,9,10,11,22,33,44,55,66,77,88,99,110]; 


		init: function(cardsHeart,cardsDiamond){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cardsHeart, cardsDiamond);
			this.shuffleCards(this.cardsArray);

			// this.ariTurn = false; //true = ARI's turn, false = user's turn
			// this.numPairsARI = 0;
			// this.numPairsUser = 0;
			

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

			console.log("TESTING1");
			var str1 = JSON.stringify(this.$memoryCards);
			console.log(str1);
			console.log("TESTING FINISHED1");
			// this.link = this.$memoryCards.getElementById('6');
			// link.click();

		},
		// kinda messy but hey
		cardClicked: function(){
			var _ = Memory; //Why is this here...saving instance of game?
			var $card = $(this);

			console.log("TESTING");
			var str1 = JSON.stringify($(this).attr("data-id"));
			console.log("data-id: " + str1);
			var str2 = JSON.stringify($(this));
			console.log("$card: " + str2);
			console.log("TESTING FINISHED");

			//If game hasn't been won, it does not have a match, and it hasn't been picked
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				//add picked attribute to card
				$card.find(".inside").addClass("picked");
				//If guess hasn't been made yet
				if(!_.guess){
					//add id to the guess variable
					_.guess = parseInt($(this).attr("data-id")); //guess is now an int
				} 
				//If the id matches the guess's id and (the second card?) hasn't been picked yet
				else if((_.guess == parseInt($(this).attr("data-id"))*11 || _.guess == parseInt($(this).attr("data-id"))/11 )&& !$(this).hasClass("picked")){
					//the card is a match, add match attribute
					$(".picked").addClass("matched");
					
					// Remove ids from array
					// remove this id from the list of possible matches by removing the element of the array with splice
					console.log("Card 1: ");
					var str1 = JSON.stringify(parseInt($(this).attr("data-id")));
					console.log(str1);

					ids.splice(ids.indexOf(parseInt($(this).attr("data-id"))), 1);
					console.log("ID Array after splicing card 1: ");
					var str2 = JSON.stringify(ids);
					console.log(str2);

					console.log("Card 2: ");
					var str3 = JSON.stringify(_.guess);
					console.log(str3);


					ids.splice(ids.indexOf(_.guess), 1);
					
					console.log("ID Array after splicing card 2: ");
					var str4 = JSON.stringify(ids);
					console.log(str4);

					//and reset guess to null
					_.guess = null;
				} 
				//Otherwise, cards are not a match, so reset & switch player's turn
				else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);


					//$test = $('7').get(0);
					// var element = document.getElementById("7");
					
					// var two = document.querySelector('[data-id="2"]');
					// var str2 = JSON.stringify(two);
					// console.log(str2);
					// two.find(".inside").addClass("picked");

					//$('.card[data-id="1"]').get(0).click();
					var test = $('.card[data-id="1"]').get(0);
					var str2 = JSON.stringify(test);
					console.log(str2);


					test.find(".inside").addClass("picked");

					// var divs=document.getElementsByClassName("card");
					// var str2 = JSON.stringify(divs);
					// console.log(str2);
					//var card1=divs.getAttribute('7');
					// divs.data("2").find(".inside").addClass("picked");


					// this.cardsArray.find(".inside").addClass("picked");
					// var test = this.$memoryCards.find("7");
					// var str2 = JSON.stringify(test);
					// console.log(str2);
					//card1.find(".inside").addClass("picked");


					_.ariCardClicked();
				}
				//If all cards have been matched, execute win (show trophy page)
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		ariCardClicked: function(){

			// $cardPicked = $('*[data-ID="22"]');
			// $cardPicked.find(".inside").addClass("picked");


			//Every 5 tries, selects a correct pair (use counter & reset to 0 when executes correct match)


			//selects cards at random
			// const randomCard1 = ids[Math.floor(Math.random() * ids.length)];
			// const randomCard2 = ids[Math.floor(Math.random() * ids.length)];
			// while(randomCard1 == randomCard2){
			// 	randomCard2 = ids[Math.floor(Math.random() * ids.length)];
			// }


			//No match
			// if(match == false){

			// $('.manage_del_nb[data-id="1"]').get(0).click();

			// var $card1 = this.$memoryCards.getElementById('7');
			// var $card2 = this.$memoryCards.getElementById('7');

			// $card1.find(".inside").addClass("picked");
			// $card2.find(".inside").addClass("picked");



			// 	_.guess = null;
			// 	_.paused = true;
			// 	setTimeout(function(){
			// 		$(".picked").removeClass("picked");
			// 		Memory.paused = false;
			// 	}, 600);
			// }

			//Match (if counter == 3)
			
			// //If game hasn't been won, it does not have a match, and it hasn't been picked
			// if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
			// 	//add picked attribute to card
			// 	$card.find(".inside").addClass("picked");
			// 	//If guess hasn't been made yet
			// 	if(!_.guess){
			// 		//add id to the guess variable
			// 		_.guess = $(this).attr("data-id");
			// 	} 
			// 	//If the id matches the guess's id and (the second card?) hasn't been picked yet
			// 	else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
			// 		//the card is a match, add match attribute
			// 		$(".picked").addClass("matched");
					
			// 		//remove this id from the list of possible matches by removing the element of the array with splice
			// 		//ids.splice(ids.indexOf($(this).attr("data-id")), 1);

			// 		//and reset guess to null
			// 		_.guess = null;
			// 	} 
			// 	//Otherwise, cards are not a match, so reset & switch player's turn
			// 	else {
			// 		_.guess = null;
			// 		_.paused = true;
			// 		setTimeout(function(){
			// 			$(".picked").removeClass("picked");
			// 			Memory.paused = false;
			// 		}, 600);

			// 		// ariTurn = true;
			// 		// _.ariCardClicked()
			// 	}
			// 	//If all cards have been matched, execute win (show trophy page)
			// 	if($(".matched").length == $(".card").length){
			// 		_.win();
			// 	}
			// }
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
				<div class="back"><img src="../common_mem_game/images/cards.svg"/></div></div>\
				</div>';
			});
			return frag;
		}
	};

	var cardsH = [
		{
			name: "AH",
			img: "../playing_cards_mem_game/images/AH.png",
			id: 1,
		},
		
		{
			name: "2H",
			img: "../playing_cards_mem_game/images/2H.png",
			id: 2,
		},
		
		{
			name: "3H",
			img: "../playing_cards_mem_game/images/3H.png",
			id: 3,
		},
		
		{
			name: "4H",
			img: "../playing_cards_mem_game/images/4H.png",
			id: 4,
		},
		
		{
			name: "5H",
			img: "../playing_cards_mem_game/images/5H.png",
			id: 5,
		},
		
		{
			name: "6H",
			img: "../playing_cards_mem_game/images/6H.png",
			id: 6,
		},
		
		{
			name: "7H",
			img: "../playing_cards_mem_game/images/7H.png",
			id: 7,
		},
		
		{
			name: "8H",
			img: "../playing_cards_mem_game/images/8H.png",
			id: 8,
		},
		
		{
			name: "9H",
			img: "../playing_cards_mem_game/images/9H.png",
			id: 9,
		},
		
		{
			name: "10H",
			img: "../playing_cards_mem_game/images/10H.png",
			id: 10,
		}
		
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

	var cardsD = [
		{
			name: "AD",
			img: "../playing_cards_mem_game/images/AD.png",
			id: 11,
		},
		{
			name: "2D",
			img: "../playing_cards_mem_game/images/2D.png",
			id: 22,
		},
		{
			name: "3D",
			img: "../playing_cards_mem_game/images/3D.png",
			id: 33,
		},
		{
			name: "4D",
			img: "../playing_cards_mem_game/images/4D.png",
			id: 44,
		},
		{
			name: "5D",
			img: "../playing_cards_mem_game/images/5D.png",
			id: 55,
		},
		{
			name: "6D",
			img: "../playing_cards_mem_game/images/6D.png",
			id: 66,
		},
		{
			name: "7D",
			img: "../playing_cards_mem_game/images/7D.png",
			id: 77,
		},
		{
			name: "8D",
			img: "../playing_cards_mem_game/images/8D.png",
			id: 88,
		},
		{
			name: "9D",
			img: "../playing_cards_mem_game/images/9D.png",
			id: 99,
		},
		{
			name: "10D",
			img: "../playing_cards_mem_game/images/10D.png",
			id: 110,
		},
		];

    
	Memory.init(cardsH, cardsD);


})();
