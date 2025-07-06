interface inputProp {
    lable: string,
    placeholder: string
}

export const InputBox = ({ lable, placeholder }: inputProp) => {
    return <div>
        <div className="text-sm font-medium text-left py-2">
            {lable}
        </div>
        <input placeholder={placeholder} className="border rounded border-slate-200 w-full px-2 py-2" />
    </div>
} 