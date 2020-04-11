import React, { useState } from 'react'

import Tab from './Tab';
import '../../styles/tabsStyles.css';

function Tabs(props) {

    const [activeTab, setActiveTab] = useState(props.children[0].props.label)

    function onClickTabItem(tab) {
        setActiveTab( tab );
    }

    return (
        <div className="tabs">
            <div className="tab-list">
                {props.children.map((child) => {
                    const { label } = child.props;
                    return (
                        <Tab
                            activeTab={activeTab}
                            key={label}
                            label={label}
                            onClick={onClickTabItem}
                        />
                    );
                })}
            </div>
            <div className="tab-content">
                {props.children.map((child) => {
                    if (child.props.label !== activeTab) return undefined;
                    return child.props.children;
                })}
            </div>
        </div>
    );
}


export default Tabs;
