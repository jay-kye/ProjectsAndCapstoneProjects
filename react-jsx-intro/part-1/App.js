import React from 'react';

const FirstComponent = () => {
    return (
        <div>
            <h1>My very first component.</h1>
        </div>
    );
};

const NamedComponent = ({ name }) => {
    return (
        <div>
            <h1>My name is {name}</h1>
        </div>
    );
};

function App() {
    return (
        <div>
            <FirstComponent />
            <NamedComponent name="Jay" />
        </div>
    );
}

export default App;
