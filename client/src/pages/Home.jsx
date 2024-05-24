import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [users,setUser] = useState([])

  useEffect(()=>{
    const fetchData = async ()=>{
       try {
        const res = await axios.get("http://localhost:3000/user")
        setUser(res.data)
       } catch (error) {
        console.log(error)
       }

    }
     fetchData()
  },[])

  const handleDelete =(id)=>{
      axios.delete("http://localhost:3000/delete/"+id)
      .then(res=>{
        location.reload()
      }).catch(err=>console.log(err))
    }
  return (
    <div>
      <h1 className='text-center'>Users</h1>
       <Link to='/create' className='btn btn-success'>+Add user</Link>
         <table className='table'>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
           {
            users.map((item,index)=>{
              return(
                <tr className=''>
                  <td>{index+1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td className='d-flex gap-3'>
                    <Link to={`/edit/${item._id}`} className='btn btn-sm btn-success'>Edit</Link>
                    <Link className='btn btn-sm btn-danger' onClick={(e)=>handleDelete(item._id)}>Delete</Link>
                  </td>
                </tr>
              )
            })
           }
          </tbody>
         </table>
    </div>
  )
}

export default Home