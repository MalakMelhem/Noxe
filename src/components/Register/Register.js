import React,{useState} from 'react';
import axios from 'axios';
import Joi from 'joi';
import {useNavigate} from 'react-router-dom';

export default function Register() {
  const [user,setUser]=useState({
    fName:'',
    lName:'',
    age:'',
    email:'',
    password:'',
  });
  let [errorList,setErrorList]=useState([]);
  let [errorMsg,setErrorMsg]=useState([]);
  let [loading,setLoading]=useState(false);
  const navigate= useNavigate();

  function goToLogin(){
    navigate('/login');
  }

  async function SubmitFormData(e){
    e.preventDefault();
    setLoading(true);
    let validateResult= validateForm();
    if(validateResult.error){
      setErrorList(validateResult.error.details);
      setLoading(false);
    }else{
      let {data}= await axios.post('',user);
      if(data.message=='success'){
          goToLogin();
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
      fName:Joi.string().required().min(3).max(20).alphanum(),
      lName:Joi.string().required().min(3).max(20).alphanum(),
      age:Joi.number().required().min(20).max(60),
      email:Joi.string().required().email({tlds:{allow:['com','net']}}),
      password:Joi.string().required().pattern(new RegExp('^[a-z][0-9]{3}$')),
    });
    return schema.validate(user,{abortEarly:true});

  }
  return (
    <div className=' mt-5'>
      <h1 className=' my-5'>Registration from</h1>
      {errorList.map((error,index)=>
      <div key={index} className='alert alert-danger'>{error.message}</div>
      )}
      <form onSubmit={SubmitFormData}>
        <div className="mb-3">
          <label htmlFor="exampleInputFname" className="form-label">First Name</label>
          <input type="text" onChange={getFormValue} className="form-control" id="exampleInputFname" name='fName'/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputLname" className="form-label">Last Name</label>
          <input type="text" onChange={getFormValue} className="form-control" id="exampleInputLname" name="lName"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputAge" className="form-label">Age</label>
          <input type="number" onChange={getFormValue} className="form-control" id="exampleInputAge" name="age"/>
        </div>
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
