import { useEffect, useState } from "react";

export default function Main() {

    const [users,setUsers ] = useState ([])

    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then(data => setUsers(data))
    },[])
  
  return (
    <>
      {
        users.map(user  => <li key={user.id}>name : {user.name}</li>)
      }
    </>
  );
}
