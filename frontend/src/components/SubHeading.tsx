interface lableProps {
    lable: string
}

export const SubHeading = ({lable}: lableProps) => {
    return <div className="text-slate-500 text-md pt-1 px-4 pb-6">
        {lable}
    </div>
}