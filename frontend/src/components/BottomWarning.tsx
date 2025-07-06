import { Link } from 'react-router-dom'

interface warningProps {
    lable: string,
    buttonText: string,
    to: string
}

export const BottomWarning = ({ lable, buttonText, to }: warningProps) => {
    return <div className="py-2 flex justify-center text-sm">
        <div>
            {lable}
        </div>
        <Link className="pointer underline cursor-pointer pl-1" to={to}>
            {buttonText}
        </Link>
    </div>
}