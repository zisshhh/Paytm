import axios from "axios"
import { Appbaar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/User"
import { useEffect, useState } from "react"

export const Dashboard = () => {

    const [balance, setBalance] = useState("");

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/account/balance`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            setBalance(res.data.balance);
        });
    }, []);

    return <div>
        <Appbaar />
        <div className="m-8">
            <Balance value={balance} />
            <Users />
        </div>
    </div>
}