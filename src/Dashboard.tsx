import React from "react"
import './Dashboard.css';
import TxBox from "./TxBox";

const BACKEND_URL = "http://localhost:8080"

const Dashboard = () => {
    const [txCount, setTxCount] = React.useState(null)
    const [lastTxs, setLastTxs] = React.useState(null)
    const [nextTxs, setNextTxs] = React.useState(null)
    const [currentTxs, setCurrentTxs] = React.useState(null)

    const loadTxCount = async () => {
        const response = await fetch(`http://127.0.0.1:8080/transactions/count`);
        const response_json = await response.json();
        setTxCount(response_json);
    }
    const loadTxsNext = async () => {
        const response = await fetch(`http://127.0.0.1:8080/transactions/next/2`);
        const response_json = await response.json();
        setNextTxs(response_json);
    }
    const loadTxsCurrent = async () => {
        const response = await fetch(`http://127.0.0.1:8080/transactions/current`);
        const response_json = await response.json();
        setCurrentTxs(response_json);
    }
    const loadTxsLast = async () => {
        const response = await fetch(`http://127.0.0.1:8080/transactions/last/5`);
        const response_json = await response.json();
        setLastTxs(response_json);
    }

    const loadDashboard = async () => {
        for (let loopNo = 0; ; loopNo++) {
            const fut2 = loadTxsNext();
            const fut3 = loadTxsCurrent();
            const fut4 = loadTxsLast();
            const fut5 = loadTxCount();
            await Promise.all([fut2, fut3, fut4, fut5]);
            await new Promise(r => setTimeout(r, 1000));
        }
    }


    React.useEffect(() => {
        loadDashboard().then(() => {
        });
    }, [])



    let nextTxsReversed = nextTxs?.txs.slice().reverse();

    function row(tx: any, i: any) {
        return (<TxBox key={i} tx={tx}/>)
    }

    return (
        <div>
            <h1>Dashboard</h1>

            {nextTxs != null && lastTxs != null && currentTxs != null ? (
                <div className={"tx-33"}>
                    {nextTxsReversed.map(row)}
                    {currentTxs.txs.map(row)}
                    {lastTxs.txs.map(row)}
                </div>
                ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}

export default Dashboard