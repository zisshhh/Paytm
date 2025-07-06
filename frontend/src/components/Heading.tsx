interface lableProps { 
    lable: string
}

export const Heading = ({lable}: lableProps) => {
    return <div className="font-bold text-4xl pt-6">
        {lable}
    </div>
}