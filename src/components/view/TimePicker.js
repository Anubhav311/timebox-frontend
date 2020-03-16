import React from 'react';

import './TimePicker.css';
import { HashRouter } from 'react-router-dom';

function TimePicker() {
    const time_picker_element = document.querySelector('.time-picker');

    const hr_element = document.querySelector('.time-picker .hour .hr')
    const min_element = document.querySelector('.time-picker .minute .mn')

    const hr_up = document.querySelector('.time-picker .hour .hour-up')
    const hr_down = document.querySelector('.time-picker .hour .hour-down')

    const min_up = document.querySelector('.time-picker .mn .minute-up')
    const min_down = document.querySelector('.time-picker .mn .minute-down')

    hr_up.addEventListener('click', hour_up);
    hr_down.addEventListener('click', hour_down);

    min_up.addEventListener('click', minute_up);
    min_down.addEventListener('click', minute_down);


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