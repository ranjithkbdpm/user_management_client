import './App.css';
import Routing from './Routing'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from './context/AuthProvider';
import {useContext, useEffect} from 'react';
import {setupInterceptor} from './utilities/apiRequest.js';
import useRefresh from "./hooks/useRefresh";


function App() {

  const { auth } = useContext(AuthContext);
  const refresh = useRefresh();

  

  // Set up the interceptor when the app mounts or `auth.accessToken` changes
  useEffect(() => {
    console.log('auth from', auth?.accessToken);
    const accessToken = auth?.accessToken;   
    setupInterceptor(()=> accessToken, refresh);
  }, [auth, refresh]);


  return (
    <Routing/>
  );
}

export default App;
