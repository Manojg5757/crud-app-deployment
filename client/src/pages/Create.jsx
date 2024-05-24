import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Create = () => {
  const [values,setValues] = useState({
    name:"",
    email:""
  })
  const navigate = useNavigate()
const handleSubmit= (e)=>{
  e.preventDefault()
  axios.post('http://localhost:3000/create',values)
  .then(res=>{console.log(res)
    navigate('/')
  })
  .catch(err=>console.log(err))
}
  console.log(values)
  return (
    <div className='h-100vh d-flex justify-content-center align-items-center'>

      <form onSubmit={handleSubmit} className='d-flex flex-column gap-2'>
        <label htmlFor="name">Name</label>
        <input type="text" name='name' onChange={(e)=>setValues({...values,name:e.target.value})} placeholder='name' id='name' />
        <label htmlFor="email">Email</label>
        <input type="email" name='email' onChange={(e)=>setValues({...values,email:e.target.value})} placeholder='email' id='email' />
        <div className='d-flex gap-3'>
          <button type='submit' className='btn btn-success'>ADD</button>
          <Link className='btn btn-info'>Back</Link>
        </div>
      </form>
    </div>
  )
}

export default Create