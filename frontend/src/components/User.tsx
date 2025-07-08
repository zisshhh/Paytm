import { useEffect, useState } from "react"
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {

    const [users, setusers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                setusers(response.data.user)
            })
    }, [filter])

    return <>
        <div className="mt-6 font-medium text-lg">
            User
        </div>
        <div className="my-2">
            <input onChange={(e) => {
                setFilter(e.target.value);
            }} type="text" placeholder="Search users..." className="w-full px-2 py-2 border rounded border-slate-300" />
        </div>
        <div>
            {users.map(user => <User user={user} />)}
        </div>
    </>
}

const User = ({ user }: { user: { firstName: string; lastName: string, _id: string } }) => {
    const navigate = useNavigate();

    return <div className="flex m-5 justify-between">
        <div className="flex gap-4">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-full">
            <Button onClick={() => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }} lable={"Send Money"} />
        </div>
    </div>
}