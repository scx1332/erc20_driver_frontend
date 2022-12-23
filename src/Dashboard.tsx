import React from "react"
import './Dashboard.css';

import TransactionFeed from "./TransactionFeed";
import {useConfig} from "./ConfigProvider";


const Dashboard = () => {
    const [config] = useConfig();
    return (
        <div>
            <h1>Dashboard {}</h1>
            {config ? (<div><TransactionFeed/></div>) : ("Loading config...")}
        </div>
    )
}

export default Dashboard;