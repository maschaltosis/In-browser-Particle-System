// This creates the HTML canvas object which will hold the majority of the simluation.
var canvas = document.createElement("canvas");
var ctx = canvas.getContext('2d');

var emitters = [], fields = [], particles = [];

var maxParticles, emissionRate, canvasHeight = 400,
	canvasWidth = 400, minimumSpeed, maximumSpeed,
	objectSize, play = true, fieldsOn, count, windiness,
	gravity, particleColor, wind, windOn;

function toggleIntro(simulation) {
	$('#control-panel').css('display','block');
	// Hides the initial simulation selection screen.
	document.getElementById("intro").style.display = "none";

	// This appends the canvas object to the correct HTML location and then
	//   sets the proper attributes to it.
	var containerDiv = document.getElementsByClassName("jumbotron")[0];
	containerDiv.appendChild(canvas);
	canvas.height = canvasHeight;// Default: 400
	canvas.width = canvasWidth;// Default: 400
	canvas.style.display = "inline-block";
	canvas.style.border = "2px solid grey";
    canvas.style.backgroundColor = "white";

	// Sets the correct variables and settings for the selected simulation.
	simulation();

	// Starts the simulation.
    loop();
}

// Run the rain simulation!
function rain() {
	particleColor = 'rgb(0,0,0)';// Black
	maxParticles = 10000;
	emissionRate = 15;
	particleSize = 1;
	canvasHeight = 400;
	canvasWidth = 600;
	minimumSpeed = 2.25;
	maximumSpeed = 4;
	objectSize = 3;
	//fieldsOn = false;
	gravity = new Vector(0,.0025);

	windOn = false;
	windiness = 5;
	
	/* Creates an emitter that emits particles down.
	 *   Located at (x: 0, y: 0)
	 *   Outputs at angle PI/2 (270 degrees)
	 *   Particle spread of PI/32
	 */
	emitters = [new Emitter(new Vector(0, 0), Vector.fromAngle(Math.PI/2, 1), Math.PI/32)];
	/*
	if(fieldsOn) {
		for(var i = 0; i < canvasHeight * 2; i += 20) {
			fields.push(new Field(new Vector(- 100, i), -50));
		}
	}
	*/

    play = true;
}

//Run the snow simulation!
function snow() {
	particleColor = 'rgb(0,0,0)';// Black
	maxParticles = 10000;
	emissionRate = 10;
	particleSize = 1;
	canvasHeight = 400;
	canvasWidth = 600;
	minimumSpeed = 1;
	maximumSpeed = 2;
	objectSize = 3;
	gravity = new Vector(0, .001);
	fieldsOn = false;

	windOn = true;
	windiness = 5;

	/* Creates the emitters for the simulation.
	 * 	Located at (x: 0, y: 0)
	 * 	Outputs at angle PI/2 (270 degrees)
	 * 	Particle spread of PI/4
	 */
    emitters = [new Emitter(new Vector(0, 0), Vector.fromAngle(Math.PI/2, 1), Math.PI/8)];


	if(fieldsOn) {
		for(var i = 0; i < canvasHeight * 2; i += 20) {
			fields.push(new Field(new Vector(-100, i), -50));
		}
	}

	/* Creates Wind
	 *  Has a magnitude of .075
	 *  Points in the direction Math.PI/16
	 *  Has the variability of Math.PI/64
	 */
	if(windOn) {
		wind = new Wind(.075, Math.PI/16, Math.PI/64);
	}
    play = true;
}

function addNewParticles() {
	//if we're at a max... stop.
	if(particles.length > maxParticles) {
		return;
	}
	
	//For each emitter
	for(var i = 0; i < emitters.length; i++) {
		//For [emissionRate], emit a particle
		for(var j = 0; j < emissionRate; j++) {
			particles.push(emitters[i].emitParticle());
		}
	
	}
}

function plotParticles(boundsX, boundsY) {
	//Particles within bounds
	var currentParticles = [];
	if(windOn) {
		// Calculates the wind speed at this frame.
		calculateWind();
	}
	for(var i = 0; i < particles.length; i++) {
		var particle = particles[i];
		var pos = particle.position;
		
		//Check if out of bounds and if so move on without adding it to the new list.
		if(pos.x < 0 || pos.x > boundsX || pos.y < 0 || pos.y > boundsY) {
			continue;
		}
		// Update velocities and accelerations to account for fields.
		particle.submitToFields();

		//particle.velocity.x += .01;

		if(windOn) {
			// Update the acceleration of the particle depending on the wind.
			particle.blowWind(wind);
		}

		//Move the particle
		particle.move();
		
		//Add this particle to the list of current particles
		currentParticles.push(particle);
	}
	count = count + 1;
	particles = currentParticles;
}

function drawParticles() {
	//Set the color of our particles.
	ctx.fillStyle = particleColor;


	// For each particle, draw a square.
	particles.forEach(drawCircle);

	/*
	// For each particle, draw a square.
	for(var i = 0; i < particles.length; i++) {
		var position = particles[i].position;

		ctx.fillRect(position.x, position.y, particleSize, particleSize);
	}
	*/
}

// `object` is a field or emitter, something that has a drawColor and position
// Used to make emitters or fields appear as circles.
function drawCircle(object) {
	ctx.fillStyle = object.drawColor;
	ctx.beginPath();
	ctx.arc(object.position.x, object.position.y, particleSize, 0, Math.PI * 2);
	ctx.closePath();
	ctx.fill();
}

function loop() {
	clear();
	update();
	draw();
	queue();
}

function clear() {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

function update() {
	addNewParticles();
	plotParticles(canvasWidth, canvasHeight);
}

function draw(){
	drawParticles();
	fields.forEach(drawCircle);
	//Shows emitters.
	//emitters.forEach(drawCircle);
}

function queue() {
	if(play) {
		window.requestAnimationFrame(loop);
	}
	else {
		//pause
	}
}
// Clears the simulation of old particles, emitters, and fields.
function clearArrays() {
	particles = [];
	emitters = [];
	fields = [];
}
