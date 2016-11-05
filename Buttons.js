//When these are true, the related inputfield is valid.
var rateBool = true, particlesBool = true, particleSizeBool = true;

// Maximums for the input fields.
var maxEmissionRate = 2500;
var maxParticleSize = 25;
var maxParticlesNumber = 10000;

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

// This is the functino that pauses and plays the simulation.
function playPause() {
	play = !play;
	if(play) {
		loop();
	}
}

// Intro snow button should start the snow simulation and disable to snow button.
$('#startSnowButton').on('click', function() {
	toggleIntro(snow());
	snowButton.prop('disabled','true');
	setDefaults();
});

// Intro rain button should start the rain simulation and disable to rain button.
$('#startRainButton').on('click', function() {
	toggleIntro(rain());
	rainButton.prop('disabled','true');
	setDefaults();
});

// Intro rain button should start the rain simulation and disable to rain button.
// Also disable the wind button because the insect simulation has no wind.
$('#startInsectButton').on('click', function() {
    toggleIntro(insect());
    insectButton.prop('disabled','true');
    windToggleButton.prop('disabled','true');
    setDefaults();
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


});

//Bind the enter button max PARTICLES
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

//Particle size button
particleSizeButton.on('click', function() {
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

});

// Particle size button on ENTER
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

function setDefaults() {
	// Sets the placeholder text of the inputs.
	setRateInputPlaceholder();
	setParticlesInputPlaceholder();
	setMaxParticleSizePlaceholder();

	// Sets the inputs' default values to the default values.
	rateInput.val(emissionRate);
	particlesInput.val(maxParticles);
	particleSizeInput.val(particleSize);

    // Sets the default text for the wind dialog button.
    if(windOn) {
        windToggleButton.html('Wind: Enabled');
    }
    else {
        windToggleButton.html('Wind: Disabled');
    }
}

// Clears the simulation of old particles, emitters, and fields.
function clearArrays() {
    particles = []; //Clears the particle Array.
    emitters = []; //Clears the emitters Array.
    fields = []; //Clears the fields Array.
}

var rainButton = $('#rainButton');// Selector for the rain button
var snowButton = $('#snowButton');// Selector for the snowButton
var insectButton = $('#insectButton');// Selector for the insectButton
// Changes the simulation to rain.
rainButton.on('click', function() {
	playPause();// Stop all other simulations.
	clearArrays();// Clear simulation.
	snowButton.removeAttr('disabled');
	rainButton.prop('disabled','true');
    insectButton.removeAttr('disabled');
    windToggleButton.removeAttr('disabled');
	rain();// Start the rain simluation.
	setDefaults();
});

snowButton.on('click', function() {
	playPause();// Stop all other simulations.
	clearArrays();// Clear simulation.
	snowButton.prop('disabled','true');
	rainButton.removeAttr('disabled');
    insectButton.removeAttr('disabled');
    windToggleButton.removeAttr('disabled');
	snow();// Start the snow simluation.
	setDefaults();
});

insectButton.on('click', function() {
    playPause();// Stop all other simulations.
    clearArrays();// Clear simulation.
    windToggleButton.prop('disabled','true');
    insectButton.prop('disabled','true');// Make the insect button unclickable
    rainButton.removeAttr('disabled');
    snowButton.removeAttr('disabled');
    insect();// Start the insect simluation.
    setDefaults();
});

var windToggleButton = $('#windToggleButton');// Selector for the Wind toggle Button
// This toggles the wind and changes the button text whenever the button is clicked.
windToggleButton.on('click', function() {
    if(insectButton.prop('disabled') === true) {
        windToggleButton.prop('disabled','true');
        return;
    }
	windOn = !windOn;
	if(windOn) {
		windToggleButton.html('Wind: Enabled');
	}
	else {
		windToggleButton.html('Wind: Disabled');
	}
});
