import { useState } from 'react'
import FormInput from '../components/FormInput'
import FormBtn from '../components/FormBtn'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'

export const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const handleSubmit = async () =>{

    }
  return (
    <div>
      <Header />
      <div className="p-5 bg-dark-color mx-5 my-16 md:w-2/6 md:mx-auto">
        <div className="text-center">
          <h1 className=" capitalize text-white text-2xl font-bold">login</h1>
        </div>
        <form action={handleSubmit}>
          <FormInput
            labelName={"username"}
            labelFor={"username"}
            type={"text"}
            name={"username"}
            Id={"username"}
            onchange={(e) => setUsername(e.targer.value)}
          />
          <FormInput
            labelName={"password"}
            labelFor={"password"}
            type={"password"}
            name={"password"}
            Id={"password"}
            onchange={(e) => setPassword(e.targer.value)}
          />
          <FormBtn text={"login"} />
        </form>
        <p className="text-secondary-color">
          Don't have an account?{" "}
          <Link to="/register" className="underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
