import React from 'react';

import './TimePicker.css';
import { HashRouter } from 'react-router-dom';

function TimePicker() {
    const time_picker_element = document.querySelector('.time-picker');

    const hr_element = document.querySelector('.time-picker .hour .hr')
    const min_element = document.querySelector('.time-picker .minute .mn')

    const hr_up = document.querySelector('.time-picker .hour .hour-up')
    const hr_down = document.querySelector('.time-picker .hour .hour-down')

    const min_up = document.querySelector('.time-picker .minute .minute-up')
    const min_down = document.querySelector('.time-picker .minute .minute-down')

    let hour = 0
    let minute = 0

    hr_up.addEventListener('click', hour_up);
    hr_down.addEventListener('click', hour_down);

    min_up.addEventListener('click', minute_up);
    min_down.addEventListener('click', minute_down);

    hr_element.addEventListener('change', hour_change);
    min_element.addEventListener('change', minute_change);

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
        hour++;
        if (hour > 23) {
            hour = 0
        }
        setTime();
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
        hr_element.value = formatTime(hour);
        min_element.value = formatTime(minute);
        time_picker_element.dataset.time = formatTime(hour) + ':' + formatTime(minute);
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
                    <div className="hour-up"></div>
                    <input type="number" className="hr" value="00" />
                    <div className="hour-down"></div>
                </div>

                <div className="separator">:</div>

                <div className="minute">
                    <div className="minute-up"></div>
                    <input type="number" className="mn" value="00" />
                    <div className="minute-down"></div>
                </div>
            </div>
        </div>
    )
}

export default TimePicker;