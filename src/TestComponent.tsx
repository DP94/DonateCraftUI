import React, {useState} from "react";

class TestComponent extends React.Component {
    
    render() {
        return (
            <h1>test</h1>
        )
    }
    
    componentDidMount() {
        fetch('https://jr0me1l0t9.execute-api.eu-west-2.amazonaws.com/Prod/api/values').then(async response => {
            const data = await response.json();
            return data[0];
        }).catch(error => {
            console.error(error)
        })
    }
}

export default TestComponent;