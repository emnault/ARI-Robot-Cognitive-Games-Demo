import * as RRLIB from '../../js/modules/rrlib.js'
// import interact from 'interactjs'


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
}

let default_web = new DefaultWeb();
let moving = null;


$(document).ready(function() {

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
//  shapes_demo.init();
  default_web.firstFrase();
  // Add event listeners
  $("#memory_game").on("touchend", function(){
   // parent.switchConfig("memory_game");
   window.open("../pre_ratings_mem_game/index.html", "_self");
  });
  $("#Cue").on({
  	touchstart: function(ev){
  	console.log("----DRAG STARTED----");
  	moving = ev.target;

    moving.style.height = moving.clientHeight;
    moving.style.width = moving.clientWidth;
    moving.style.position = 'fixed';
	// ev.dataTransfer.setData("text", ev.target.id); 
	},
	touchmove: function(event){
    	console.log("----DRAG OVER----");
		// ev.preventDefault();
		if (moving) {
	        if (event.clientX) {
	            // mousemove
	            moving.style.left = event.clientX - moving.clientWidth/2;
	            moving.style.top = event.clientY - moving.clientHeight/2;
	        } else {
	            // touchmove - assuming a single touchpoint
	            moving.style.left = event.changedTouches[0].clientX - moving.clientWidth/2;
	            moving.style.top = event.changedTouches[0].clientY - moving.clientHeight/2;
	        }
    	}
    }


  });
  $("#Animals").on("touchend", function(ev){
	      ev.preventDefault(); 
	        // var data = ev.dataTransfer.getData("text");
	        // ev.target.appendChild(document.getElementById(data));
	        if(cues[cueIdx].id==="Animals"){
	            numCorrect++;
	            var audio = new Audio('correct.mp3');
	            audio.play();
	        }
	        console.log("Cues: " + cues.length);
	        
	        
	        cueIdx++;
	        if(cueIdx==cues.length){
	            end();
	            console.log("Score: " + numCorrect);
	        }
	        else{
	            document.getElementById("Cue").src=cues[cueIdx].img;
	            document.getElementById("Cue").style.top=70 + "%";  
	        }
	        
	    

      
  	   
  	});
    });


/*
----------------- GAME FUNCTION ------------------
*/
// (function(){
//     var cueIdx = 0;
//     var numCorrect = 0;
//     var startTime = new Date();
//     var endTime;

//     var cues = [
//         {
//             img: "Cues/Highland_Cow.jpg",
//             id: "Animals",
//         },
        
//         {
//             img: "Cues/Quiche.jpg",
//             id: "Food",
//         },

//         {
//             img: "Cues/Horse.png",
//             id: "Animals",
//         },

//         {
//             img: "Cues/USA.png",
//             id: "Countries",
//         },

//         {
//             img: "Cues/Sushi.jpeg",
//             id: "Food",
//         },

//         {
//             img: "Cues/Puppy.jpg",
//             id: "Animals",
//         },

//         {
//             img: "Cues/Japan.png",
//             id: "Countries",
//         },

//         {
//             img: "Cues/Burger.jpg",
//             id: "Food",
//         },

//         {
//             img: "Cues/Germany.png",
//             id: "Countries",
//         },

//         {
//             img: "Cues/Elephant.jpg",
//             id: "Animals",
//         },

//         {
//             img: "Cues/Fish.jpg",
//             id: "Animals",
//         },

//         {
//             img: "Cues/Breakfast.jpg",
//             id: "Food",
//         },

//         {
//             img: "Cues/Tiger.jpg",
//             id: "Animals",
//         },

//         {
//             img: "Cues/Cupcake.jpg",
//             id: "Food",
//         },

//         {
//             img: "Cues/France.png",
//             id: "Countries",
//         },

//         ];


//     // document.addEventListener("dragstart", (event) => {
//     // 	console.log("----DRAG STARTED----");
//     // 	event.dataTransfer.setData("text", ev.target.id);

//     // });

//   	function end() {
//       endTime = new Date();
//       var timeDiff = endTime - startTime; //in ms
//       // strip the ms
//       timeDiff /= 1000;

//       // get seconds 
//       var seconds = Math.round(timeDiff);
//       console.log("Elapsed Time: " + seconds + " seconds");
//     }


//     function allowDrop(ev) {
//         ev.preventDefault();
//     }
 
//     function dragStart(ev) {

//         //ev.dataTransfer.setData("text", ev.target.id);
//     }

//     function drag(ev) {
//         const cue = document.getElementById('Cue');
//         cue.style.top = '150px';
//         cue.style.left = '150px';
//         console.log("CUE MOVED");
//         //ev.dataTransfer.setData("text", ev.target.id);
//     }

//     // function touchend(ev) {
//     // 	ev.preventDefault();
//     //     // var data = ev.dataTransfer.getData("text");
//     //     // ev.target.appendChild(document.getElementById(data));
//     //     if(cues[cueIdx].id==ev.target.id){

//     //         numCorrect++;
//     //         var audio = new Audio('correct.mp3');
//     //         audio.play();
//     //     }
//     //     console.log(cues.length);
        
        
//     //     cueIdx++;
//     //     if(cueIdx==cues.length){
//     //         end();
//     //         console.log("Score: " + numCorrect);
//     //         var video = document.getElementById('video');
//     //         video.setAttribute('src', 'Fireworks.mp4');
//     //         video.setAttribute('top', '50%');
//     //         video.setAttribute('left', '50%');
//     //         video.setAttribute('width', '800px');
//     //         video.setAttribute('height', 'auto');
//     //         video.play();
//     //     }
//     //     else{
//     //         document.getElementById("Cue").src=cues[cueIdx].img;
//     //         document.getElementById("Cue").style.top=70 + "%";  
//     //     }
//     // }
 
//     function dragDrop(ev) {
//         ev.preventDefault();
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

//     })();


//DRAGGING//



//     interact('.draggable')
//       .draggable({
//         // enable inertial throwing
//         inertia: true,
//         // keep the element within the area of it's parent
//         modifiers: [
//           interact.modifiers.restrictRect({
//             restriction: 'parent',
//             endOnly: true
//           })
//         ],
//         // enable autoScroll
//         autoScroll: true,

//         listeners: {
//           // call this function on every dragmove event
//           move: dragMoveListener,

//           // call this function on every dragend event
//           end (event) {
//             var textEl = event.target.querySelector('p')

//             textEl && (textEl.textContent =
//               'moved a distance of ' +
//               (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
//                          Math.pow(event.pageY - event.y0, 2) | 0))
//                 .toFixed(2) + 'px')
//           }
//         }
//       })

//     function dragMoveListener (event) {
//       var target = event.target
//       // keep the dragged position in the data-x/data-y attributes
//       var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
//       var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

//       // translate the element
//       target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

//       // update the posiion attributes
//       target.setAttribute('data-x', x)
//       target.setAttribute('data-y', y)
//     }

//     // this function is used later in the resizing and gesture demos
//     window.dragMoveListener = dragMoveListener


// //DRAG AND DROP//


// interact('.horizontal-flex-container').dropzone({
//   // only accept elements matching this CSS selector
//   accept: '#Animals',
//   // Require a 75% element overlap for a drop to be possible
//   overlap: 0.75,

//   // listen for drop related events:

//   ondropactivate: function (event) {
//     // add active dropzone feedback
//     event.target.classList.add('drop-active')
//   },
//   ondragenter: function (event) {
//     var draggableElement = event.relatedTarget
//     var dropzoneElement = event.target

//     // feedback the possibility of a drop
//     dropzoneElement.classList.add('drop-target')
//     draggableElement.classList.add('can-drop')
//     draggableElement.textContent = 'Dragged in'
//   },
//   ondragleave: function (event) {
//     // remove the drop feedback style
//     event.target.classList.remove('drop-target')
//     event.relatedTarget.classList.remove('can-drop')
//     event.relatedTarget.textContent = 'Dragged out'
//   },
//   ondrop: function (event) {
//     event.relatedTarget.textContent = 'Dropped'
//   },
//   ondropdeactivate: function (event) {
//     // remove active dropzone feedback
//     event.target.classList.remove('drop-active')
//     event.target.classList.remove('drop-target')
//   }
// })

// interact('.drag-drop')
//   .draggable({
//     inertia: true,
//     modifiers: [
//       interact.modifiers.restrictRect({
//         restriction: 'parent',
//         endOnly: true
//       })
//     ],
//     autoScroll: true,
//     // dragMoveListener from the dragging demo above
//     listeners: { move: dragMoveListener }
//   })
