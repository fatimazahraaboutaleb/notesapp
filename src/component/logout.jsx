import axios from "axios";
import { useEffect } from "react";

const Logout=()=>{
    useEffect(()=>{
        logoutfunction();
    },[])
    const logoutfunction=async ()=>{
        try {
            const token = localStorage.getItem("token");
            await axios.post("/logout", {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            localStorage.clear(); 
            window.location.href="/";
        }catch(err){
            console.log(err);
        }
    }
}
export default Logout;