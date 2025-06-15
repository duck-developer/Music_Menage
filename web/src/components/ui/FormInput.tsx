import React from 'react'


interface FormInputProps {
    label: string;
    type?: string;
    name: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = ({ label, type = "text", name, value, onChange }: FormInputProps) => {
    return (
        <label className="flex flex-col">
            {label}:
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className={`bg-gray-800 p-2 rounded outline-none ${name=="nome" && "w-[30rem]"}`}
            />
        </label>
    )
}

export default FormInput