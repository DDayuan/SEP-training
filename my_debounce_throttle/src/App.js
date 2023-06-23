import _ from "lodash";

const myDebounce = (cb, waitTime, opt) => {
  const leading = opt?.leading ?? false;
  const trailiing = opt?.trailiing ?? true;
  let done = true;
  let timer;

  return function (...args) {
    if (!done) {
      clearTimeout(timer);
    } else {
      leading && cb(...args);
    }
    done = false;
    timer = setTimeout(() => {
      done = true;
      trailiing && cb(...args);
    }, waitTime);
  };
};

const myThrottle = (cb, waitTime, opt) => {
  const leading = opt?.leading ?? true;
  const trailling = opt?.trailiing ?? true;
  let done = true;
  let isCalledAgain = false;
  let leadingTimer;
  let trallingTimer;

  return function (...args) {
    if (done) {
      done = false;
      !isCalledAgain && leading && cb(...args);
      leadingTimer = setTimeout(() => {
        done = true;
        leading && cb(...args);
      }, waitTime);
    } else {
      isCalledAgain = true;
      clearTimeout(trallingTimer);
    }
    trallingTimer = setTimeout(() => {
      isCalledAgain = false;
      isCalledAgain && trailling && cb(...args);
    }, waitTime);
  };
};

const handleClick = () => {
  console.log("test");
};

const debouncedFunc = myDebounce(handleClick, 2000, {
  leading: true,
  trailiing: true
});

const lodashDebounce = _.debounce(handleClick, 2000, {
  leading: true,
  trailing: true
});

const throttleFunc = myThrottle(handleClick, 2000, {
  leading: true,
  trailiing: true
});

const lodashThrottle = _.throttle(handleClick, 2000, {
  leading: true,
  trailiing: true
});

function App() {
  return (
    <div className="App">
      <button onClick={debouncedFunc}>myDebounce</button>
      <button onClick={lodashDebounce}>lodashDebounce</button>
      <button onClick={throttleFunc}>mythrottle</button>
      <button onClick={lodashThrottle}>lodashThrottle</button>
    </div>
  );
}

export default App;
