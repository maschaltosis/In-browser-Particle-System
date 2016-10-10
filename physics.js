//Basic Vector Object (2D)
function Vector(x, y) {
	this.x = x || 0;
	this.y = y || 0;
}

//Vector addition.
Vector.prototype.add = function(vector) {
	this.x += vector.x;
	this.y += vector.y;
}

//Returns the magnitude/length/norm of the vector.
// magnitude = sqrt(x^2 + y^2)
Vector.prototype.getMagnitude = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y);
}

//Returns the angle of the vector from the x-axis.
// Theta = arctan(y/x) OR tan(theta) = Opposite/Adjacent
Vector.prototype.getAngle = function() {
	return Math.atan2(this.y, this.x);
}

//Create a new vector from an angle (radians) and magnitude.
// X-Component: magnitude * Math.cos(angle)
// Y-Component: magnitude * Math.sin(angle)
// NOTE: Angle gets converted to degrees.
Vector.fromAngle = function(angle, magnitude) {
	return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
}

Vector.prototype.scale = function(factor) {
	this.x *= factor;
	this.y *= factor;
}

function Field(point, mass) {
	this.position = point;
	this.setMass(mass);
}

Field.prototype.setMass = function(mass) {
	this.mass = mass || 100;
	this.drawColor = mass < 0 ? "#f00" : "#0f0";
}