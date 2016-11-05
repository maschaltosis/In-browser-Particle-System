// This creates the HTML canvas object which will hold the simluation.
var canvas = document.createElement("canvas");
var ctx = canvas.getContext('2d');

var emitters = [], fields = [], particles = [];

var maxParticles, // Maximum number of particles allowed in the simluation at one time.
	particleSize, // This is the radius of the particles. (in pixels)
	emissionRate, // How many particles the emitters will emit per frame.
	canvasHeight = 400, // Size of the simulation canvas height. (Minimum: 400px)
	canvasWidth = 400, // Size of the simulation canvas width. (Minimum: 400px)
	minimumSpeed, // Minimum speed of the particles.
	maximumSpeed, // Maximum speed of the particles.
	play = true, // Whether or not the simulation is playing. (Default: true)
	windiness, // Determines the wind strength.
	gravity, // Determiens the gravity strength
	particleColor, // Determines the color of the particle.
	wind, // Variable used to hold the wind settings for the simulation.
	windOn, // Whether or not wind is on.
	emitFromTop; // Whether or not particles should emit from the top. If this is false,
				 //  then the particles will emit from the left side.

function toggleIntro(simulation) {
	//Displays the options 'Advanced Options' section below the simulation.
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
	simulation;

	// Starts the simulation.
    loop();
}

// Run the rain simulation!
function rain() {
	particleColor = 'rgb(0,0,0)';// Black
	maxParticles = 2500;
	emissionRate = 15;
	particleSize = 1;
	canvasHeight = 400;
	canvasWidth = 600;
	minimumSpeed = 2.25;
	maximumSpeed = 4;
	gravity = new Vector(0,.0025);
	emitFromTop = true;

	windOn = false;
	windiness = 10;
	
	/* Creates an emitter that emits particles down.
	 *   Located at (x: 0, y: 0)
	 *   Outputs at angle PI/2 (270 degrees)
	 *   Particle spread of PI/32
	 */
	emitters = [new Emitter(new Vector(0, 0), Vector.fromAngle(Math.PI/2, 1), Math.PI/32)];

	if(windOn) {
		wind = new Wind(.0125, Math.PI/8, Math.PI/64);
	}

    play = true;
}

//Run the snow simulation!
function snow() {
	particleColor = 'rgb(0,0,0)';// Black
	maxParticles = 2000;
	emissionRate = 10;
	particleSize = 1;
	canvasHeight = 400;
	canvasWidth = 600;
	minimumSpeed = 1;
	maximumSpeed = 2;
	gravity = new Vector(0, .001);
	emitFromTop = true;

	windOn = true;
	windiness = 5;

	/* Creates the emitters for the simulation.
	 * 	Located at (x: 0, y: 0)
	 * 	Outputs at angle PI/2 (270 degrees)
	 * 	Particle spread of PI/4
	 */
    emitters = [new Emitter(new Vector(0, 0), Vector.fromAngle(Math.PI/2, 1), Math.PI/8)];

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

//Run the insect simulation!
function insect() {
	particleColor = 'rgb(0,0,0)';// Black
	maxParticles = 2500;
	emissionRate = 10;
	particleSize = 1;
	canvasHeight = 400;
	canvasWidth = 600;
	minimumSpeed = 1.5;
	maximumSpeed = 4;
	gravity = new Vector(0, 0);
	emitFromTop = false; //Emit from left side.

	windOn = false;// Insect simulation doesn't need wind effects.

	/* Creates the emitters for the simulation.
	 * 	Located at (x: 0, y: 0)
	 * 	Outputs at angle PI/2 (270 degrees)
	 * 	Particle spread of PI/4
	 */
	emitters = [new Emitter(new Vector(0, 0), Vector.fromAngle(0, 1), Math.PI/16)];

	play = true;
}

//This function adds new particles to the system.
function addNewParticles() {
	//if we're at a max... stop.
	if(particles.length > maxParticles) {
		return;
	}
	
	//For each emitter
	for(var i = 0; i < emitters.length; i++) {
		//For [emissionRate], emit a particle
		//I.E. Create [emissionRate] particles for every frame.
		for(var j = 0; j < emissionRate; j++) {
			particles.push(emitters[i].emitParticle());
		}
	
	}
}

// This function plots the new positions of the particles after each frame.
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
		//particle.submitToFields();

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

	// Overwrites the old particles.
	particles = currentParticles;
}

// This function draws the particles onto the canvas.
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
// Used to make particles, emitters, or fields appear as circles.
function drawCircle(object) {
	ctx.fillStyle = object.drawColor;
	ctx.beginPath();
	ctx.arc(object.position.x, object.position.y, particleSize, 0, Math.PI * 2);
	ctx.closePath();
	ctx.fill();
}

// This starts the looping of our simulation.
function loop() {
	clear();
	update();
	draw();
	queue();
}

// Wipes the canvas/simulation.
function clear() {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

// Update the canvas/simulation.
function update() {
	addNewParticles();
	plotParticles(canvasWidth, canvasHeight);
}

// Draw the particles (or field and emitters if needed...)
function draw(){
	drawParticles();
	//fields.forEach(drawCircle);
	//Shows emitters.
	//emitters.forEach(drawCircle);
}

// Queues the next frame. If play is false, it will pause the simulation.
function queue() {
	if(play) {
		window.requestAnimationFrame(loop);
	}
}
