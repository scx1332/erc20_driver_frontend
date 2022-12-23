import React from "react"
import './Dashboard.css';
import TxBox from "./TxBox";

const BACKEND_URL = "http://localhost:8080"
const MAX_VISIBLE_TXS = 10;

const Dashboard = () => {
    const [nextRefresh, setNextRefresh] = React.useState(0);
    const [nextTxsReversed, _setNextTxsReversed] = React.useState(null);
    function setNextTxsReversed(txs: any) {
        if (txs != null) {
            if (txs.length >= MAX_VISIBLE_TXS) {
                txs[MAX_VISIBLE_TXS - 1].opacity = 0;
                txs[MAX_VISIBLE_TXS - 1].maxHeight = 0;
            }
            _setNextTxsReversed(txs.slice(0, MAX_VISIBLE_TXS));
        } else {
            _setNextTxsReversed(txs);
        }
    }

    const [txCount, setTxCount] = React.useState(null)




    const loadTxCount = async () => {
        const response = await fetch(`http://127.0.0.1:8080/transactions/count`);
        const response_json = await response.json();
        setTxCount(response_json);
    }
    const loadTxsFeed = async () => {
        const response = await fetch(`http://127.0.0.1:8080/transactions/feed/5/2`);
        const response_json = await response.json();
        let reversed = response_json.txs.slice().reverse().map((tx: any) => {return {"key": tx.tx_id, "data": tx}});

        if (nextTxsReversed == null) {
            setNextTxsReversed(reversed);
            return;
        } else {
            let nReversed = nextTxsReversed.slice();
            let txToAdd = [];
            for (let entry of reversed) {
                let nextTx = entry.data;
                let foundIdx = -1;
                for (let idx = 0; idx < nextTxsReversed.length; idx++) {
                    if (nextTxsReversed[idx].data.id == nextTx.id) {
                        foundIdx = idx;
                        break;
                    }
                }
                if (foundIdx == -1) {
                    console.log(`next id: ${nextTx.id}`);
                    entry.opacity = 0.0;
                    entry.maxHeight = 0;
                    txToAdd.push(entry);
                } else {
                    nReversed[foundIdx].data = nextTx;
                }
            }
            if (txToAdd.length > 0) {
                let newReversed = [...txToAdd, ...nReversed];
                setNextTxsReversed(newReversed);
                await new Promise(r => setTimeout(r, 100));
                for (let tx of newReversed) {
                    tx.opacity = 1.0;
                    tx.maxHeight = 500;
                }
                setNextTxsReversed(newReversed.slice());
            }
        }
    }
    const loadNextClick = async () => {
        loadTxsFeed().then(() => {

        });
    }

    const loadDashboard = async () => {
        const futFeed = loadTxsFeed();
        const futCount = loadTxCount();
        await Promise.all([futFeed, futCount]);
        await new Promise(r => setTimeout(r, 5000));
    }


    React.useEffect(() => {
        console.log("useEffect");
        loadDashboard().then(() => {
            setNextRefresh(nextRefresh + 1);
        });
    }, [])

    React.useEffect(() => {
        if (nextRefresh > 0) {
            loadDashboard().then(() => {
                setNextRefresh(nextRefresh + 1);
            });
        }
    }, [nextRefresh])

    function row(tx: any) {
        let opacity = tx.opacity ?? 1.0;
        let maxHeight = tx.maxHeight ?? 200;

        return (<div key={tx.data.id} style={{opacity: opacity, maxHeight: maxHeight}} className={"tx-wrapper"}>
            <TxBox tx_id={tx.data.id} tx={tx.data} />
            <hr/>
        </div>)
    }

    let displayTxCount = 0;
    if (nextTxsReversed) {
        for (let tx of nextTxsReversed) {
            if (tx.opacity === undefined || tx.opacity > 0) {
                displayTxCount++;
            }
        }
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <div>Displaying {displayTxCount} transactions out of {txCount?.txDone} finished transaction and {txCount?.txQueued} queued</div>
            <button onClick={loadNextClick}>Load new</button>

            {(nextTxsReversed != null) ? (
                <div className={"tx-33"}>
                    {nextTxsReversed.map(row)}
                </div>
                ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}

export default Dashboard;