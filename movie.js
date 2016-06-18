( function () {
var movieConstructor = function (Title, runTimeInMin, Year, Genre, Desc) {
	this.Title = Title;
	this.Time = parseInt(runTimeInMin); 
	this.Year = parseInt(Year);
	this.Genre = Genre;
	this.Desc = Desc || 'N/A';	// Sets description value to N/A if empty 
	this.isAvailable = true;
	this.runTimeInHours = function () { 
		return parseInt(this.Time / 60) + 'h ' + this.Time % 60 + 'm';	// Divide by 60 to get hours modulus 60 to get minutes
	}
	this.Preview = function () {		// Slices the first 50 characters of description then adds ... 
		return (this.Desc.length >= 50) ? this.Desc.slice(0, 50) + '...' : this.Desc;
	}
	this.costInfo = function () {
		return ((this.isAvailable) ? '\nDaily Rate: $' + this.getRate() : '\nCost: $' + this.getCost() + '\nDays Checked Out: ' + this.checkOutTime);
	}
	this.Update = function (Time, Year, Genre, Desc) {
		this.Time = parseInt(Time) || this.Time; // Keeps value the same if new value is empty
		this.Year = parseInt(Year) || this.Year;  
		this.Genre = Genre || this.Genre;
		this.Desc = Desc || this.Desc;      
	}
	this.getColor = function () {
		return (this.isAvailable) ? 'green' : 'red';
	}
	this.checkInOrOut = function () {
		this.isAvailable = !this.isAvailable; // Flips the variable value
		this.checkOut = (!this.isAvailable) ? new Date : this.checkOut; // Sets checkout date when movie becomes unavailable 
	}
	this.getRate = function () {
		this.dailyCost = (this.Year >= 2014) ? (this.Time / 60 * 1.27 ) : (this.Time / 75 * .95 ); // Sets the daily cost based on the movie release year and length
        return this.dailyCost.toFixed(2); // Keeps 2 floating points
	}
    this.getCost = function () {
		this.checkIn = new Date;
		// Subtract checkIn month by the checkOut month multiply the diffrence by 30 then add the product to the diffrence between checkIn/out date
		this.checkOutTime = parseInt(((this.checkIn.getMonth() + 1) - (this.checkOut.getMonth() + 1)) * 30 + (this.checkIn.getDate() + Math.floor((Math.random() * 100) + 1)) - this.checkOut.getDate());
        this.Cost = this.checkOutTime * this.getRate()
		return this.Cost.toFixed(2);
	}
};

var userConstructor = function () {
	this.Balance = 0.00;
	this.showBalance = function () {
		return '$' + this.Balance.toFixed(2);
	}
	this.Deposit = function (Amount) {
		if (!isNaN(Amount) && Amount) {
			this.Balance += parseInt(Amount);
		} 
	}
	this.Withdraw = function (Amount) {
		if (!isNaN(Amount) && this.Balance - Amount >= 0) {
			this.Balance -= Amount;
			return 1;
		} else {
			return -1;
		}
	}
	
}

window.movieConstructor = movieConstructor;
window.userConstructor = userConstructor;
} () );

