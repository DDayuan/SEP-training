import React from "react";

class MyPureComponent extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        const propsChange = !shallowEqual(nextProps, this.props);
        const stateChanged = !shallowEqual(nextState, this.state);
        return propsChange || stateChanged;
    }

    render() {
        return(
            <div>
            <h1>{this.props.title}</h1>
            <p>{this.props.description}</p>
            </div>
        )
    }
}

function shallowEqual(objA, objB) {
    if (objA == objB) return true;

    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
        return false;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
      }
    
    for (let i = 0; i < keysA.length; i++) {
        const key = keysA[i];
        if (objA[key] !== objB[key]) {
          return false;
        }
    }

    return true;
}

export default MyPureComponent;