import React from 'react'

const Select = ({text,id,value,change,option}) => {
    return (
        <>
            <label htmlFor={id} className="block text-[1rem] font-semibold pl-2 text-primary">{text}</label>
            <select
                id={id}
                className="w-full px-4 h-10 text-gray-900 border-2 border-secondary rounded-md outline-none focus:ring-2 focus:ring-primary-400 focus:border-none"
                value={value}
                onChange={change}
            >
                <option value="">Choose Level</option>
                {option.map((item, index) => <option key={index} value={item}>{item}</option>)}
            </select>
        </>
    )
}

export default Select