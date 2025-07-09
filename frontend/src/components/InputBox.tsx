interface inputProp {
    lable: string,
    placeholder: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputBox = ({ lable, placeholder, onChange }: inputProp) => {
    return <div>
        <div className="text-sm font-medium text-left py-2">
            {lable}
        </div>
        <input onChange={onChange} placeholder={placeholder} className="border rounded border-slate-200 w-full px-2 py-2" />
    </div>
} 