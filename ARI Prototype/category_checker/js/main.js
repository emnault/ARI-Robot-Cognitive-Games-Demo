import * as RRLIB from '../../js/modules/rrlib.js'
// import interact from 'interactjs'
// import fs from 'fs';

// const fs = require('fs');

// fs.appendFile('message.txt', 'data to append', function (err) {
//   if (err) throw err;
//   console.log('Saved!');
// });


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
                text: "<mark name='doTrick trickName=nod'/>Let's start playing!", 
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });
    }
    keepGoing() {
        let goal_id = '';                       
        // Respond
        this.tts_action.sendGoal({
            rawtext: {
                text: "Keep going!", 
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });
    }
    greatWork() {
        let goal_id = '';                       
        // Respond
        this.tts_action.sendGoal({
            rawtext: {
                text: "Keep going!", 
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });
    }
    youCanDoIt() {
        let goal_id = '';                       
        // Respond
        this.tts_action.sendGoal({
            rawtext: {
                text: "You can do it!", 
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });
    }
    almostThere() {
        let goal_id = '';                       
        // Respond
        this.tts_action.sendGoal({
            rawtext: {
                text: "Almost there!", 
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });
    }

    finish() {
        let goal_id = '';                       
        // Respond
        this.tts_action.sendGoal({
            rawtext: {
                text: "All done!", 
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });
    }
    // ariFeedback() {
    //     let goal_id = '';     
    //     const feedback = ["Keep going!", "Great work!", "You can do it!", "Almost there!"];

    //     //randomise feedback given
    //     const randomElement = feedback[Math.floor(Math.random() * array.length)];
    //     const speech = feedback[randomElement];
    //     console.log("Feedback: " + feedback[randomElement]);
    //     // Respond
    //     this.tts_action.sendGoal({
    //         rawtext: {
    //             text: speech,
    //             lang_id: "en_GB"
    //         }
    //     }, (response) => {
    //         goal_id = response.goal_id;
    //     });
    // }
}

let default_web = new DefaultWeb();
let moving = null;
var shuffle;
var randFeed;
var end;


$(document).ready(function() {

    var cueIdx = 0;
    var startTime = new Date();
    var endTime;
    var audio = new Audio('correct.mp3');
    audio.preload="auto";
    console.log("AUDIO PRELOAD: " + audio.preload);

    var cues_pre_shuffle = [
        {
            img: "Cues/Highland_Cow.jpg",
            id: "Animals",
        },
        
        {
            img: "Cues/Quiche.jpg",
            id: "Food",
        },

        {
            img: "Cues/Horse.png",
            id: "Animals",
        },

        {
            img: "Cues/USA.png",
            id: "Countries",
        },

        {
            img: "Cues/Sushi.jpeg",
            id: "Food",
        },

        {
            img: "Cues/Puppy.jpg",
            id: "Animals",
        },

        {
            img: "Cues/Japan.png",
            id: "Countries",
        },

        {
            img: "Cues/Burger.jpg",
            id: "Food",
        },

        {
            img: "Cues/Germany.png",
            id: "Countries",
        },

        {
            img: "Cues/Elephant.jpg",
            id: "Animals",
        },

        {
            img: "Cues/Fish.jpg",
            id: "Animals",
        },

        {
            img: "Cues/Breakfast.jpg",
            id: "Food",
        },

        {
            img: "Cues/Tiger.jpg",
            id: "Animals",
        },

        {
            img: "Cues/Cupcake.jpg",
            id: "Food",
        },

        {
            img: "Cues/France.png",
            id: "Countries",
        },

        ];
//  shapes_demo.init();
  default_web.firstFrase();
  

  shuffle = function(array){
      let currentIndex = array.length,  randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }

      return array;
  }

  //rand feedback during interaction
  randFeed = function(){
    //0 = min, 3 = max
        var idx = Math.floor(Math.random() * 4);
        if (idx == 0){
            default_web.keepGoing();
        }
        else if (idx == 1){
            default_web.greatWork();
        }
        else if (idx == 2){
            default_web.youCanDoIt();
        }
        else{ //idx = 3
            default_web.almostThere();
        }
    }

    end = function(){
      endTime = new Date();
      var timeDiff = endTime - startTime; //in ms
      // strip the ms
      timeDiff /= 1000;

      // get seconds 
      var seconds = Math.round(timeDiff);
      console.log("Elapsed Time: " + seconds + " seconds");
    }

  var cues = shuffle(cues_pre_shuffle); //Shuffle cues
  var firstImage = cues[0].img;
  console.log("First img: " + firstImage);
  document.getElementById("Cue").src=firstImage;

  //hide finish button until game is completed

  // Add event listeners
  $("#memory_game").on("touchend", function(){
   // parent.switchConfig("memory_game");
   window.open("../pre_ratings_mem_game/index.html", "_self");
  });

  $("#Animals").on("touchend", function(ev){
      ev.preventDefault(); 
        if(cues[cueIdx].id==="Animals"){
            // var audio = new Audio('correct.mp3');
            console.log("Animal AUDIO Started");
            audio.currentTime = 0;
            audio.play();
            console.log("ANIMAL AUDIO Finished");
        }
        else{
            return;
        }        
        
        cueIdx++;
        if(cueIdx==cues.length-1){
            default_web.finish();
            end();
        }
        else{
            document.getElementById("Cue").src=cues[cueIdx].img;
            document.getElementById("Cue").style.top=70 + "%";  
        }
        if( (cueIdx==5) | (cueIdx==10)){
            randFeed();
        }
  	   
  	});

    $("#Food").on("touchend", function(ev){
      ev.preventDefault(); 
        if(cues[cueIdx].id==="Food"){
            // var audio = new Audio('correct.mp3');
            console.log("FOOD AUDIO Started");
            audio.currentTime = 0;
            audio.play();
            console.log("FOOD AUDIO Finished");
        }
        else{
            return;
        }
        
        
        cueIdx++;
        if(cueIdx==cues.length-1){
            default_web.finish();
            end();
        }
        else{
            document.getElementById("Cue").src=cues[cueIdx].img;
            document.getElementById("Cue").style.top=70 + "%";  
        }
        if( (cueIdx==5) | (cueIdx==10)){
            randFeed();
        }
       
    });

    $("#Countries").on("touchend", function(ev){
      ev.preventDefault(); 
        if(cues[cueIdx].id==="Countries"){
            // var audio = new Audio('correct.mp3');
            console.log("Country AUDIO Started");
            audio.currentTime = 0;
            audio.play();
            console.log("Country AUDIO Finished");
        }
        else{
            return;
        }
        
        
        cueIdx++;
        if(cueIdx==cues.length-1){
            default_web.finish();
            end();
        }
        else{
            
            document.getElementById("Cue").src=cues[cueIdx].img;
            document.getElementById("Cue").style.top=70 + "%";  
        }
        if( (cueIdx==5) | (cueIdx==10)){
            randFeed();
        }
       
    });

});
