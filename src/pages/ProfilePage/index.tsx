import React from 'react'
import { DashboardNavbar, Footer, TopNavbar } from '../../components'
import { Profile } from '../../containers'

const ProfilePage: React.FC = () => {
  return (
    <>
      <TopNavbar />
      <DashboardNavbar />
      <Profile />
      <Footer />
    </>
  )
}

export default ProfilePage