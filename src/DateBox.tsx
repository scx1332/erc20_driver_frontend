import React from "react";
import {DateTime, Interval} from "luxon";

interface DateBoxProps {
    date: string
}

const DateBox = (props: DateBoxProps) => {
    let dateNow = DateTime.now();
    let dateStr = props.date;

    if (!dateStr) {
        return <div className={"date-box"}>N/A</div>
    }

    try {
        let luxonDate = DateTime.fromISO(dateStr);


        let interval = Interval.fromDateTimes(luxonDate, dateNow);

        let message = "unknown";
        if (interval.length('days') > 3) {
            message = Math.floor(interval.length('days')) + " days ago";
        } else if (interval.length('hours') > 3) {
            message = Math.floor(interval.length('hours')) + " hours ago";
        } else if (interval.length('minutes') > 3) {
            message = Math.floor(interval.length('minutes')) + " minutes ago";
        } else {
            message = Math.floor(interval.length('seconds')) + " seconds ago";
        }


        return (<div className={"date-container"}>
            <div className={"date-date"}>{luxonDate.toFormat("yyyy-LL-dd HH:mm:ss")}</div>
            <div className={"date-ago"}>{message}</div>
        </div>)
    } catch (e) {
        return (<div className={"date-container"}>
            ERROR
        </div>)
    }



}

export default DateBox;