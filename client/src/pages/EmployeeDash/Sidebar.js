import React from 'react'
import { CgProfile } from "react-icons/cg"
import 
{BsCart3, BsGrid1X2Fill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'
 import { SlCalender } from "react-icons/sl";
 import { GrDocumentPerformance } from "react-icons/gr";
 import { MdOutlineModelTraining } from "react-icons/md";
 import { MdCoPresent } from "react-icons/md";

 

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                Employee Dashboard
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    < 
                    CgProfile className='icon'/> My Profile
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGrid3X3GapFill className='icon'/> Attendance

                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <MdCoPresent className='icon'/> Leave
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <GrDocumentPerformance className='icon'/>Performance
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsMenuButtonWideFill className='icon'/> Payroll
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    < SlCalender className='icon'/> Calender
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <MdOutlineModelTraining className='icon'/>Training
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGearFill className='icon'/> Setting
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar