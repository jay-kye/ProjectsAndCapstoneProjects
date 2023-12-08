// CountDown function
/* condition:
1. Write a function called countdown that accepts a number as a parameter 
2. and every 1000 milliseconds decrements the value 
3. and console.logs it. 
4. Once the value is 0 it should log “DONE!” and stop.
*/

function countDown(num){ // a function called countdown that accepts a number as a parameter.
    let timer = setInterval(function countDownBegin(){  // used setInterval function in order to get a function for every 1000 milliseconds
        num --; // decrements the value 
        if(num === 0){ // Once the value is 0
            console.log("DONE!"); // it should log “DONE!” 
            clearInterval(timer); // and stop
            
        }else{
            console.log(num); // console.logs the decresement value
        }
    }, 1000) //here is every 1000 milliseconds
}

// RandomGame function
/* condition:
1. Write a function called randomGame 
2. that selects a random number between 0 and 1 every 1000 milliseconds 
3. and each time that a random number is picked, add 1 to a counter. 
4. If the number is greater than .75, 
stop the timer and console.log the number of tries it took before we found a number greater than .75.
*/
   
function randomGame(){ // a function called randomGame
        let counter = 0; // counter assigned
        let randNum = setInterval(function (){ 
            let num = Math.random();  // that selects a random number between 0 and 1 every 1000 milliseconds 
            counter++; //each time that a random number is picked, add 1 to a counter.
            if(num > .75){ //If the number is greater than .75,
                clearInterval(randNum); //stop the timer 
                console.log(`it took ${counter} guess/guesses!`) //console.log the number of tries it took before we found a number greater than .75.
            }
        },1000) //here is every 1000 milliseconds
    }
    
