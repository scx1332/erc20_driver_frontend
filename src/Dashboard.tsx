import React from "react";
import "./Dashboard.css";

import TransactionFeed from "./TransactionFeed";
import { BACKEND_URL, useConfigOrNull } from "./ConfigProvider";
import { Routes, Route, Link } from "react-router-dom";
import Accounts from "./Accounts";
import AllowanceBoxDesignTime from "./AllowanceBoxDesignTime";
import Allowances from "./Allowances";
import Balance from "./Balance";

const Dashboard = () => {
    const config = useConfigOrNull();
    if (config == null) {
        return <div>Loading...</div>;
    }
    if (typeof config === "string") {
        return <div>{config}</div>;
    }
    return (
        <div>
            {config ? (
                <div>
                    <div className="top-header">
                        <div className="top-header-title">Erc20 Payments Driver Dashboard</div>
                        <div className="top-header-navigation">
                            <Link to="/">Main</Link>
                            <Link to="/feed">Transaction feed</Link>
                            <Link to="/accounts">Accounts</Link>
                            <Link to="/allowances">Allowances</Link>
                            <Link to="/balance/0x0000000600000006000000060000000600000006">Balance</Link>
                        </div>
                    </div>
                    <div className="main-content">
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <div>
                                        <div>
                                            <div className={"padding"}>
                                                <p>
                                                    Connected to payment driver API url:{" "}
                                                    <a href={BACKEND_URL}>{BACKEND_URL}</a>
                                                </p>
                                                <textarea
                                                    style={{ width: 800, height: 500 }}
                                                    readOnly={true}
                                                    value={JSON.stringify(config, null, 2)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                }
                            />
                            <Route path="feed" element={<TransactionFeed />} />
                            <Route path="accounts" element={<Accounts />} />
                            <Route path="allowances" element={<Allowances />} />
                            <Route path="balance/:account" element={<Balance />} />
                            <Route path="design_allowance_box" element={<AllowanceBoxDesignTime />} />
                        </Routes>
                    </div>
                </div>
            ) : (
                "Connecting to API..."
            )}
        </div>
    );
};

export default Dashboard;
