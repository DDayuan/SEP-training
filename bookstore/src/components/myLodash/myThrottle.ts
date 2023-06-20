type Procedure = (...args: any[]) => void;

function throttle<F extends Procedure>(func: F, waitMilliseconds: number = 0): F {
    let timeoutId: ReturnType<typeof setTimeout> | undefined = undefined;
  
    function wrapper(this: ThisParameterType<F>, ...args: Parameters<F>): void {
      if (timeoutId) {
        return;
      }
  
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        timeoutId = undefined;
      }, waitMilliseconds);
    }
  
    return wrapper as F;
  }
  
  export default throttle;