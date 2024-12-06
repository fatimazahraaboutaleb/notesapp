import { useState } from "react";
import axios from "axios";
import "../styles/login.css"

const Login = ({ setIsConnected }) => {
  const [cin, setCin] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post("/login", {
        cin,
        password,
      });
      localStorage.setItem("token", resp.data.token);
      localStorage.setItem("id",resp.data.user.id);
      localStorage.setItem("first_name",resp.data.user.first_name);
      localStorage.setItem("last_name",resp.data.user.last_name);
      console.log(resp.data);
      setIsConnected(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="logindiv">
      <form className="login">
        <p id="title">Azoul Azoul</p>
        <p id="desc">Sign in to your space</p>
        {/* <label htmlFor="cin">cin</label> */}
        <input
          type="text"
          id="cin"
          placeholder="Your CIN"
          value={cin}
          onChange={(e) => {
            setCin(e.target.value);
          }}
        />
        {/* <label htmlFor="pass">password</label> */}
        <input
          type="password"
          id="pass"
          placeholder="Your Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button onClick={handleSubmit}>submit</button>
      </form>
    </div>
  );
};
export default Login;
