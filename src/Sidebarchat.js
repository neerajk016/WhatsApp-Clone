import React, { useEffect,useState } from 'react'
import './Sidebarchat.css'
import {Avatar} from "@material-ui/core"
import { addDoc} from "firebase/firestore";
import {db} from "./Firebase";
import { collection } from "firebase/firestore";
import { Link} from "react-router-dom";
import { onSnapshot,orderBy,query } from 'firebase/firestore';


export default function Sidebarchat({addnewchat,id,name}) {

  const [seed,setseed]=useState("");

  const [messages,setmessages]=useState()


  useEffect(()=>{
    setseed(Math.floor(Math.random()*5000))
  },[]);

  useEffect(()=>{
    
      if(id){
        const coolref2=collection(db,"rooms",`${id}`,"messages")

        const coolref2n = query(coolref2, orderBy("timestamp", "desc"));

        // orderBy("timestamp","asc")
        // orderBy(coolref2,["timestamp"],["asc"])
        // orderBy(coolref2, [{ field: "timestamp", dir: "asc" }])
        onSnapshot(coolref2n,(snapshot=>setmessages(snapshot.docs.map((doc)=>doc.data()))))
      }
    
  },[id])

  const createChat=()=>{
    const roomname=prompt("please enter name for chat room ")

    if(roomname){
      const coolref=collection(db,"rooms");
      addDoc(coolref,{
        name:roomname
      })      
    }
  }

  return !addnewchat ? (
    <Link to={`/rooms/${id}`}>
      <div className='sidebarchat'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <div className='sidebarchat_info'>
          <h2>{name}</h2>
          <p>{!messages? null :messages[0]?.message}</p>
        </div>
      </div>



    </Link>
    
    
  ):(
    <div className='sidebarchat' onClick={createChat}>
      <h2>Add new chat</h2>
    </div>
  )
}
