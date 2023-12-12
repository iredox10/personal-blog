import React from 'react'
import { Header } from '../components/Header';
import FormInput from '../components/FormInput';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormBtn from '../components/FormBtn';
import path from '../../utils/path';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { UseAuthContext } from '../hooks/useAuthContext';

export const Register = () => {

  const {dispatch} = UseAuthContext()

    const [fullName, setFullName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const navigate = useNavigate()

    const handleSubmit =async (e) =>{
      e.preventDefault()
      if(!fullName || !username || !password || !repeatPassword){
        setErrMsg('please fill all the fields')
        return
      }
      if(password !== repeatPassword){
        setErrMsg('password did not match')
        return
      }
      try {
        const res = await axios.post(`${path}/user/sign-up`, {username,fullName,password})
        console.log(res.data)
        if(res.status == 201) {
          dispatch({type: 'login', payload: JSON.stringify(res.data.user)})
          navigate('/')
        } 
      } catch (err) {
        console.log(err)
      }
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
         <form onSubmit={handleSubmit}>
          {errMsg && <p>{errMsg}</p>}
           <FormInput
             labelName={"full Name"}
             labelFor={"fullName"}
             type={"text"}
             name={"fullName"}
             Id={"fullName"}
             onchange={(e) => setFullName(e.target.value)}
           />
           <FormInput
             labelName={"username"}
             labelFor={"username"}
             type={"text"}
             name={"username"}
             Id={"username"}
             onchange={(e) => setUsername(e.target.value)}
           />
           <FormInput
             labelName={"password"}
             labelFor={"password"}
             type={"password"}
             name={"password"}
             Id={"password"}
             onchange={(e) => setPassword(e.target.value)}
           />
           <FormInput
             labelName={"Repeat Password"}
             labelFor={"repeatPassword"}
             type={"password"}
             name={"repeatPassword"}
             Id={"repeatPassword"}
             onchange={(e) => setRepeatPassword(e.target.value)}
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
