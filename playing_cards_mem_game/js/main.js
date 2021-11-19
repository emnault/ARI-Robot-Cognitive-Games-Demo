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
                text: "Card Matching Game",
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
window.ariNumPairs = 0;
window.userNumPairs = 0;

// window.onload = function() {
//     var getInput = prompt("Hey type something here: ");
//     localStorage.setItem("storageName",getInput);
// }






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
	var ariMatch = 0; //add until reach threshold, where ARI will pick a correct pair
	// exports.uppercase = (str) => str.toUpperCase()


	// exports.ariNumPairs = 0;
	// exports.userNumPairs = 0;

	// var ariNumPairs = 0;
	// var userNumPairs = 0;
	// export { ariNumPairs };
	
	var Memory = {

		//this.ids = [1,2,3,4,5,6,7,8,9,10,11,22,33,44,55,66,77,88,99,110]; 


		init: function(cardsHeart,cardsDiamond){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cardsHeart, cardsDiamond);
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
					// console.log("Card 1: ");
					// var str1 = JSON.stringify(parseInt($(this).attr("data-id")));
					// console.log(str1);

					ids.splice(ids.indexOf(parseInt($(this).attr("data-id"))), 1);
					// console.log("ID Array after splicing card 1: ");
					// var str2 = JSON.stringify(ids);
					// console.log(str2);

					// console.log("Card 2: ");
					// var str3 = JSON.stringify(_.guess);
					// console.log(str3);


					ids.splice(ids.indexOf(_.guess), 1);
					
					console.log("ID Array after splicing card 2: ");
					var str4 = JSON.stringify(ids);
					console.log(str4);

					//update user's score
					window.userNumPairs++;

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

					if(ariMatch < 3){
						_.ariIncorrectPair();
					}
					else{
						_.ariCorrectPair();

					}

					
				}
				//If all cards have been matched, execute win (show trophy page)
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		ariIncorrectPair: function(){

			var _ = Memory;
			var card1;
			var picked1;
			var card2;
			var picked2;

			//If there's only one pair left, have ARI choose that pair (by executing correct pair method)
			if(ids.length == 2){
				console.log("FINAL PAIR - EXECUTING");
				_.ariCorrectPair();
				return;
			}

			//Every 3 tries, selects a correct pair (use counter & reset to 0 when executes correct match)

			//Select random index given len of array
			var randIdx1 = _.getRandomIdx(ids.length);
			var randIdx2 = _.getRandomIdx(ids.length);
			
			//use loop to ensure two cards are not a match
			while((ids[randIdx1] == ids[randIdx2]*11) || (ids[randIdx1] == ids[randIdx2]/11) || (ids[randIdx1] == ids[randIdx2])){
				randIdx2 = _.getRandomIdx(ids.length);
			}

			//Make string that looks like: '[data-id="2"]'
			let startStr = '[data-id="';
			let endStr = '"]';
			var card1ToStr = ids[randIdx1].toString();
			var card2ToStr = ids[randIdx2].toString();

			var cardOneStr = startStr.concat(card1ToStr, endStr);
			var cardTwoStr = startStr.concat(card2ToStr, endStr);

			// var card1Str = '[data-id="' + ids[randIdx1].toString(); + '"]';
			// var card2Str = '[data-id="' + ids[randIdx2].toString(); + '"]';

			console.log("card1Str: ");
			console.log(cardOneStr);
			console.log("card2Str: ");
			console.log(cardTwoStr);



			//When card is match
			// console.log("SLEEPING1");
			_.sleep(1000).then(() => { 

				// console.log("FINISHED SLEEPING1!");
				card1 = $(cardOneStr);
				picked1 = card1.find(".inside").addClass("picked");
				// console.log("CARD 1 flipped");

				_.sleep(1000).then(() => { 

					// console.log("FINISHED SLEEPING2!");
					card2 = $(cardTwoStr);
					picked2 = card2.find(".inside").addClass("picked");
					// console.log("CARD 2 flipped");

					// picked1.addClass("matched");
					// picked2.addClass("matched");
					// console.log("MATCHED");
					_.sleep(1000).then(() => { 
						picked1.removeClass("picked");
						picked2.removeClass("picked");
						console.log("REMOVED PICK");
					});

				});

			});

			ariMatch ++;
			
		},

		ariCorrectPair: function(){
			var _ = Memory;
			var card1;
			var picked1;
			var card2;
			var picked2;
			var loop = true;

			//ARI will select a correct pair, so update score:
			window.ariNumPairs++;

			//Every 3 tries, selects a correct pair (use counter & reset to 0 when executes correct match)

			//Select random index given len of array
			var randIdx1 = _.getRandomIdx(ids.length);
			var randIdx2 = _.getRandomIdx(ids.length);
			
			//use loop to ensure two cards are not a match
			while(loop){
				if((ids[randIdx1] == ids[randIdx2]*11) || (ids[randIdx1] == ids[randIdx2]/11)){
					loop = false;
				}
				else{
					randIdx2 = _.getRandomIdx(ids.length);
				}
				
			}

			//Make string that looks like: '[data-id="2"]'
			let startStr = '[data-id="';
			let endStr = '"]';
			var card1ToStr = ids[randIdx1].toString();
			var card2ToStr = ids[randIdx2].toString();

			var cardOneStr = startStr.concat(card1ToStr, endStr);
			var cardTwoStr = startStr.concat(card2ToStr, endStr);

			// var card1Str = '[data-id="' + ids[randIdx1].toString(); + '"]';
			// var card2Str = '[data-id="' + ids[randIdx2].toString(); + '"]';

			console.log("card1Str: ");
			console.log(cardOneStr);
			console.log("card2Str: ");
			console.log(cardTwoStr);



			//When card is match
			console.log("SLEEPING1");
			_.sleep(1000).then(() => { 

				console.log("FINISHED SLEEPING1!");
				card1 = $(cardOneStr);
				picked1 = card1.find(".inside").addClass("picked");
				console.log("CARD 1 flipped");

				_.sleep(1000).then(() => { 

					console.log("FINISHED SLEEPING2!");
					card2 = $(cardTwoStr);
					picked2 = card2.find(".inside").addClass("picked");
					console.log("CARD 2 flipped");

					picked1.addClass("matched");
					picked2.addClass("matched");
					console.log("MATCHED");

					ids.splice(ids.indexOf(parseInt(card1.attr("data-id"))), 1);
					ids.splice(ids.indexOf(parseInt(card2.attr("data-id"))), 1);
					
					console.log("ID Array after splicing: ");
					var str4 = JSON.stringify(ids);
					console.log(str4);


					//ARI got a pair correct, so gets to try again, but will get it incorrect this time
					_.sleep(1000).then(() => { 

						//Just added this if/else, need to check if it works
						if(ids.length == 0){
							_.win();
						}
						else{
							ariMatch = 0;
							_.ariIncorrectPair();
						}
						
					});
				});

			});

		},

		//Select random index given len of array
		getRandomIdx: function (max) {
			return Math.floor(Math.random() * max);
		},

		sleep: function(ms) {
			return new Promise(resolve => setTimeout(resolve, ms));
		},

		win: function(){
			this.paused = true;
			setTimeout(function(){
				console.log("ARI's Score: ");
				var strARI = JSON.stringify(window.ariNumPairs);
				console.log(strARI);
				console.log("User's Score: ");
				var strUser = JSON.stringify(window.userNumPairs);
				console.log(strUser);

				localStorage.clear();
				localStorage.setItem('ariNumPairs', ariNumPairs);
				localStorage.setItem('userNumPairs', userNumPairs);

                default_web.secondFrase();
				// Memory.showModal();
				// Memory.$game.fadeOut();
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
