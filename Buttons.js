//When these are true, the related inputfield is valid.
var rateBool = true, particlesBool = true, particleSizeBool = true;

// Maximums for the input fields.
var maxEmissionRate = 2500;
var maxParticlesNumber = 10000;
var maxParticleSize = 25;

// Selector for the alert dialog.
var alert = $('#alert');

// Selectors for the emission rate button/input
var rateButton = $('#rateButton');
var rateInput = $('#rateInput');

// Selectors for the maximum particles button/input
var particlesButton = $('#particlesButton');
var particlesInput = $('#particlesInput');

// Selectors for the particle size button/input
var particleSizeButton = $('#particleSizeButton');
var particleSizeInput = $('#particleSizeInput');

//var canvasMinInput = $('#canvasMinInput');

function playPause() {
	play = !play;
	if(play) {
		loop();
	}
	else {

	}
}

// Intro snow button should start the snow simulation and disable to snow button.
$('#startSnowButton').on('click', function() {
	toggleIntro(snow());
	rainButton.removeAttr('disabled');
	snowButton.prop('disabled','true');
});

// Intro rain button should start the rain simulation and disable to rain button.
$('#startRainButton').on('click', function() {
	toggleIntro(rain());
	snowButton.removeAttr('disabled');
	rainButton.prop('disabled','true');
});


// Stops and starts the animation.
$('#playPauseButton').on('click', function() {
	playPause();
});

//Checks if the alert dialog can be removed.
//If all of the input fields are valid, then remove the alert.
//If one of them is invalid then keep the alert.
function checkAlert() {
	if(rateBool && particlesBool && particleSizeBool) {
		alert.css('display','none');
	}
	else {
		alert.css('display','block');
	}
}

// Code involving the emission rate input.
rateButton.on('click', function() {
	var rate = rateInput.val();
	if(rate >= 1 && rate <= maxEmissionRate) {
		emissionRate = rate;
		rateBool = true;
		rateButton.removeClass('alert-danger');
	}
	else {
		rateBool = false;
		rateButton.addClass('alert-danger');
	}
	checkAlert();

});

//Bind the enter button RATE
$(function(){
  rateInput.keypress(function(e){
    if(e.which == 13) {
      	var rate = rateInput.val();
		if(rate >= 1 && rate <= maxEmissionRate) {
			emissionRate = rate;
			rateBool = true;
			rateButton.removeClass('alert-danger');
		}
		else {
			rateBool = false;
			rateButton.addClass('alert-danger');
		}
		checkAlert();
    }
  });
});

// Code involving maximum particles input.
particlesButton.on('click', function() {
	var num = particlesInput.val();
	if(num >= 0 && num <= maxParticlesNumber) {
		maxParticles = num;
		particlesBool = true;
		particlesButton.removeClass('alert-danger');
	}
	else {
		particlesBool = false;
		particlesButton.addClass('alert-danger');
	}
	checkAlert();


});

//Bind the enter button PARTICLES
$(function(){
  particlesInput.keypress(function(e){
    if(e.which == 13) {
      	var num = particlesInput.val();
		if(num >= 1 && num <= maxParticlesNumber) {
			maxParticles = num;
			particlesBool = true;
			particlesButton.removeClass('alert-danger');
		}
		else {
			particlesBool = false;
			particlesButton.addClass('alert-danger');
		}
		checkAlert();
    }
  });
});

// Code involving maximum canvas size input.
particleSizeButton.on('click', function() {
	var num = particlesInput.val();
	if(num >= 100 && num <= maxParticlesNumber) {
		particleSize = num;
		particleSizeBool = true;
		particleSizeButton.removeClass('alert-danger');
	}
	else {
		particleSizeBool = false;
		particleSizeButton.addClass('alert-danger');
	}
	checkAlert();

});

//Bind the enter button CANVAS_HEIGHT
$(function(){
	particleSizeInput.keypress(function(e){
		if(e.which == 13) {
			var num = particleSizeInput.val();
			if(num >= 1 && num <= maxParticleSize) {
				particleSize = num;
				particleSizeBool = true;
				particleSizeButton.removeClass('alert-danger');
			}
			else {
				particleSizeBool = false;
				particleSizeButton.addClass('alert-danger');
			}
			checkAlert();
		}
	});
});

// Sets the places holders for the input fields.
function setRateInputPlaceholder() {
	rateInput.prop('placeholder','between 1 and ' + maxEmissionRate + ' (inclusive)');
}
function setParticlesInputPlaceholder() {
	particlesInput.prop('placeholder','between 1 and ' + maxParticlesNumber + ' (inclusive)');
}
function setMaxParticleSizePlaceholder() {
	particleSizeInput.prop('placeholder','between 1 and ' + maxParticleSize + ' (inclusive)');
}

// Sets the placeholder text of the inputs.
setRateInputPlaceholder();
setParticlesInputPlaceholder();
setMaxParticleSizePlaceholder();

// Sets the inputs' default values to the default values.
rateInput.val(maxEmissionRate);
particlesInput.val(maxParticlesNumber);
particleSizeInput.val(maxParticleSize);


var rainButton = $('#rainButton');// Selector for the rain button
var snowButton = $('#snowButton');// Selector for the snowButton
// Changes the simulation to rain.
rainButton.on('click', function() {
	playPause();// Stop all other simulations.
	clearArrays();// Clear simulation.
	rain();// Start the rain simluation.
	snowButton.removeAttr('disabled');
	rainButton.prop('disabled','true');
});

snowButton.on('click', function() {
	playPause();// Stop all other simulations.
	clearArrays();// Clear simulation.
	snow();// Start the snow simluation.
	snowButton.prop('disabled','true');
	rainButton.removeAttr('disabled');
});

var windToggleButton = $('#windToggleButton');// Selector for the Wind toggle Button
// This toggles the wind and changes the button text whenever the button is clicked.
windToggleButton.on('click', function() {
	windOn = !windOn;
	if(windOn) {
		windToggleButton.html('Wind: Enabled');
	}
	else {
		windToggleButton.html('Wind: Disabled');
	}
});
