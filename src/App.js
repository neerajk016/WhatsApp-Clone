import './App.css';
import Chat from './Chat';
import Sidebar from "./Sidebar";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './Login';
import { useStateValue } from './StateProvider';
function App() {
  const[{user},dispatch]=useStateValue();
  return (
    <div className="app">

      {!user?<Login/>:
      (<div className='app_body'>
      <Router>
        <Sidebar/>
        <Routes>

          

          <Route  element={<Chat/>} path='/rooms/:roomid'/>

          <Route  element={<Chat/>} path='/'/>
          

            
        </Routes>
      </Router>
      

    </div>)
      }

      
    </div>
  );
}

export default App;
