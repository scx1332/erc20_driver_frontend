import React, {useCallback, useEffect} from "react";
import {BACKEND_URL} from "./ConfigProvider";
import AllowanceBox from "./AllowanceBox";


const Allowances = () => {
    const [allowances, setAllowances] = React.useState(null);

    const loadAllowances = useCallback(async () => {
        const response = await fetch(`${BACKEND_URL}/allowances`);
        const response_json = await response.json();
        setAllowances(response_json);
    }, []);


    function row(allowance: any, i: any) {
        return (<AllowanceBox key={i} allowance={allowance}/>)
    }

    useEffect(() => {
        loadAllowances().then();
    }, [loadAllowances]);
    return (
        <div>
            <h1>Allowances</h1>
            {allowances?.allowances.map(row)}
            {JSON.stringify(allowances)}
        </div>
    )
}

export default Allowances;