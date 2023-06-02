import React, {useState, useEffect} from 'react';

const WithMyMemo = (WrappedComponent) => {
    return class MyMemo extends React.Component {
        shouldComponentUpdate (nextProps) {
            const keys = Object.keys(this.props);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                if (this.props[key] !== nextProps[key]) {
                    return true;
                }
            }
            return false;
        }
        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
};

export default WithMyMemo;