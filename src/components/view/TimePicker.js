import React, { useState } from 'react';

import './TimePicker.css';

function TimePicker() {
    const [timeState, setTimeState] = useState({hour: 0, minute: 0})


    // TODO if hour or minute is blank, it will input three zeros. fix that bug.
    // function hour_change(e) {
    //     setTimeState({...timeState, hour: e.target.value})

    //     if (e.target.value > 23) {
    //         setTimeState({...timeState, hour: 23})
    //     } else if (e.target.value < 0) {
    //         setTimeState({...timeState, hour: '00'})
    //     }

    //     if (e.target.value ===  "") {
    //         setTimeState({...timeState, hour: formatTime(timeState.hour)});
    //     }
    // }

    // function minute_change(e) {
    //     setTimeState({...timeState, minute: e.target.value})

    //     if (e.target.value > 59) {
    //         setTimeState({...timeState, minute: 59})
    //     } else if (e.target.value < 0) {
    //         setTimeState({...timeState, minute: '00'})
    //     }

    //     if (e.target.value ===  "") {
    //         setTimeState({...timeState, minute: formatTime(timeState.minute)});
    //     }
    // }

    const hour_up = () => {
        let newHour = timeState.hour + 1
        if (newHour > 23) {
            newHour = 0
        } 

        setTimeState({...timeState, hour: newHour});
    }

    function hour_down() {
        setTimeState({...timeState, hour: timeState.hour - 1});
        if (timeState.hour < 0) {
            setTimeState({...timeState, hour: 23});
        }
    }

    function minute_up() {
        setTimeState({...timeState, minute: timeState.minute + 1});
        if (timeState.minute > 59) {
            setTimeState({...timeState, minute: 0});
            setTimeState({...timeState, hour: timeState.hour + 1});
        }
    }

    function minute_down() {
        setTimeState({...timeState, minute: timeState.minute - 1})
        if (timeState.minute < 0) {
            setTimeState({...timeState, minute: 59})
            setTimeState({...timeState, hour: timeState.hour - 1})
        }
    }

    // function formatTime(time) {
    //     if (time < 10) {
    //         return '0' + time;
    //     }
    //     return time;
    // }


    return (
        <div className="time-picker-container" >
            <h1>Custom<span>Time</span>Picker</h1>
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
            </div>
        </div>
    )
}

export default TimePicker;