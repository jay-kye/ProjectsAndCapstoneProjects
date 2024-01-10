/* Part One
* Class Vehicle has honk and toString Method.
*/
class Vehicle {
    constructor(make, model, year){
        this.make = make;
        this.model = model;
        this.year = year;
    }
    honk(){
        return "Beep Beep!";
    }
    toString(){
        return `The vehicle is a ${this.make} ${this.model} from ${this.year}.`;
    }
}

let myFirstVehicle = new Vehicle("Tesla", "Model Y", 2021);
myFirstVehicle.honk();
myFirstVehicle.toString();

/* Part two
 * Class Car inherited Class Vehicle and has numWheels method that belong to Car class.
 */
class Car extends Vehicle{
    constructor(make, model, year){
        super(make, model, year);
        this.numWheels = 4;
    } 
    
}

let myFirstCar = new Car("Tesla", "Model Y", 2021);
myFirstCar.numWheels;

/* Part Three
 * Class Motorcycle inherited Class Vehicle and has numWheels method that belong to Motorcycle class.
 */

class Motorcycle extends Vehicle{
    constructor(make, model, year){
        super(make, model, year);
        this.numWheels = 2;
    } 
    revEngine(){
        return "Vrrrrroooooooom!!!";
    }
}

let myFirstMotocycle = new Motorcycle("BMW", "Rider", 2022);
myFirstMotocycle.toString();
myFirstMotocycle.honk();
myFirstMotocycle.numWheels;
myFirstMotocycle.revEngine();

/* Part Four
* Class Garage that 
*/
class Garage{
    constructor(capacity){
        this.capacity = capacity;
        this.vehicle = [];
    }
    add(enteringVehicle){
        if(!(enteringVehicle instanceof Vehicle)){
            return "Only vehicles are allowed in here!";
            // it checks the parameter if it's a vehicle or not.
        } else if(this.vehicle.length >= this.capacity){
            return "Sorry, we're full.";
            // it checks the capacity if it's full or not.
        } else{
            this.vehicle.push(enteringVehicle);
            return "Vehicle added!";
            // after checking those 2 conditions, finally add a vehicle in an array of garage object.
        }
    }   
}

// let garage = new Garage(2);
// // new garage created with the capacity of 2
// garage.add(new Car('Tesla', 'Cyberturck', 2024));
// // vehicle added successfully
// garage.add(new Car('Tesla', 'Model S', 2024));
// // vehicle added successfully
// garage.add(new Car('Tesla', 'Model Y', 2024));
// // now garage is full, can't add any more
// garage.add('taco');
// // this is not a vehicle, and it can't enter the garage.
