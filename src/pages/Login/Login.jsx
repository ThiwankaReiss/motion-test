import React, { useEffect } from 'react'
import './Login.css'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { useSnapshot } from 'valtio'
import state from '../../store'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Aos from 'aos'

const Login = () => {
  const { handleSubmit, register, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  
  // const { setCustomer } = useCustomer();

  useEffect(()=>{
    Aos.init();
  },[]);
  const submit = async (data) => {
    console.log(data);
    Swal.fire('Please wait')
    Swal.showLoading();
    axios.post('http://localhost:8080/auth', data)
      .then(function (response) {
        console.log(response.data);

        if (response.data != null && response.data != '') {

          state.customer = response.data;
          state.navButton=1;
          Swal.fire({
            title: "Sucess!",
            text: "Registration Sucessfully!",
            icon: "success"
          });
          Swal.hideLoading();
         
          navigate('/')

        } else {
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text: "Wrong credentials",
          });
          Swal.hideLoading();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
 
  return (
    <div className='bg-login d-flex align-items-center justify-content-center'>
      <div className="container" width="100%">
        <div className="row ">

          <div className="col-lg-4 col-md-6 col-sm-8">
            <div data-aos="fade-right" data-aos-duration="1200" class="container1 ">
              <div class="heading">Sign In</div>
              <form action="" class="form">
                <input
                  required=""
                  class="input"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="E-mail"
                  {...register("email", { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ })}
                />
                {errors && errors.email && errors.email.type == "required" && (<p>Email cannot be empty</p>)}
                {errors && errors.email && errors.email.type == "pattern" && (<p>Enter correct email</p>)}
                <input
                  required=""
                  class="input"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                {errors && errors.password && (<p>Password correct email</p>)}
                <span class="forgot-password"><a href="#">Forgot Password ?</a></span>
                <input onClick={handleSubmit(submit)} class="login-button" type="submit" value="Sign In" />

              </form>
              <span class="agreement"><a href="#">Register</a></span>

            </div>
          </div>

          <div className="col-lg-4"></div>


        </div>
      </div>
    </div>
  )
}

export default Login