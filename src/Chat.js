import React, { useEffect,useState } from 'react'
import "./Chat.css"
import {Avatar,IconButton} from "@material-ui/core"
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import { useParams } from 'react-router-dom';
import { addDoc, collection } from "firebase/firestore";
import { onSnapshot,doc, orderBy,query } from 'firebase/firestore';
import {db} from "./Firebase";
import { useStateValue } from './StateProvider';
import { serverTimestamp } from '@firebase/firestore'
import {useNavigate} from "react-router-dom"



export default function Chat() {
  const [seed,setseed]=useState("");
  const [roomname,setroomname]=useState("")
  const [input,setinput]=useState("")
  const [{user},dispatch]=useStateValue();

  // console.log(dispatch)


  const [messages,setmessages]=useState()
  
  const {roomid}=useParams();

  const [once,setonce]=useState(true)

  
  const navigate = useNavigate();


  // const [count,setcount]=useState(1)

  


  // console.log(roomname)

  


  // console.log(count);


  // useEffect(()=>{
  //   navigate("")
  // })
  // console.log(once)
  
  

  

  useEffect(() => {
    if(once){
      navigate("/rooms/AmvvlA8tMa0EGHwH8Hdx")
      setonce(false)
    }
  }, []);


  
  // console.log(once)

  

  useEffect(()=>{
    setseed(Math.floor(Math.random()*5000))
  },[roomid]);


  useEffect(()=>{
    if(roomid){
      const coolref1=doc(db,"rooms",`${roomid}`)
      onSnapshot(coolref1,(snapshot)=>(setroomname(snapshot.data().name)))
      

    }
  },[roomid]);
  

  useEffect(()=>{
    if(roomid){
      const coolref2=collection(db,"rooms",`${roomid}`,"messages")

      const coolref2n = query(coolref2, orderBy("timestamp", "asc"));

      // orderBy("timestamp","asc")
      onSnapshot(coolref2n,(snapshot=>setmessages(snapshot.docs.map((doc)=>doc.data()))))
    }
  },[roomid,input]);
  

  const sendmessage=(e)=>{
    e.preventDefault();
     

    const coolref=collection(db,"rooms",`${roomid}`,"messages");
      addDoc(coolref,{
        name:user.displayName,
        message:input,
        timestamp: serverTimestamp()
        // timestamp:FieldValue.serverTimestamp()
      
      }) 
    setinput("")
  }

  

  


  




  return (


    <div className='chat'>

      {/* part1 */}
      <div className='chat_header'>

        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

        <div className='chat_headerinfo'>
          <h3>{roomname}</h3>
          <p>Last seen at...{!messages?null:new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
        </div>

        <div className='chat_headerright'>
          <IconButton>
            <SearchIcon/>
          </IconButton>

          <IconButton>
              <AttachFileIcon/>
          </IconButton>
          
          <IconButton>
              <MoreVertIcon/>
          </IconButton>

        </div>
      </div>


      {/* part2 */}
      <div className='chat_body'>
        {/* {!messages ? console.log("chats empty")    : <Chatmini key={messages.map((message)=>(message.message))}  messages={messages} />}    */}
        {/* {messages.map((message)=>(<p className={`chat_message ${true && 'chat_reciever'} `}><span className='chat_name'>{message.name}</span>{message.message}<span className='chat_timestamp'>{message.name}</span></p>))}       */}
        {!messages ? null : messages.map((message,i)=>(<p key={i} className={`chat_message ${message.name === user.displayName && 'chat_reciever'} `}><span className='chat_name'>{message.name}</span>{message.message}<span className='chat_timestamp'>{new Date(message.timestamp?.toDate()).toUTCString()}</span></p>))
}
      </div>


      {/* part3 */}
      <div className='chat_footer'>
        <InsertEmoticonIcon/>

        <form>
          <input value={input} onChange={e=>setinput(e.target.value)} placeholder='Type a message' type="text"/>
          <button type='submit' onClick={sendmessage}>Send a message</button>
        </form>
        <MicIcon/>


      </div>

      
    </div>
  )
}
