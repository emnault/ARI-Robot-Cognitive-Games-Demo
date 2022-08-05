import * as RRLIB from '../../js/modules/rrlib.js'

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
                text: "<mark name='doTrick trickName=nod'/>Let's start playing! <mark name='doTrick trickName=alive_1'/>  <mark name='doTrick trickName=show_left'/>  end of the game!", 
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });
    }
}

let default_web = new DefaultWeb();
let moving = null;


$(document).ready(function() {
//  shapes_demo.init();
  default_web.firstFrase();
  // Add event listeners
  $("#memory_game").on("touchend", function(){
   // parent.switchConfig("memory_game");
   window.open("../pre_ratings_mem_game/index.html", "_self");
  });
 //  $("#Cue").on({
 //  	touchstart: function(ev){
 //  	console.log("----DRAG STARTED----");
 //  	moving = ev.target;

 //    moving.style.height = moving.clientHeight;
 //    moving.style.width = moving.clientWidth;
 //    moving.style.position = 'fixed';
	// // ev.dataTransfer.setData("text", ev.target.id); 
	// },
	// touchmove: function(event){
 //    	console.log("----DRAG OVER----");
	// 	// ev.preventDefault();
	// 	if (moving) {
	//         if (event.clientX) {
	//             // mousemove
	//             moving.style.left = event.clientX - moving.clientWidth/2;
	//             moving.style.top = event.clientY - moving.clientHeight/2;
	//         } else {
	//             // touchmove - assuming a single touchpoint
	//             moving.style.left = event.changedTouches[0].clientX - moving.clientWidth/2;
	//             moving.style.top = event.changedTouches[0].clientY - moving.clientHeight/2;
	//         }
 //    	}
 //    }


 //  });
 //  $("#Animals").on({
	//   	touchmove: function(event){
	//     	console.log("----DRAG OVER----");
	// 		// ev.preventDefault();
	// 		if (moving) {
	// 	        if (event.clientX) {
	// 	            // mousemove
	// 	            moving.style.left = event.clientX - moving.clientWidth/2;
	// 	            moving.style.top = event.clientY - moving.clientHeight/2;
	// 	        } else {
	// 	            // touchmove - assuming a single touchpoint
	// 	            moving.style.left = event.changedTouches[0].clientX - moving.clientWidth/2;
	// 	            moving.style.top = event.changedTouches[0].clientY - moving.clientHeight/2;
	// 	        }
	//     	}
	//     }, 
	//     touchend: function(ev){
	//       ev.preventDefault();
	//         // var data = ev.dataTransfer.getData("text");
	//         // ev.target.appendChild(document.getElementById(data));
	//         if(cues[cueIdx].id==ev.target.id){

	//             numCorrect++;
	//             var audio = new Audio('correct.mp3');
	//             audio.play();
	//         }
	//         console.log(cues.length);
	        
	        
	//         cueIdx++;
	//         if(cueIdx==cues.length){
	//             end();
	//             console.log("Score: " + numCorrect);
	//             var video = document.getElementById('video');
	//             video.setAttribute('src', 'Fireworks.mp4');
	//             video.setAttribute('top', '50%');
	//             video.setAttribute('left', '50%');
	//             video.setAttribute('width', '800px');
	//             video.setAttribute('height', 'auto');
	//             video.play();
	//         }
	//         else{
	//             document.getElementById("Cue").src=cues[cueIdx].img;
	//             document.getElementById("Cue").style.top=70 + "%";  
	//         }
	        
	//     }

      
  	   
 //  	});
    });


/*
----------------- GAME FUNCTION ------------------
*/
(function(){
    
    var cueIdx = 0;
    var numCorrect = 0;
    var startTime = new Date();
    var endTime;

    var cues = [
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


    // document.addEventListener("dragstart", (event) => {
    // 	console.log("----DRAG STARTED----");
    // 	event.dataTransfer.setData("text", ev.target.id);

    // });

  	function end() {
      endTime = new Date();
      var timeDiff = endTime - startTime; //in ms
      // strip the ms
      timeDiff /= 1000;

      // get seconds 
      var seconds = Math.round(timeDiff);
      console.log("Elapsed Time: " + seconds + " seconds");
    }


    function allowDrop(ev) {
        ev.preventDefault();
    }
 
    function dragStart(ev) {
        //ev.dataTransfer.setData("text", ev.target.id);
    }

    function touchend(ev) {
    	ev.preventDefault();
        // var data = ev.dataTransfer.getData("text");
        // ev.target.appendChild(document.getElementById(data));
        if(cues[cueIdx].id==ev.target.id){

            numCorrect++;
            var audio = new Audio('correct.mp3');
            audio.play();
        }
        console.log(cues.length);
        
        
        cueIdx++;
        if(cueIdx==cues.length){
            end();
            console.log("Score: " + numCorrect);
            var video = document.getElementById('video');
            video.setAttribute('src', 'Fireworks.mp4');
            video.setAttribute('top', '50%');
            video.setAttribute('left', '50%');
            video.setAttribute('width', '800px');
            video.setAttribute('height', 'auto');
            video.play();
        }
        else{
            document.getElementById("Cue").src=cues[cueIdx].img;
            document.getElementById("Cue").style.top=70 + "%";  
        }
    }
 
    function dragDrop(ev) {
        ev.preventDefault();
        // var data = ev.dataTransfer.getData("text");
        // ev.target.appendChild(document.getElementById(data));
        if(cues[cueIdx].id==ev.target.id){

            numCorrect++;
            var audio = new Audio('correct.mp3');
            audio.play();
        }
        console.log(cues.length);
        
        
        cueIdx++;
        if(cueIdx==cues.length){
            end();
            console.log("Score: " + numCorrect);
            var video = document.getElementById('video');
            video.setAttribute('src', 'Fireworks.mp4');
            video.setAttribute('top', '50%');
            video.setAttribute('left', '50%');
            video.setAttribute('width', '800px');
            video.setAttribute('height', 'auto');
            video.play();
        }
        else{
            document.getElementById("Cue").src=cues[cueIdx].img;
            document.getElementById("Cue").style.top=70 + "%";  
        }
        
    }

    })();

