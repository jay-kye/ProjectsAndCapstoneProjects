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
        console.log(`Beep Beep!`);
    }
    toString(){
        console.log(`The vehicle is a ${this.make} ${this.model} from ${this.year}.`)
    }
}

let myFirstVehicle = new Vehicle("Tesla", "Model Y", 2021);
myFirstVehicle.honk();
myFirstVehicle.toString();
console.log('===========divider===========')

/* Part two
 * Class Car inherited Class Vehicle and has numWheels method that belong to Car class.
 */
class Car extends Vehicle{
    numWheels(){
        console.log(4);
    }
}

let myFirstCar = new Car("Tesla", "Model Y", 2021);
myFirstCar.numWheels();
console.log('===========divider===========')

/* Part Three
 * Class Motorcycle inherited Class Vehicle and has numWheels method that belong to Motorcycle class.
 */

class Motorcycle extends Vehicle{
    numWheels(){
        console.log(2);
    }
    revEngine(){
        console.log(`Vrrrrroooooooom!!!`);
    }
}

let myFirstMotocycle = new Motorcycle("BMW", "Rider", 2022);
myFirstMotocycle.toString();
myFirstMotocycle.honk();
myFirstMotocycle.numWheels();
myFirstMotocycle.revEngine();
console.log('===========divider===========')

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
            console.log("Only vehicles are allowed in here!")
            // it checks the parameter if it's a vehicle or not.
        } else if(this.vehicle.length >= this.capacity){
            console.log("Sorry, we're full.");
            // it checks the capacity if it's full or not.
        } else{
            this.vehicle.push(enteringVehicle);
            console.log("Vehicle added!");
            // after checking those 2 conditions, finally add a vehicle in an array of garage object.
        }
    }   
}

let garage = new Garage(2);
// new garage created with the capacity of 2
garage.add(new Car('Tesla', 'Cyberturck', 2024));
// vehicle added successfully
garage.add(new Car('Tesla', 'Model S', 2024));
// vehicle added successfully
garage.add(new Car('Tesla', 'Model Y', 2024));
// now garage is full, can't add any more
garage.add('taco');
// this is not a vehicle, and it can't enter the garage.
