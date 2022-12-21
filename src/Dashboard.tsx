import React from "react"
import './Dashboard.css';
import TxBox from "./TxBox";

const BACKEND_URL = "http://localhost:8080"

const Dashboard = () => {
    const [nextTxsReversed, setNextTxsReversed] = React.useState(null);

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
        let reversed = response_json.txs.slice().reverse();
        setNextTxsReversed(reversed);
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
    const loadNextClick = async () => {
        const response = await fetch(`http://127.0.0.1:8080/transactions/next/2`);
        const response_json = await response.json();
        let nReversed = nextTxsReversed.slice();
        let txToAdd = [];
        for (const nextTx of response_json.txs) {
            let found = false;
            for (const currentTx of nextTxsReversed) {
                if (currentTx.id == nextTx.id) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                console.log(`next id: ${nextTx.id}`);
                nextTx.opacity = 0.0;
                nextTx.maxHeight = 10;
                txToAdd.push(nextTx);
                setNextTxsReversed([nextTx, ...nReversed]);
            }
        }
        if (txToAdd.length > 0) {
            setNextTxsReversed([...txToAdd, ...nReversed]);
            await new Promise(r => setTimeout(r, 50));
            for (const tx of txToAdd) {
                tx.opacity = 1.0;
                tx.maxHeight = 500;
            }
            setNextTxsReversed([...txToAdd, ...nReversed]);
        }
    }

    const loadDashboard = async () => {
        const fut2 = loadTxsNext();
        const fut3 = loadTxsCurrent();
        const fut4 = loadTxsLast();
        const fut5 = loadTxCount();
        await Promise.all([fut2, fut3, fut4, fut5]);
    }


    React.useEffect(() => {
        console.log("useEffect");
        loadDashboard().then(() => {
        });
    }, [])



    function row(tx: any) {
        let opacity = tx.opacity ?? 0.5;
        let maxHeight = tx.maxHeight ?? 500;

        return (<div key={tx.id} style={{opacity: opacity, maxHeight: maxHeight}} className={"tx-wrapper"}>
            <TxBox tx_id={tx.id} />
            <hr/>
        </div>)
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={loadNextClick}>Load new</button>

            {(lastTxs != null && currentTxs != null && nextTxsReversed != null) ? (
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

export default Dashboard;