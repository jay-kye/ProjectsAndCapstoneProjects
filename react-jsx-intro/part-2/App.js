import React from 'react';

function App() {
    let users = [{
        username: "Johnny",
        name: "John",
        date: "06-11-2024",
        message: "Hi"
    }, {
        username: "Hohoho",
        name: "Jose",
        date: "06-12-2024",
        message: "Hello"
    }, { 
        username: "Peeeeeter",
        name: "Peter",
        date: "06-09-2024",
        message: "Hahaha"
    }];

    return (
        <div>
            {users.map((user, i) => {
                return <Tweet key={i} user={user} />;
            })}
        </div>
    );
}

const Tweet = (props) => {
    return (
        <div className="tweet">
            <p className="username">{"Username: " + props.user.username}</p>
            <p>{"Name: " + props.user.name}</p>
            <p className="date">{"Date: " + props.user.date}</p>
            <p>{"Message: " + props.user.message}</p>
        </div>
    );
}

export default App;
