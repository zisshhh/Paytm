interface balanceProp {
    value: any
}

export const Balance = ({ value }: balanceProp) => {
    return <div className="flex items-center">
        <div className="text-lg font-medium">
            Your Balance:
        </div>
        <div className="text-xl font-bold pl-2">
            Rs {value}
        </div>
    </div>
}