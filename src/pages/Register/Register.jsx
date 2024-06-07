import React, { useEffect, useState } from 'react'
import './Register.css'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { useSnapshot } from 'valtio'
import state from '../../store'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Aos from 'aos'
const Register = () => {
  const { handleSubmit, register, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [passMissMatch, setPassMissMatch] = useState(false);
  // const { setCustomer } = useCustomer();
  const snap = useSnapshot(state);

  useEffect(() => {
    Aos.init();
  }, []);
  const submit = async (data) => {
  
    if (data.password != data.confirm) {
      setPassMissMatch(true);
    } else {
      setPassMissMatch(false);
      Swal.fire('Please wait')
      Swal.showLoading();
      axios.post('http://localhost:8080/user', {
        "email": data.email,
        "password": data.password
      })
        .then(function (response) {
          

          if (response.data != null && response.data != '') {

            state.customer = response.data;

            Swal.fire({
              title: "Sucess!",
              text: "Registration Sucessfully!",
              icon: "success"
            });
            Swal.hideLoading();

            if (snap.ckeckout) {
              state.navButton = 0;
              navigate('/motion-test/checkout')

            } else {
              state.navButton = 1;
              navigate('/motion-test')
            }

          } else {
            Swal.fire({
              icon: "error",
              title: "Failed!",
              text: "Something went wrong",
            });
            Swal.hideLoading();
          }
        })
        .catch(function (error) {
          
        });
    }

  }


  return (
    <div className='bg-register d-flex align-items-center justify-content-center'>
      <div className="container" width="100%">
        <div className="row ">
          <div className="col-lg-4"></div>
          <div className="col-lg-4"></div>
          <div className="col-lg-4 col-md-6 col-sm-8">
            <div data-aos="fade-left" data-aos-duration="1200" class="container1 ">
              <div class="heading">Register</div>
              <form action="" class="form">
                <input

                  required=""
                  class="input2"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="E-mail"
                  {...register("email", { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ })}
                />
                {errors && errors.email && errors.email.type == "required" && (<p>Email cannot be empty</p>)}
                {errors && errors.email && errors.email.type == "pattern" && (<p>Enter correct email</p>)}
                <input
                  onFocus={() => { setPassMissMatch(false) }}
                  required=""
                  class="input2"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"

                  {...register("password", { required: true })}
                />
                {errors && errors.password && (<p>Password cannot be empty</p>)}

                <input
                  onFocus={() => { setPassMissMatch(false) }}
                  required=""
                  class="input2"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Confirm password"
                  {...register("confirm", { required: true })}
                />
                {errors && errors.confirm && (<p>Reconfirm password</p>)}
                {passMissMatch == true && (<p>Password doesn't Match</p>)}
                <input onClick={handleSubmit(submit)} class="login-button" type="submit" value="Register" />

              </form>


            </div>
          </div>




        </div>
      </div>
    </div>
  )
}

export default Register