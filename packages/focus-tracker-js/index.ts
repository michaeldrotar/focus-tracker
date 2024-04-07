// const focusTrackerEl: { current: HTMLElement | null } = { current: null };

// let loopId = 0;
// let target = undefined as HTMLElement | undefined;
// let isKeyboard = false;

// const getFocusedElement = () => {
//   const activeElement = document.activeElement as HTMLElement;
//   if (activeElement === document.body) return undefined;
//   return activeElement;
// };

// const getVisuallyFocusedElement = () => {
//   const focusedElement = getFocusedElement();
//   if (!focusedElement) return undefined;
//   // find self or parent element that has data-focus-tracker--parent attribute defined
//   let parent: HTMLElement | null = focusedElement;
//   while (parent) {
//     if (parent.hasAttribute("data-focus-tracker--parent")) return parent;
//     parent = parent.parentElement;
//   }
//   return focusedElement;
// };

// const getElementPosition = (element: HTMLElement) => {
//   const position = { x: 0, y: 0 };
//   while (element && element !== document.body) {
//     position.x += element.offsetLeft;
//     position.y += element.offsetTop;
//     element = element.offsetParent as HTMLElement;
//   }
//   return position;
// };

// const disableTransition = () => {
//   const tracker = focusTrackerEl.current;
//   if (!tracker) return;
//   tracker.style.transition = "none";
// };
// const enableTransition = () => {
//   const tracker = focusTrackerEl.current;
//   if (!tracker) return;
//   tracker.style.transition = "";
// };

// const updateTracker = (target: HTMLElement) => {
//   const tracker = focusTrackerEl.current;
//   if (!tracker) return;

//   const position = getElementPosition(target);
//   tracker.style.left = `${position.x}px`;
//   tracker.style.top = `${position.y}px`;
//   tracker.style.width = `${target.offsetWidth}px`;
//   tracker.style.height = `${target.offsetHeight}px`;
//   tracker.style.borderRadius = `${
//     window.getComputedStyle(target).borderRadius
//   }`;
// };

// const addTracker = (target: HTMLElement) => {
//   const tracker = focusTrackerEl.current;
//   if (!tracker) return;

//   disableTransition();
//   updateTracker(target);
//   tracker.style.opacity = "0";
//   tracker.style.transform = "scale(2)";

//   window.requestAnimationFrame(() => {
//     enableTransition();
//     tracker.style.opacity = "1";
//     tracker.style.transform = "scale(1)";
//   });
// };

// const removeTracker = () => {
//   const tracker = focusTrackerEl.current;
//   if (!tracker) return;

//   tracker.style.opacity = "0";
//   tracker.style.transform = "scale(2)";
// };

// const updateFocus = () => {
//   if (isKeyboard) {
//     const focusedElement = getVisuallyFocusedElement();
//     if (!focusedElement) {
//       removeTracker();
//     } else if (!target && focusedElement) {
//       addTracker(focusedElement);
//     } else if (target !== focusedElement) {
//       updateTracker(focusedElement);
//     }
//     if (target !== focusedElement) target = focusedElement;
//   } else if (target) {
//     removeTracker();
//     target = undefined;
//   }
// };

// const listener = (event: KeyboardEvent | MouseEvent) => {
//   const wasKeyboard = isKeyboard;
//   if ("key" in event) {
//     if (event.key === "Tab") isKeyboard = true;
//   } else {
//     isKeyboard = false;
//   }
//   if (wasKeyboard !== isKeyboard) {
//     if (isKeyboard) {
//       document.documentElement.classList.add("focus-tracker-visible");
//     } else {
//       document.documentElement.classList.remove("focus-tracker-visible");
//     }
//   }
// };

// document.addEventListener("keydown", listener);
// document.addEventListener("mousedown", listener);

// const loop = () => {
//   updateFocus();
//   loopId = requestAnimationFrame(loop);
// };
// loop();

// return () => {
//   cancelAnimationFrame(loopId);
//   document.removeEventListener("keydown", listener);
//   document.removeEventListener("mousedown", listener);
// };

//   return (
//     <>
//       <div
//         ref={focusTrackerEl}
//         className="pointer-events-none absolute z-50 border-2 border-red-400 ring-1 ring-red-500 transition-all duration-200 ring-blur-8"
//         style={{ opacity: 0 }}
//       ></div>
//     </>
//   );

enum States {
  stopped = 'stopped',
  running = 'running',
}
type Brand<K, T> = K & { __type: T }
export type MPG = Brand<number, 'MPG'>
export type Gallons = Brand<number, 'Gas'>

export const report = (
  distance: number,
  gas: number,
  used: number,
  state: States,
) => {
  console.log(
    `Distance: ${Math.round(distance)} | Gas Used: ${Math.round(
      used,
    )} | Gas Left: ${Math.round(gas)} | Final State: ${state}`,
  )
}

export class NewCar {
  state: States
  gas: Gallons
  mpg: MPG
  constructor(gas: Gallons, mpg: MPG) {
    this.gas = gas
    this.mpg = mpg
    this.state = States.stopped
  }
  start = () => {
    console.log('Starting car!')
    if (this.gas > 0) {
      this.state = States.running
    } else {
      console.log('No gas!')
    }
  }
  fill = (gallon: Gallons) => {
    this.gas = (this.gas + gallon) as Gallons
  }
  transitions: Record<States, { drive: (distance: number) => void }> = {
    [States.stopped]: {
      drive: (distance: number) => {
        console.log("Can't drive - car not started!")
      },
    },
    [States.running]: {
      drive: (distance: number) => {
        const gasToUse = distance / this.mpg
        if (this.gas > gasToUse) {
          this.state = States.running
          this.gas = (this.gas - gasToUse) as Gallons
          report(distance, this.gas, gasToUse, this.state)
        } else {
          this.state = States.stopped
          const gasLeft = this.gas
          const drivableDistance = this.gas * this.mpg
          this.gas = (this.gas - gasLeft) as Gallons
          console.log('Car turned off!')
          report(drivableDistance, this.gas, gasLeft, this.state)
        }
      },
    },
  }
  drive(distance: number) {
    this.transitions[this.state].drive(distance)
  }
}
