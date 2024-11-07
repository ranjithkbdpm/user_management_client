import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {AuthContext} from '../context/AuthProvider.js';
import {apiPrivateRequest} from "../utilities/apiRequest.js";
import useRefresh from "../hooks/useRefresh.js";
import useLogout from "../hooks/useLogout.js";

const Dashboard = () => {
  // const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const refresh = useRefresh();
  const logout = useLogout();
  // const { auth } = useContext(AuthContext);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController(); //axios now supports this which is used to cancel the request

    const getMessage = async () => {
      try {
        const response = await apiPrivateRequest.get("/check-access");
        // console.log(response.data)
        if (response?.data) {
          isMounted && setMsg(response?.data);
        } 
      } catch (err) {
        console.log(err.response.data.message);
        // alert('error: '+ err.response.data.message);
      }
    };
    getMessage();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  // console.log('auth', auth)

  return (
    <div>
      <h1>Dashboard</h1>
      {msg ?<h5>{msg}</h5> :<h5>No access to view the message</h5>
      }      
      <button onClick={() => refresh()}>Refresh</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
