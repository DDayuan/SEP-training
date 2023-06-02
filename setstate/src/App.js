import React from 'react';
import './App.css';

class App extends React.Component {
  constructor () {
    super();
    this.state = {
    "id": "001",
    "type": "A",
    "value": "aaaaa",
    "data:": {},
    "path": ["001"],
    "children": [
        {
            "id": "003",
            "type": "A",
            "value": "aaaaa",
            "data:": {},
            "path": ["001", "003"],
            "children": [
                {
                    "id": "002",
                    "type": "A",
                    "value": "aaaaa",
                    "data:": {},
                    "path": ["001", "003", "002"],
                    "children": []
                },
            ]
        },
        {
            "id": "004",
            "type": "A",
            "value": "aaaaa",
            "data:": {},
            "path": ["001", "004"],
            "children": [
                {
                    "id": "005",
                    "type": "A",
                    "value": "aaaaa",
                    "data:": {},
                    "path": ["001", "004", "005"],
                    "children": []
                },{
                    "id": "005",
                    "type": "A",
                    "value": "aaaaa",
                    "data:": {},
                    "path": ["001", "004", "005"],
                    "children": [
                        {
                            "id": "002",
                            "type": "A",
                            "value": "aaaaa",
                            "data:": {},
                            "path": ["001", "004", "005", "002"],
                            "children": []
                        }
                    ]
                }
            ]
        }
      ]
    }
  }
  changeStateImmutably = () => {
    this.setState((prev) => {
      const nextState = {
        ...prev,
        children: [
          {
            ...prev.children[0],
            children: [
              {
                ...prev.children[0].children[0],
                path: [
                  ...prev.children[0].children[0].path.slice(0, 1),
                  '004',
                  ...prev.children[0].children[0].path.slice(2),
                ],
              },
              ...prev.children[0].children.slice(1),
            ],
          },
          {
            ...prev.children[1],
            children: [
                ...prev.children[1].children.slice(0, 1),
                {
                    ...prev.children[1].children[1],
                    children: [
                        {
                            ...prev.children[1].children[1].children[0],
                            path: [
                                ...prev.children[1].children[1].children[0].path.slice(0,2),
                                '006',
                                ...prev.children[1].children[1].children[0].path.slice(3),
                            ]
                        }
                    ]
                },
                ...prev.children[1].children.slice(2),
            ],
          },
          ...prev.children.slice(2),
        ],
      };
      return nextState;
    });
  };
  render () {
    return (
      <div className='setStatePractice'>
      <h1>hello</h1>;
      <button onClick={this.changeStateImmutably}>
        change state
      </button>
    </div>
    )
  }
  componentDidMount() {
    console.log(this.state);
  }

  componentDidUpdate() {
    console.log(this.state);
  }
}
export default App;
