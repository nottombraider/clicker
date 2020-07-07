import React, {useEffect, useState} from 'react';
import './App.css';

function App() {

    const [repeatCount, setRepeatCount] = useState(0);
    const [breakTimer, setBreakTimer] = useState(0);
    const [breakTimerDisplay, setBreakTimerDisplay] = useState(0);
    const [timerId, setTimerId] = useState();

    const countDown = () => {
        if(timerId){
            clearTimeout(timerId);
        }
        const idTimeOut = setTimeout(() => {
            console.log(breakTimer);
            setBreakTimer(breakTimer - 1);
        }, 1000);
        setTimerId(idTimeOut);
    };

    useEffect(() => {
        if(breakTimer) {
            countDown()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [breakTimer])



  return (
    <div className="app">
        <h1 className="title">Clicker Bublichek</h1>

        <div className="timer-container flex">
            <span>If you need break timer set it before you start to count your repeats. </span>
            <span>Break timer:</span>
            <div>
                <div className="number-display timer-count-down-display">
                    {breakTimer}
                </div>

                <button className="count-change-btn minute-minus-btn"
                        onClick={() => breakTimerDisplay > 0 ? setBreakTimerDisplay(breakTimerDisplay - 1) : 0}> -1 min </button>
                <span className="number-display timer-number-display">{breakTimerDisplay}</span>
                <button className="count-change-btn minute-plus-btn"
                        onClick={() => setBreakTimerDisplay(breakTimerDisplay + 1)}> +1 min </button>

            </div>
        </div>

        <div className="repeat-counter-display">
            <span>Your repeats:</span>
            <div className="number-display repeat-number-display">{repeatCount}</div>

            <button className="reset-btn"
                    onClick={ () => {
                        setRepeatCount(0);
                        setBreakTimer(0);
                        setBreakTimerDisplay(0);
                    } }>
                <i className="fa fa-repeat" aria-hidden="true"/>
            </button>
        </div>

        <div className="button-container flex">
            <button className="count-change-btn bottom-btn-style btn-minus btn-minus-desktop"
                    onClick={() => repeatCount > 0 ? setRepeatCount(repeatCount - 1) : 0}>
                <i className="fa fa-minus" aria-hidden="true"/>
            </button>

            <button className="count-change-btn bottom-btn-style btn-plus btn-plus-desktop"
                    onClick={ () => {
                        setRepeatCount(repeatCount + 1);
                        setBreakTimer(breakTimerDisplay * 60);
                    } }>
                <i className="fa fa-plus" aria-hidden="true"/>
            </button>
        </div>


        <div className="copyrights">
            by @nottombraider
        </div>

    </div>
  );
}

export default App;
