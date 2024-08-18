import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import io from 'socket.io-client';

const socket = io(BACKEND_URL, {
  withCredentials: true,
  transports: ['websocket', 'polling']
});

function App() {
  return (
   <> 
      <Toaster/>
       <main >
        <Outlet/>
       </main>
   </>
  );
}

export default App;
