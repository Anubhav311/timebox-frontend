import React, { useState } from 'react';

import './TimePicker.css';
import { HashRouter } from 'react-router-dom';

function TimePicker() {
    let d = new Date()

    let hour = d.getHours();
    let minute = d.getMinutes();
    const [timeState, setTimeState] = useState({hour: hour, minute: minute})

    const time_picker_element = document.querySelector('.time-picker');

    const hr_element = document.querySelector('.time-picker .hour .hr')
    const min_element = document.querySelector('.time-picker .minute .mn')

    const hr_up = document.querySelector('.time-picker .hour .hour-up')
    const hr_down = document.querySelector('.time-picker .hour .hour-down')

    const min_up = document.querySelector('.time-picker .minute .minute-up')
    const min_down = document.querySelector('.time-picker .minute .minute-down')


    // hr_up.addEventListener('click', hour_up);
    // hr_down.addEventListener('click', hour_down);

    // min_up.addEventListener('click', minute_up);
    // min_down.addEventListener('click', minute_down);

    // hr_element.addEventListener('change', hour_change);
    // min_element.addEventListener('change', minute_change);

    // TODO if hour or minute is blank, it will input three zeros. fix that bug.
    function hour_change(e) {
        if (e.target.value > 23) {
            setTimeState({...timeState, hour: 23})
        } else if (e.target.value < 0) {
            setTimeState({...timeState, hour: '00'})
        }

        // if (e.target.value ===  "") {
        //     e.target.value = formatTime(hour);
        // }

        setTimeState({...timeState, hour: e.target.value})
        // hour = e.target.value
    }

    function minute_change(e) {
        if (e.target.value > 59) {
            setTimeState({...timeState, minute: 59})
        } else if (e.target.value < 0) {
            setTimeState({...timeState, minute: '00'})
        }

        // if (e.target.value ===  "") {
        //     e.target.value = formatTime(minute);
        // }

        setTimeState({...timeState, minute: e.target.value})
        // minute = e.target.value
    }

    function hour_up() {
        setTimeState({...timeState, hour: timeState.hour + 1});
        if (timeState.hour > 23) {
            setTimeState({...timeState, hour: 0});
        }
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


    function formatTime(time) {
        if (time < 10) {
            time = '0' + time;
        }
        return time;
    }


    return (
        <div className="time-picker-container" >
            <h1>Custom<span>Time</span>Picker</h1>
            <div className="time-picker" dataTime="00:00">
                <div className="hour">
                    <div className="hour-up" onClick={hour_up} ></div>
                    <input type="number" className="hr" value={timeState.hour} onChange={hour_change} />
                    <div className="hour-down" onClick={hour_down} ></div>
                </div>

                <div className="separator">:</div>

                <div className="minute">
                    <div className="minute-up" onClick={minute_up} ></div>
                    <input type="number" className="mn" value={timeState.minute} onChange={minute_change} />
                    <div className="minute-down" onClick={minute_down} ></div>
                </div>
            </div>
        </div>
    )
}

export default TimePicker;