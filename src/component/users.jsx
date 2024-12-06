import axios from "axios";
import { useEffect, useState } from "react";

const Users=()=>{
    useEffect(()=>{
        getUsers();
    },[])
    const [users, setUsers] = useState([]);
    const getUsers=async ()=>{
        const token= localStorage.getItem("token");
        try{
            const res=await axios.get('/users',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setUsers(res.data);
        }catch(err){
            console.log('err')
        }
    }
    return(
        <div>
            <h1>Users</h1>
            <table>
                <thead>
                    <th>id</th>
                    <th>FirstName</th>
                    <th>LastName</th>
                </thead>
                <tbody>
                    {users.map((user)=>(
                        <tr className="user" key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default Users;