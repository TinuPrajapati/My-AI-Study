import React from 'react'

const Input = ({ text, id, value, change, placeholder, icon }) => {
    return (
        <>
            <label htmlFor={id} className="block text-[1rem] font-semibold pl-2 text-primary">
                {text}
            </label>
            {icon ?
                <div className="mt-1 relative flex items-center">
                    {icon}
                    <input
                        id={id}
                        name="email"
                        type="email"
                        value={value}
                        onChange={change}
                        placeholder={placeholder}
                        className="block w-full text-black font-semibold pl-8 pr-3 py-1 text-[1rem] h-10 border-2 border-secondary rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:ring-2 focus:border-none sm:text-sm"
                    />
                </div> :
                <input
                    id={id}
                    type="text"
                    className="w-full px-4 h-10 border-2 text-gray-900 border-secondary rounded-md outline-none focus:ring-2 focus:ring-primary-400 focus:border-none"
                    value={value}
                    placeholder='Enter Topic Name'
                    onChange={change}
                />
            }
        </>
    )
}

export default Input