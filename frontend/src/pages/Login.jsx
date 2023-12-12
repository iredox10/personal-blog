import { useState } from "react";
import FormInput from "../components/FormInput";
import FormBtn from "../components/FormBtn";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import path from "../../utils/path";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrMsg("please fill all the fields");
      return;
    }
    try {
      const res = await axios.post(`${path}/user/login`, {
        username,
        password,
      });
      if (res.data.user.isAdmin) {
        navigate("/admin");
      }
      navigate("/");
    } catch (err) {
      setErrMsg(err.response.data);
    }
  };

  return (
    <div>
      <Header />
      <div className="p-5 bg-dark-color mx-5 my-16 md:w-2/6 md:mx-auto">
        <div className="text-center">
          <h1 className=" capitalize text-white text-2xl font-bold">login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          {errMsg && <p>{errMsg}</p>}
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
};
