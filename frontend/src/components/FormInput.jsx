
const FormInput = ({value,type,name,id,onchange,labelFor,labelName}) => {
  return (
    <div className="flex flex-col mb-3">
        <label htmlFor={labelFor} className="text-white capitalize mb-1">{labelName}</label>
        <input type={type} value={value} name={name} id={id} onChange={onchange}
        className="p-2 rounded-full bg-[#BABABA]"
        />
    </div>
  )
}

export default FormInput