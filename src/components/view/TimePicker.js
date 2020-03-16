import React, { useState } from 'react';

import './TimePicker.css';
import { HashRouter } from 'react-router-dom';

function TimePicker() {
    let d = new Date()

    let hour = d.getHours();
    let minute = d.getMinutes();
    const [timeState, setTimeState] = useState({hour: hour, minute: minute})
    setTime();

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
            e.target.value = 23;
        } else if (e.target.value < 0) {
            e.target.value = '00';
        }

        if (e.target.value ===  "") {
            e.target.value = formatTime(hour);
        }

        hour = e.target.value
    }

    function minute_change(e) {
        if (e.target.value > 59) {
            e.target.value = 59;
        } else if (e.target.value < 0) {
            e.target.value = '00';
        }

        if (e.target.value ===  "") {
            e.target.value = formatTime(minute);
        }

        minute = e.target.value
    }

    function hour_up() {
        setTimeState({hour: timeState.hour + 1, minute: timeState.minute});
        if (timeState.hour > 23) {
            setTimeState({hour: 0, minute: timeState.minute})
        }
    }

    function hour_down() {
        hour--;
        if (hour < 0) {
            hour = 23;
        }
        setTime();
    }

    function minute_up() {
        minute++;
        if (minute > 59) {
            minute = 0;
            hour++;
        }
        setTime();
    }

    function minute_down() {
        minute--;
        if (minute < 0) {
            minute = 59;
            hour--;
        }
        setTime();
    }

    function setTime() {
        // setTimeState({hour: formatTime(timeState.hour), minute: formatTime(timeState.minute)})
        // hr_element.value = formatTime(timeState.hour);
        // min_element.value = formatTime(timeState.minute);
        // time_picker_element.dataset.time = formatTime(timeState.hour) + ':' + formatTime(timeState.minute);
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