import React, { useState } from 'react';

import './TimePicker.css';

function TimePicker() {
    const [timeState, setTimeState] = useState({hour: 0, minute: 0})
    const timeBox = 5

    const hour_up = () => {
        let newHour = timeState.hour + 1
        if (newHour > 23) {
            newHour = 0
        } 

        setTimeState({...timeState, hour: newHour});
    }

    function hour_down() {
        let newHour = timeState.hour - 1;
        if (newHour < 0) {
            newHour = 23;
        }

        setTimeState({...timeState, hour: newHour});
    }

    function minute_up() {
        let newMinute = timeState.minute + timeBox;

        if (newMinute > 59) {
            newMinute = 0;
        }

        setTimeState({...timeState, minute: newMinute});
    }

    function minute_down() {
        let newMinute = timeState.minute - timeBox;

        if (newMinute < 0) {
            newMinute = 60 - timeBox;
        }

        setTimeState({...timeState, minute: newMinute})
    }

    function updateTime(e) {
        e.preventDefault()
        console.log(timeState)
    }


    return (
        <div className="time-picker-container" >
                <div className="time-picker" dataTime="00:00">
                    <div className="hour">
                        <div className="hour-up" onClick={hour_up} ></div>
                        <input readOnly type="number" className="hr" value={timeState.hour} />
                        <div className="hour-down" onClick={hour_down} ></div>
                    </div>

                    <div className="separator">:</div>

                    <div className="minute">
                        <div className="minute-up" onClick={minute_up} ></div>
                        <input readOnly type="number" className="mn" value={timeState.minute} />
                        <div className="minute-down" onClick={minute_down} ></div>
                    </div>
                    <button onClick={updateTime}>submit</button>
                </div>
        </div>
    )
}

export default TimePicker;