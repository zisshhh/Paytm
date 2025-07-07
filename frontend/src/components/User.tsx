import { useState } from "react"
import { Button } from "./Button";

export const Users = () => {

    const [users, setusers] = useState([{
        firstName: "zisshh",
        lastName: "mira",
        _id: 1
    }]);

    return <>
        <div className="mt-6 font-medium text-lg">
            User
        </div>
        <div className="my-2">
            <input type="text" placeholder="Search users..." className="w-full px-2 py-2 border rounded border-slate-300"/>
        </div>
        <div>
            {users.map(user => <User user={user} />)}
        </div>
    </>
}

const User = ({user} : {user: {firstName: string; lastName: string}}) =>  {
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
            <Button lable={"Send Money"}/>
        </div>
    </div>
}