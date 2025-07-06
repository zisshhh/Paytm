import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const Signup = () => {
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-96 text-center h-max px-5">
                <Heading lable={"Sign up"} />
                <SubHeading lable="Enter your information to create an account" />
                <InputBox lable="First Name" placeholder="zisshhh" />
                <InputBox lable="Last Name" placeholder="mira" />
                <InputBox lable="Email" placeholder="zisshh@gmail.com" />
                <InputBox lable="Password" placeholder="123random" />
                <div className="pt-4">
                    <Button lable="Sign up" />
                </div>
                <BottomWarning lable="Alredy have an account?" buttonText="Sign in"
                    to="/signin" />
            </div>
        </div>
    </div>
}