import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsGrid1X2Fill, BsPeopleFill, BsMenuButtonWideFill, BsFillGearFill } from 'react-icons/bs';
import { SlCalender } from 'react-icons/sl';
import { GrDocumentPerformance } from 'react-icons/gr';
import { MdOutlineModelTraining } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any additional logout logic if needed
    navigate('/logout');
  };

  return (
    <aside id="sidebar" className={`sidebar ${openSidebarToggle ? "sidebar-responsive" : ""}`} style={{ backgroundColor: '#263043' }}>
      <div className='sidebar-title'>
        <div className='sidebar-brand text-white'>
          Admin Dashboard
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link to="/admin-dashboard">
            <BsGrid1X2Fill className='icon' /> Dashboard
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to='/employee-manager'>
            <CgProfile className='icon' /> Employee Profile
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/performance">
            <GrDocumentPerformance className='icon' /> Performance
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/recruitment">
            <BsPeopleFill className='icon' /> Recruitment
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to='/admin-training'>
            <MdOutlineModelTraining className='icon' /> Training
          </Link>
        </li>
       
        <li className='sidebar-list-item'>
          <Link to="/calendar">
            <SlCalender className='icon' /> Calendar
          </Link>
        </li>
        
       
        <li className='sidebar-list-item'>
          <Link to="/logout">
            <BsPeopleFill className='icon' /> Logout
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
