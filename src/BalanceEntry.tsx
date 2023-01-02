import React from "react";
import {DateTime} from "luxon";
import ChainTransfer from "./model/ChainTransfer";
import TransferIn from "./model/TransferIn";
import BalanceEvent from "./model/BalanceEvent";
import DateBox from "./DateBox";




interface BalanceEntryProps {
    event: BalanceEvent
}

const BalanceEntry = (props:BalanceEntryProps) => {
    let title = "Unknown entry";
    if (props.event.transferIn !== null) {
        title = `Transfer in`;
    } else if (props.event.chainTransfer !== null) {
        title = `Chain transfer`;
    }

    return(<div>
        <span>{title} {props.event.date.toJSDate().toISOString()} {props.event.transferred.toString()} - balance: {props.event.balance.toString()}</span>
    </div>);

};

export default BalanceEntry;