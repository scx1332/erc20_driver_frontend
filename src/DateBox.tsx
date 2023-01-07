import React from "react";
import {DateTime, Interval} from "luxon";
import "./DateBox.css"

interface DateBoxProps {
    date: string | null,
    title: string
}
function render(title: string, date: string, msg: string, extraInfo: string) {
    return (<div title={extraInfo} className={"date-container"}>
        <div className={"date-container-title"}>{title}</div>
        <div className={"date-container-date"}>{date}</div>
        <div className={"date-container-msg"}>{msg}</div>
    </div>)
}

const DateBox = (props: DateBoxProps) => {
    let dateNow = DateTime.now();
    let dateStr = props.date;

    let title = props.title;
    let date = "N/A";
    let msg = "-";
    let extraInfo = "Date not yet available";


    if (dateStr == null) {
        return render(title, date, msg, extraInfo);
    }

    try {
        let luxonDate = DateTime.fromISO(dateStr);
        let currentDate = DateTime.now();

        let interval = Interval.fromDateTimes(luxonDate, dateNow);

        let message;
        if (interval.length('days') > 3) {
            message = Math.floor(interval.length('days')) + " days ago";
        } else if (interval.length('hours') > 3) {
            message = Math.floor(interval.length('hours')) + " hours ago";
        } else if (interval.length('minutes') > 3) {
            message = Math.floor(interval.length('minutes')) + " min. ago";
        } else {
            message = Math.floor(interval.length('seconds')) + " sec. ago";
        }

        let dateMsg = luxonDate.toFormat("yyyy-LL-dd HH:mm:ss");
        if (luxonDate.toFormat("yyyy-LL-dd") === currentDate.toFormat("yyyy-LL-dd")) {
            dateMsg = luxonDate.toFormat("HH:mm:ss");
        }

        extraInfo = "Iso date: " + luxonDate.toUTC().toFormat("yyyy-LL-dd HH:mm:ss");
        return render(title, dateMsg, message, extraInfo);

    } catch (e) {
        return render(title, "error", `${e}`, `${e}`);
    }
}

export default DateBox;