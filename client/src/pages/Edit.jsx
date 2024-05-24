import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const Edit = () => {
  const {id} = useParams()
  const navigate = useNavigate()

  const [values,setValues] = useState({
    name:"",
    email:""
  })
console.log(values)
  useEffect(()=>{
    const fetchdata = async()=>{
      const res = await axios.get("http://localhost:3000/edit/"+id)
      setValues(res.data)
    }
    fetchdata()
  },[])
  
  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.put("http://localhost:3000/edit/"+id,values)
    .then(res=>{
      console.log(res)
      navigate('/')
    }).catch(err=>console.log(err))
  }

  return (
    <div>
      <h1 className='text-center'>Edit Your Details Here</h1>
      <div className='h-100vh d-flex justify-content-center align-items-center'>

      <form onSubmit={handleSubmit}  className='d-flex flex-column gap-2'>
        <label htmlFor="name">Name</label>
        <input value={values.name} type="text" name='name' onChange={(e)=>setValues({...values,name:e.target.value})} placeholder='name' id='name' />
        <label htmlFor="email">Email</label>
        <input value={values.email} type="email" name='email' onChange={(e)=>setValues({...values,email:e.target.value})} placeholder='email' id='email' />
        <div className='d-flex gap-3'>
          <button type='submit' className='btn btn-success'>ADD</button>
          <Link to={'/'} className='btn btn-info'>Back</Link>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Edit