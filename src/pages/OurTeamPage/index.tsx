import React from 'react'
import { Footer, TopNavbar } from '../../components'
import { OurTeam } from '../../containers'

const ProfilePage: React.FC = () => {
  return (
    <>
      <TopNavbar />
      <OurTeam />
      <Footer />
    </>
  )
}

export default ProfilePage