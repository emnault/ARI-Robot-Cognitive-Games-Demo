
// Add event listeners
$(document).ready(function() {

	$(".main-container").fadeIn("slow");
	$(".memory-game-page").fadeIn("slow");
	// Go to "Help page" from PAL logo
    $("#pal_logo").on("touchend", function(){
    	window.open("../help_page/index.html", "_self");
    });

    // SCREENSAVER

    let screensaver_html = '<div class="screensaver" id="screensaver" style="display:none">' + 
    							'<img class="screensaver-logo" src="../ari_shapes_common/images/shapes_logo.png">' +
								'<div class="screensaver-text">' +
                                '<div>Touch anywhere to start</div>' +
                                '<img src="../ari_shapes_common/images/chevron_right.svg">' +
								'</div>'
							'</div>';

    $("body").prepend(screensaver_html); // some index.html have <script> as a last child
    $("body").on("touchend", function() {
    	resetScreensaver();
    });
    screensaver();
});

let sc_timeout = -1;

function screensaver() {
    // SHOW: If we don´t click any part of the screen for N sec.
    sc_timeout = window.setTimeout(function() {
        $("#screensaver").fadeIn("slow");
    }, 120000);
}

function resetScreensaver() {
	$("#screensaver").fadeOut(100);
    // Reset screen saver
    window.clearTimeout(sc_timeout);
    screensaver();
}