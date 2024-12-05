import React, { useState } from 'react';
import { FaExpand, FaCompress } from 'react-icons/fa'; // Using react-icons for example
import expandIco from '../../assets/outlineIcons/othericons/expandIco.svg';
import CompressIco from '../../assets/outlineIcons/othericons/CompressIco.svg';

const ResizeFL = ({ section }) => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    const sliderDiv = document.querySelector('#topbarxsj');
    const sidebarTopDiv = document.querySelector('.sidebar');

    if (isVisible) {
      sliderDiv.style.display = 'none';
      sidebarTopDiv.style.display = 'none';
    } else {
      sliderDiv.style.display = 'flex';
      sidebarTopDiv.style.display = 'flex';
    }
    setIsVisible(!isVisible);
  };

  return (
    <>
      {section === "reports" ?
        <>
          {isVisible ? <div className="x45wx5w activexkl5w2" onClick={toggleVisibility}>Expand all</div > : <div className="x45wx5w activexkl5w2" onClick={toggleVisibility}> Collapse all</div>
          }
        </>
        :
        <button id='resizebuttonicos45xs6' onClick={toggleVisibility}>
          {isVisible ? <img src={expandIco} alt="" data-tooltip-content="Expand" data-tooltip-place="bottom" data-tooltip-id="my-tooltip" /> : <img src={CompressIco} alt="" data-tooltip-content="Compress" data-tooltip-place="bottom" data-tooltip-id="my-tooltip" />}
        </button>
      }

    </>
  )
}

export default ResizeFL
