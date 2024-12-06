import axios from "axios";
import { useEffect, useState } from "react";
import woman from '../img/woman3.png';
import '../styles/profile.css'


const Profile=()=>{
    const [info,setInfo]=useState({})
    const [old_pass,setOldPass]=useState('');
    const [new_pass,setNewPass]=useState('');
    const [confirm_pass,setConfirmPass]=useState('');
    useEffect(() => {
        const infos = {
          id: localStorage.getItem("id"),
          first_name: localStorage.getItem("first_name"),
          last_name: localStorage.getItem("last_name"),
        };
        setInfo(infos);
    }, []);
    const changePssword=async(e)=>{
        e.preventDefault();
        try{
            const token=localStorage.getItem("token");
            const res= await axios.put("/update-password",
                {
                    current_password: old_pass,
                    new_password: new_pass,
                    new_password_confirmation: confirm_pass,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
            );
            localStorage.clear(); 
            window.location.href="/";
            console.log(res)
        }catch(err){
            console.log(err);
            
        }
    }
    return(
        <div className="container">
            <div className="profile-section">
                <h1>Profile</h1>
                <img src={woman} alt="" />
                <p>ID: {info.id}</p>
                <p>First Name: {info.first_name}</p>
                <p>Last Name: {info.last_name}</p>
            </div>
            <div className="password-section">
                <form action="">
                    <h3>Change password</h3>
                    <label htmlFor="old_pass">Current Password</label>
                    <input type="password" id="old_pass" value={old_pass} onChange={(e)=>setOldPass(e.target.value)}/>
                    <label htmlFor="new_pass">New Passwrod</label>
                    <input type="password" id="new_pass" value={new_pass} onChange={(e)=>setNewPass(e.target.value)}/>
                    <label htmlFor="confirm_pass">New Password Confirmation</label>
                    <input type="password" id="confirm_pass" value={confirm_pass} onChange={(e)=>setConfirmPass(e.target.value)}/>
                    <button onClick={changePssword}>Submit</button>
                </form>
            </div>
        </div>
    )
}
export default Profile;