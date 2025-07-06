import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const Signin = () => {
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-96 text-center h-max px-5">
                <Heading lable={"Sign in"} />
                <SubHeading lable="Enter your credentials to access your account" />
                <InputBox lable="Email" placeholder="zisshhh@gmail.com" />
                <InputBox lable="Password" placeholder="123random" />
                <div className="pt-4">
                    <Button lable="Sign in" />
                </div>
                <BottomWarning lable="Don't have an account?" buttonText="Sign up" to="/signup"/>
            </div>
        </div>
    </div>
}