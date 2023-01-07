import React, {useCallback} from "react"
import './TransactionFeed.css';
import TxBox from "./TxBox";

const MAX_VISIBLE_TXS = 10;

const TransactionFeed = () => {
    const [nextRefresh, setNextRefresh] = React.useState(0);
    const [nextTxsReversed, _setNextTxsReversed] = React.useState(null);
    const setNextTxsReversed = useCallback((txs: any) => {
        if (txs != null) {
            if (txs.length >= MAX_VISIBLE_TXS) {
                txs[MAX_VISIBLE_TXS - 1].opacity = 0;
                txs[MAX_VISIBLE_TXS - 1].maxHeight = 0;
            }
            _setNextTxsReversed(txs.slice(0, MAX_VISIBLE_TXS));
        } else {
            _setNextTxsReversed(txs);
        }
    }, []);

    const [txCount, setTxCount] = React.useState(null)

    const loadTxCount = useCallback(async () => {
        const response = await fetch(`http://127.0.0.1:8080/transactions/count`);
        const response_json = await response.json();
        setTxCount(response_json);
    }, []);

    const loadTxsFeed = useCallback(async () => {
        const response = await fetch(`http://127.0.0.1:8080/transactions/feed/5/2`);
        const response_json = await response.json();
        const reversed = response_json.txs.slice().reverse().map((tx: any) => {return {"key": tx.tx_id, "data": tx}});

        if (nextTxsReversed == null) {
            setNextTxsReversed(reversed);
            return;
        } else {
            const nReversed = nextTxsReversed.slice();
            const txToAdd = [];
            for (const entry of reversed) {
                const nextTx = entry.data;
                let foundIdx = -1;
                for (let idx = 0; idx < nextTxsReversed.length; idx++) {
                    if (nextTxsReversed[idx].data.id === nextTx.id) {
                        foundIdx = idx;
                        break;
                    }
                }
                if (foundIdx === -1) {
                    entry.opacity = 0.0;
                    entry.maxHeight = 0;
                    txToAdd.push(entry);
                } else {
                    nReversed[foundIdx].data = nextTx;
                }
            }
            if (txToAdd.length > 0) {
                const newReversed = [...txToAdd, ...nReversed];
                setNextTxsReversed(newReversed);
                await new Promise(r => setTimeout(r, 100));
                for (const tx of newReversed) {
                    tx.opacity = 1.0;
                    tx.maxHeight = 500;
                }
                setNextTxsReversed(newReversed.slice());
            }
        }
    }, [nextTxsReversed, setNextTxsReversed]);

    const loadDashboard = useCallback(async () => {
        const futFeed = loadTxsFeed();
        const futCount = loadTxCount();
        await Promise.all([futFeed, futCount]);
        await new Promise(r => setTimeout(r, 5000));
    }, [loadTxsFeed, loadTxCount]);


    React.useEffect(() => {
        console.log("Refreshing dashboard...");
        loadDashboard().then(() => {
            setNextRefresh(nextRefresh + 1);
        });
    }, [loadDashboard, nextRefresh])

    const row = (tx: any) => {
        const opacity = tx.opacity ?? 1.0;
        const maxHeight = tx.maxHeight ?? 200;

        return (<div key={tx.data.id} style={{opacity: opacity, maxHeight: maxHeight}} className={"tx-wrapper"}>
            <TxBox tx_id={tx.data.id} tx={tx.data} />
        </div>)
    }

    let displayTxCount = 0;
    if (nextTxsReversed) {
        for (const tx of nextTxsReversed) {
            if (tx.opacity === undefined || tx.opacity > 0) {
                displayTxCount++;
            }
        }
    }

    return (
        <div>
            <h3>Transaction feed</h3>
            <div>Displaying {displayTxCount} transactions out of {txCount?.txDone} finished transaction and {txCount?.txQueued} queued</div>

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

export default TransactionFeed;