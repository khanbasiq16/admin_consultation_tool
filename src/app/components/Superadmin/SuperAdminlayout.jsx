import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

const SuperAdminlayout = ({children}) => {
  return (
    <>

<Header/>

{children}

<Sidebar/>

    </>
  )
}

export default SuperAdminlayout