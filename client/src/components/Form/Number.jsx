import React from 'react'

const Number = ({ text, id, value, change, max,min }) => {
    return (
        <>
            <label htmlFor={id} className="block text-[1rem] font-semibold pl-2 text-primary">{text}</label>
            <input
                id={id}
                type="number"
                min={`${min}`}
                max={`${max}`}
                className="w-full px-4 h-10 border-2 text-gray-900 border-secondary rounded-md outline-none focus:ring-2 focus:ring-primary-400 focus:border-none"
                value={value}
                placeholder='Enter Topic Name'
                onChange={change}
            />
        </>
    )
}

export default Number