import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Create from './pages/Create'
import Edit from './pages/Edit'
import View from './pages/View'

const App = () => {
  return (
    <div>
       <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/view/:id' element={<View />} />
       </Routes>
    </div>
  )
}

export default App