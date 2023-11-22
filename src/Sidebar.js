import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
import {Avatar,IconButton} from "@material-ui/core"
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import Sidebarchat from './Sidebarchat';
import {db} from "./Firebase";
import { getDocs,collection } from "firebase/firestore";
import { useStateValue } from './StateProvider';




export default function Sidebar() {


    const [rooms,setrooms]=useState([]);
    const [{user},dispatch]=useStateValue();

    useEffect(()=>{
        const unsubscribe=()=>{
            const coolref=collection(db,"rooms")
            getDocs(coolref).then(snap=>(setrooms(snap.docs.map(doc=>({id:doc.id,data:doc.data()})))))
            // getDocs(coolref).then(e=>console.log(e.docs.map(e=>console.log(e.data()))))
        }
        return ()=>{
            unsubscribe();
        }

    },[rooms])
    // console.log(rooms)

  return (
    <div className='sidebar'>
        {/* //div 1 */}
        <div className='sidebar_header'>
            <Avatar src={user?.photoURL} />
            <div className='sidebar_headerright'>

                <IconButton>
                    <DonutLargeIcon/>
                </IconButton>

                <IconButton>
                    <ChatIcon/>
                </IconButton>
                
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>

            </div>

        </div>

        {/* //div2 */}
        <div className='sidebar_search'>
            <div className='sidebar_searchcontainer'>
                <SearchIcon/>
                <input placeholder='Search or start new chat' type="text"  />
            </div>
        </div>



        {/* //div3 */}
        <div className='sidebar_chats'>
            <Sidebarchat addnewchat  />
            {rooms.map(room=>(
                <Sidebarchat key={room.id} id={room.id}  name={room.data.name}/>
            ))}


        </div>



    </div>
    
  )
}
