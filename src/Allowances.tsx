import React, { useCallback, useEffect } from "react";
import AllowanceBox from "./AllowanceBox";
import Allowance from "./model/Allowance";
import {useConfig} from "./ConfigProvider";

interface GetAllowancesResponse {
    allowances: Allowance[];
}

const Allowances = () => {
    const [allowances, setAllowances] = React.useState<GetAllowancesResponse | null>(null);
    const config = useConfig();

    const loadAllowances = useCallback(async () => {
        const response = await fetch(`${config.backendUrl}/allowances`);
        const response_json = await response.json();
        setAllowances(response_json);
    }, []);

    function row(allowance: Allowance, i: number) {
        return <AllowanceBox key={i} allowance={allowance} />;
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
    );
};

export default Allowances;
