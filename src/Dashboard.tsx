import React from "react"
import './Dashboard.css';

import TransactionFeed from "./TransactionFeed";

const BACKEND_URL = "http://localhost:8080"
const MAX_VISIBLE_TXS = 10;

const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <div><TransactionFeed/></div>
        </div>
    )
}

export default Dashboard;