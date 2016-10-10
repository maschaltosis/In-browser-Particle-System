//Creates a new particle at a point with a velocity and accleration.
function Particle(point, velocity, acceleration) {
	this.position = point || new Vector(0, 0);
	this.velocity = velocity || new Vector(0, 0);
	this.acceleration = acceleration || new Vector(0, 0);
}

//Moves the particle depending on its acceleration and velocity.
Particle.prototype.move = function() {
	//Adds the acceleration to the velocity
	this.velocity.add(this.acceleration);
	
	//Adds the velocity to the position.
	this.position.add(this.velocity);
}

//Adjust the particles' accelerations due to fields.
//This was added to simulate gravity.
Particle.prototype.submitToFields = function(field) {
	var totalAccelerationX = 0;
	var totalAccelerationY = 0;
	
	//for each field
	for(var i = 0; i < fields.length; i++) {
		var field = fields[i];
		
		//Find the distance between the particle and the field.
		var vectorX = field.position.x - this.position.x;
		var vectorY = field.position.y - this.position.y;
		
		//Calculate the force acting on the particle.
		var force = field.mass / Math.pow(vectorX*vectorX+vectorY*vectorY,1.5);
		
		// Add force to the totalAccelerationX scaled by distance.
		totalAccelerationX += vectorX * force;
		totalAccelerationY += vectorY * force;
	}
	// update our particle's acceleration
	this.acceleration = new Vector(totalAccelerationX, totalAccelerationY);
}

//Creates a point where particles are emitted.
// Point: Location of the Emitter.
// Velocity: Velocity of the emitted particles.
// Spread:
function Emitter(point, velocity, spread) {
	this.position = point;
	this.velocity = velocity;
	this.spread = spread || 0;
	this.drawColor = "#999"; // Color of the emitter;
}

//Spawns a particle from an emitter.
Emitter.prototype.emitParticle = function() {
	//Randomized angle to spread.
	//var angle = this.velocity.getAngle() + this.spread - (Math.random() * this.spread * 2);
	var angle = this.velocity.getAngle() + getRandomArbitrary(-this.spread, this.spread);
	
	// The magnitude of the emitter's velocity
	var magnitude = this.velocity.getMagnitude();
	
	// The new particle's position is set to the emitter's position
	//ADDS A RANDOM X VALUE TO THE POSITION TO MAKE THEM APPEAR IN A LINE ACROSS THE TOP
	var position = new Vector(getRandomArbitrary(0, canvasWidth), this.position.y);
	
	var velocity = Vector.fromAngle(angle, magnitude * getRandomArbitrary(minimumSpeed, maximumSpeed));
	
	return new Particle(position, velocity, 9.8);
}

// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}