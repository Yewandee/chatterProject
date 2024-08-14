import React from 'react'
import './sidenav.css'
import LogoSearch from '../logoSearch/LogoSearch'
import ProfileCard from '../profileCard/profileCard'

const SideNav: React.FC = () => {
  return (
    <div className="sideNav">
        <LogoSearch/>
        <ProfileCard/> 
    </div>
  )
}

export default SideNav