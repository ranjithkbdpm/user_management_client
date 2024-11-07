import {useContext} from 'react';
import { useForm } from 'react-hook-form';
import { FaExclamationCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import apiRequest from '../utilities/apiRequest.js';
import {AuthContext} from '../context/AuthProvider.js';




const Login = () => {
  const {setAuth} = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async(data) => {    
    if(data){ 
      try {
        const response = await apiRequest.post('/auth/login', data,  
          // {
          // // withCredentials: true //to store cookies automatically
          // // if you are using fetch the credentials:'include'
          // }
      );
        if(!response){
          alert('No response from server');
        }

        if(response?.data?.success){
          const accessToken = response?.data.accessToken;
          const roles = response?.data?.roles;
          const email = data.email;
          setAuth({ email, roles, accessToken});
          alert(response?.data?.message);           
          navigate('/dashboard');
        }else{
          alert(response?.data?.message)
        }
        // console.log(response.data)
      } catch(err) {
          console.log('login for error', err);
          alert(err);
      }
    }
  } 
  
  return (
    <div className="login-signup-form border p-5 rounded" style={{width:'400px'}}>
      <h1 className="text-center mb-5">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>        
      <input 
        className="form-control"
        type="email" 
        placeholder="Email" 
        {...register("email", { 
            required: true 
        })} 
      />
      {errors.email && 
        <p className="err-msg-form align-middle mt-2"> 
          <FaExclamationCircle className="me-2 pb-1"/> Email is required</p>
      }
      
      <input 
        className="form-control mt-3"
        type="password" 
        placeholder="Password" 
        {...register("password", { 
          required: true, 
          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ 
        })} 
      />
      {errors.password && 
        <p className="err-msg-form mt-2">
             <FaExclamationCircle className="me-2 pb-1"/>
            <span>
              Password must have at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long.
            </span>
              
        </p>}
      
      <input  className="form-control bg-primary mt-3 text-light" type="submit" />
      {/* <a className="btn text-center bg-primary w-100 text-light mt-3" href="/signup">Sign Up</a> */}
      <Link className="btn text-center bg-primary w-100 text-light mt-3" to="/signup">Sign Up</Link>
    </form>

    </div>
    
  );
}


export default Login;