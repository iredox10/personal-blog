import React from 'react'
import { Header } from '../components/Header';
import FormInput from '../components/FormInput';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormBtn from '../components/FormBtn';

export const Register = () => {

    const [fullName, setFullName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const handleSubmit = () =>{

    }

   return (
     <div>
       <Header />
       <div className="p-5 bg-dark-color mx-5 my-12 md:w-2/6 md:mx-auto">
         <div className="text-center">
           <h1 className=" capitalize text-white text-2xl font-bold">
             Register
           </h1>
         </div>
         <form action={handleSubmit}>
           <FormInput
             labelName={"full Name"}
             labelFor={"fullName"}
             type={"text"}
             name={"fullName"}
             Id={"fullName"}
           />
           <FormInput
             labelName={"username"}
             labelFor={"username"}
             type={"text"}
             name={"username"}
             Id={"username"}
           />
           <FormInput
             labelName={"password"}
             labelFor={"password"}
             type={"password"}
             name={"password"}
             Id={"password"}
           />
           <FormInput
             labelName={"Repeat Password"}
             labelFor={"repeatPassword"}
             type={"password"}
             name={"repeatPassword"}
             Id={"repeatPassword"}
           />
           <FormBtn text={"register"} />
           <p className="text-secondary-color">
             Already have an account?{" "}
             <Link to="/login" className="underline hover:text-yellow">
               login
             </Link>
           </p>
         </form>
       </div>
     </div>
   );
}
