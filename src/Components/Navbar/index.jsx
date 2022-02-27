import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleRightSideClick = (e) => {
    e.stopPropagation()
    setIsNavOpen(false);
  }

  return (
    <>
      <div className="position-absolute top-0 start-0 text-white zi-top animate__animated animate__fadeIn">
        <FontAwesomeIcon
          icon={faBars}
          color="white"
          size="2x"
          className="p-4 cursor-pointer"
          onClick={() => setIsNavOpen(true)}
        />
      </div>
      <div className="d-flex flex-row">
        <div className={`position-absolute top-0 start-0 zi-top h-100 bg-dark vw-25 animate__animated animate__faster ${isNavOpen ? "animate__slideInLeft" : "animate__slideOutLeft"}`}>
          <div className="d-flex flex-column justify-content-start">
            <div className="d-flex justify-content-between align-items-center p-4 text-white">
              <h4>Navigate</h4>
              <FontAwesomeIcon className="cursor-pointer" icon={faXmark} color="white" size="2x" onClick={() => setIsNavOpen(false)} />
            </div>
          </div>
        </div>
        {isNavOpen &&
          <div className="position-absolute zi-top top-0 end-0 vw-75 h-100" onClick={handleRightSideClick} />
        }
      </div>
    </>
  )
}

export default Navbar;