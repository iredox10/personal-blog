import React from 'react'

const Btn = ({type,text,style,onclick}) => {
  return (
    <div>
        <button onClick={onclick} type={type} className={`py-1 px-4 font-bold rounded-full capitalize   ${style}`}>{text}</button>
    </div>
  )
}

export default Btn