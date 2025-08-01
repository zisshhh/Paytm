import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import dotenv from 'dotenv'

dotenv.config();

export const Signup = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-96 text-center h-max px-5">
                <Heading lable={"Sign up"} />
                <SubHeading lable="Enter your information to create an account" />
                <InputBox onChange={(e) => {
                    setFirstName(e.target.value);
                }} lable="First Name" placeholder="zisshhh" />
                <InputBox onChange={(e) => {
                    setLastName(e.target.value)
                }} lable="Last Name" placeholder="mira" />
                <InputBox onChange={(e) => {
                    setUsername(e.target.value)
                }} lable="Email" placeholder="zisshh@gmail.com" />
                <InputBox onChange={(e) => {
                    setPassword(e.target.value)
                }} lable="Password" placeholder="123random" />
                <div className="pt-4">
                    <Button onClick={async () => {
                        const respone = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`, {
                            firstName,
                            lastName,
                            username,
                            password
                        });
                        localStorage.setItem("token", respone.data.token)
                        navigate("/dashboard");
                    }} lable="Sign up" />
                </div>
                <BottomWarning lable="Alredy have an account?" buttonText="Sign in"
                    to="/signin" />
            </div>
        </div>
    </div>
}