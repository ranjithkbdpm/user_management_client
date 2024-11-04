import React from 'react'
import { useForm } from 'react-hook-form';
import { FaExclamationCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from '../utilities/apiRequest';

const SignUp = () => {

    const { register, handleSubmit, formState: { errors }, setError, reset } = useForm();

    const onSubmit = async(data) => {    
        if(data){
            if(data.password === data.confirmpassword){
                try {
                    const response = await axios.post('/auth/signup', data);
                    if (response && response.status === 201) {
                        alert('Sign up successful', response.data);
                        console.log(response.data)                        
                    }
                    console.log(data)
                } catch(err) {
                    console.error('Sign up error:', err);
                    if (err.response && err.response.status === 409) {
                        alert('User already exists');
                        reset()
                    } else {
                        alert('An unexpected error occurred. Please try again later.');
                    }
                }
            } else {
                triggerCustomError('confirmpassword');
            }
          
        }
    }    

      const triggerCustomError = async (type) => {
        // Manually set an error with a custom message
        if(type ==='confirmpassword'){
            setError("confirmpassword", {
                type: "manual",
                message: "Password doesn't match"
              });
            // Optionally trigger validation for the field
            // await trigger('confirmpassword');
        } 
        if(type==='username'){
            setError("username", {
                type: "manual",
                message: "Username already exist"
              });
            // Optionally trigger validation for the field
            // await trigger('username');
        }       
    
        
      }  

  return (
    <div className="login-signup-form border p-5 rounded" style={{width:'500px'}}>
        <h1 className="text-center mb-5">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input 
                type="text"
                className="form-control" 
                placeholder="Firstname" 
                {...register("firstname", {required: true})} 
            />
            {errors.firstname && <p className="err-msg-form"> <FaExclamationCircle className="me-2 pb-1"/> Firstname is required</p>}
            <input 
                type="text" 
                className="form-control mt-3" 
                placeholder="Lastname" 
                {...register("lastname", {required: true})} 
            />
            {errors.lastname && <p className="err-msg-form"><FaExclamationCircle className="me-2 pb-1"/> Lastname is required</p>}
            <input 
                type="email" 
                className="form-control mt-3" 
                placeholder="Email" 
                {...register("email", {required: true})} 
            />
            {errors.email && <p className="err-msg-form"><FaExclamationCircle className="me-2 pb-1"/> Email is required</p>}
            <input 
                type="username" 
                className="form-control mt-3" 
                placeholder="Username" 
                {...register("username", {required: true})} 
            />
            {errors.username && <p className="err-msg-form"><FaExclamationCircle className="me-2 pb-1"/> Username is required</p>}
            <input 
                type="tel"
                className="form-control mt-3"  
                placeholder="Phone number" 
                {...register("phonenumber", {required: true})} 
            />
            {errors.phonenumber && <p className="err-msg-form"><FaExclamationCircle className="me-2 pb-1"/> Phone number is required</p>}
            <input 
                className="form-control mt-3"
                type="password" 
                placeholder="Password" 
                {...register("password", { 
                    required: true, 
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: 'Password must have at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long.'
                })} 
            />
            {errors.password && 
                <p className="err-msg-form">
                    <FaExclamationCircle className="me-2 pb-1"/>
                    Password must have at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long.
                </p>
            }            
            <input 
                type="password"
                className="form-control mt-3"  
                placeholder="Confirm password" 
                {...register("confirmpassword", {required: true})} 
            />
            {errors.confirmpassword && <p className="err-msg-form"><FaExclamationCircle className="me-2 pb-1"/> {errors.confirmpassword.message ?errors.confirmpassword.message :'Confirm password is required'}</p>}

            <input type="submit" className="form-control mt-3 bg-primary text-light"/>
            {/* <a className="btn text-center bg-primary w-100 text-light mt-3" href="/">Login</a> */}
            <Link className="btn text-center bg-primary w-100 text-light mt-3" to="/">Login</Link>
        </form>
    </div>
  )
}

export default SignUp;