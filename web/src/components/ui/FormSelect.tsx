import React from 'react'

interface FormSelectProps {
    label: string;
    name: string;
    value: string;
    options: { id: number; nome: string }[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    newValue: string;
    setNewValue: (value: string) => void;
    onAddNew: () => void;
}

const FormSelect = ({ label, name, value, options, onChange, newValue, setNewValue, onAddNew }: FormSelectProps) => {
    return (
        <label className="flex flex-col">
            {label}:
            <div className="flex gap-2">
                <select name={name} value={value} onChange={onChange} className="bg-gray-800 p-2 rounded flex-1">
                    <option value="">Selecione um {label.toLowerCase()}</option>
                    {options.map((option) => (
                        <option key={option.id} value={option.id}>{option.nome}</option>
                    ))}
                </select>
                <input type="text" placeholder={`Novo ${label}`} value={newValue} onChange={(e) => setNewValue(e.target.value)} className="bg-gray-800 p-2 rounded flex-1" />
                <button type="button" onClick={onAddNew} className="bg-green-600 px-3 rounded">+</button>
            </div>
        </label>
    )
}

export default FormSelect