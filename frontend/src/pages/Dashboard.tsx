import { Appbaar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/User"

export const Dashboard = () => {
    return <div>
        <Appbaar />
        <div className="m-8">
            <Balance value={"10,000"} />
            <Users />
        </div>
    </div>
}