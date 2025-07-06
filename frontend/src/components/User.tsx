import { useState } from "react"

export const User = () => {

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