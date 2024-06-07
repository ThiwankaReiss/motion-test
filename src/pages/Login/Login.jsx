import React, { useEffect, useState, useRef } from 'react';
import './Login.css';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useSnapshot } from 'valtio';
import state from '../../store';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Aos from 'aos';

const Login = () => {
  const { handleSubmit, register, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const emailRef = useRef(null); // Create a ref for the email input

  const handleForgot = () => {
    const email = emailRef.current.value; // Get the value of the input
    console.log(email); // Use the email value as needed
    // Implement your forgot password logic here, e.g., send an email with axios
    Swal.fire('Please wait');
    Swal.showLoading();
    axios.post('http://localhost:8080/forgot', {
      response: email
    })
      .then(function (res) {
        if (res.data != null && res.data.response == 'Success') {


          Swal.fire({
            title: "Success!",
            text: "Password sent to your email.",
            icon: "success"
          });
          Swal.hideLoading();

        } else if (res.data != null && res.data.response == 'Fail') {
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text: "You are not registered in our system",
          });
          Swal.hideLoading();
        }
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Something went wrong",
        });
        Swal.hideLoading();
      });
  }

  const snap = useSnapshot(state);
  useEffect(() => {
    Aos.init();
  }, []);

  const submit = async (data) => {
    Swal.fire('Please wait');
    Swal.showLoading();
    axios.post('http://localhost:8080/auth', data)
      .then(function (response) {
        if (response.data != null && response.data !== '') {
          state.customer = response.data;
          state.navButton=1;
          state.themeColor='#152238';
          state.geometry=null;
          state.orderDetail=[];
          state.ckeckout=false;

          Swal.fire({
            title: "Success!",
            text: "Registration Successful!",
            icon: "success"
          });
          Swal.hideLoading();
          if (snap.ckeckout) {
            state.navButton = 0;
            navigate('/motion-test/checkout');
          } else {
            state.navButton = 1;
            navigate('/motion-test');
          }
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
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Something went wrong",
        });
        Swal.hideLoading();
      });
  }

  return (
    <div className='bg-login d-flex align-items-center justify-content-center'>
      <div className="container" width="100%">
        <div className="row ">
          <div className="col-lg-4 col-md-6 col-sm-8">
            <div data-aos="fade-right" data-aos-duration="1200" className="container1 ">
              <div className="heading">Sign In</div>
              <form action="" className="form">
                <input
                  required=""
                  className="input1"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="E-mail"
                  {...register("email", { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ })}
                />
                {errors && errors.email && errors.email.type === "required" && (<p>Email cannot be empty</p>)}
                {errors && errors.email && errors.email.type === "pattern" && (<p>Enter correct email</p>)}
                <input
                  required=""
                  className="input1"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                {errors && errors.password && (<p>Password correct email</p>)}
                <span className="forgot-password"><a data-bs-toggle="modal" data-bs-target="#exampleModal2" href="#">Forgot Password ?</a></span>
                <input onClick={handleSubmit(submit)} className="login-button" type="submit" value="Sign In" />
              </form>
              <span className="agreement"><Link onClick={() => { state.navButton = 3 }} to="/register">Register</Link></span>
            </div>
          </div>
          <div className="col-lg-4"></div>
        </div>
        {/* modal2 */}
        <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Enter Email</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <input ref={emailRef} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleForgot}>Send Password</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
