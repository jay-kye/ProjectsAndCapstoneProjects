import React from 'react';

function App() {
    let people = [{
        name : "Tony",
        age : 18,
        hobbies : ["Soccer", "MMA", "Paint"]
    },{
        name : "Jane",
        age : 24,
        hobbies : ["Singing", "Riding a bike", "Listening to music"]
    },{
        name : "Alejandro",
        age : 15,
        hobbies : ["Gaming", "Watching TV", "Walk"]
    }];
    return (
        <div>
            {people.map((person,i)=>{
                return (
                    <div key={i}>
                        <Person person={person}/>
                        <AbleToVote age={person.age}/>
                    </div>
                )
            })
                }
        </div>
    );
}

const Person = ({ person }) => {
    return (
        <div>
            <p>Learn some information about this person</p>
            <p>{"Name: " + person.name}</p>
            <p>{"Age: " + person.age}</p>
            <ul>
                {person.hobbies.map((hobby, i) => {
                    return (<li key={i}>{"Hobby: " + hobby}</li>);
                })}
            </ul>
        </div>
    );
};

const AbleToVote =({age})=>{
    return(
        <div>
            {
                age > 18 ? <h3>Please go vote!</h3> : <h3>You must be 18 to vote</h3>
            }
        </div>
    )
}
export default App;
