import React,{useState} from 'react';
import axios from 'axios';
import Joi from 'joi';
import {useNavigate} from 'react-router-dom';

export default function Login({userData}) {
  const [user,setUser]=useState({
    email:'',
    password:'',
  });
  let [errorList,setErrorList]=useState([]);
  let [errorMsg,setErrorMsg]=useState([]);
  let [loading,setLoading]=useState(false);
  const navigate= useNavigate();

  function goToHome(){
    navigate('/home');
  }

  async function SubmitFormData(e){
    e.preventDefault();
    setLoading(true);
    let validateResult= validateForm();
    if(validateResult.error){
      setErrorList(validateResult.error.details);
      setLoading(false);
    }else{
      let {data}= await axios.post('https://api.escuelajs.co/api/v1/auth/login',user);
      console.log(data);
      if(data.access_token){
          localStorage.setItem('token',data.access_token);
          userData();
          goToHome();
      }else{
        setErrorMsg(data.message);
      }
      setLoading(false);
    }
    
  }
  function getFormValue(e){
    let myuser={...user};
    myuser[e.target.name]=e.target.value;
    setUser(myuser); 
    console.log(myuser);
  }

  function validateForm(){
    const schema=Joi.object({
      email:Joi.string().required().email({tlds:{allow:['com','net']}}),
      password:Joi.string().required(),
    });
    return schema.validate(user,{abortEarly:true});

  }
  return (
    <div className=' mt-5'>
      <h1 className=' my-5'>Login from</h1>
      {errorList.map((error,index)=>
      <div key={index} className='alert alert-danger'>{error.message}</div>
      )}
      <form onSubmit={SubmitFormData}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
          <input type="email" onChange={getFormValue} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" onChange={getFormValue} className="form-control" id="exampleInputPassword1" name="password"/>
        </div>

        <button type="submit" name="submit" className="btn btn-primary float-end mb-5">{loading?<i className='fa fa-spinner fa-spin'></i>:'Register'}</button>
        <div className='clrfix'></div>

      </form>

    </div>
  )
}
