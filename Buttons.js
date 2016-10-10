var maxEmissionRate = 100;
var maxParticlesNumber = 69;

var rateInput = $('#rateInput');
var rateAlert = $('#rateAlert');

var particlesInput = $('#particlesInput');
var particlesAlert = $('#particlesAlert');

// Stops and starts the animation.
$('#playPauseButton').on('click', function() {
	play = !play;
	if(play) {
		loop();
	}
});
// Code involving the emission rate input.


$('#rateButton').on('click', function() {
	var rate = rateInput.val();
	if(rate >= 1 && rate <= maxEmissionRate) {
		emissionRate = rate;
		rateAlert.css('display','none');
	}
	rateAlert.css('display','block');
});

//Bind the enter button to submit.
$(function(){
  rateInput.keypress(function(e){
    if(e.which == 13) {
      	var rate = rateInput.val();
		if(rate >= 1 && rate <= maxEmissionRate) {
			emissionRate = rate;
			rateAlert.css('display','none');
		}
		else {
			rateAlert.css('display','block');
		}
    }
  });
});

// Code involving maximum particles input.
$('#particlesButton').on('click', function() {
	var num = particlesInput.val();
	if(num >= 0 && num <= maxParticlesNumber) {
		maxParticles = num;
		$('#particlesAlert').css('display','none');
	}
	$('#particlesAlert').css('display','block');
});

//Bind the enter button to submit.
$(function(){
  particlesInput.keypress(function(e){
    if(e.which == 13) {
      	var num = particlesInput.val();
		if(num >= 1 && num <= maxParticlesNumber) {
			maxParticles = num;
			$('#particlesAlert').css('display','none');
		}
		else {
			$('#particlesAlert').css('display','block');
		}
    }
  });
});



// Sets the places holders and stuff.
function setRateInputPlaceholder() {
	rateInput.prop('placeholder','between 1 and ' + maxEmissionRate + ' (inclusive)');
}
function setParticlesInputPlaceholder() {
	particlesInput.prop('placeholder','between 1 and ' + maxParticlesNumber + ' (inclusive)');
}
setRateInputPlaceholder();
setParticlesInputPlaceholder();
rateInput.val(maxEmissionRate);
particlesInput.val(maxParticlesNumber);



	
	
	
	