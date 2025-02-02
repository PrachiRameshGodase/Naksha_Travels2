import React from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineLogin } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { IoIosTimer } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const OrganizationPopup = ({ org, isOpen, switchOrganizationToDefault, handleOrgClick, toggleSlider }) => {
  const Navigate = useNavigate();
  const handleEditClicked = (id) => {
    Navigate(`/settings/create-organisations?id=${id}`);
  };
  return (
    <>
      {isOpen && (
        <div className="organization-popup">
          <button className="sliderx525s5-button">
            <FiEdit2 />
            <span onClick={() => handleEditClicked(org.organisation_id)}>Edit</span>
          </button>
          {org.is_default != 1 && (
            <button onClick={() => switchOrganizationToDefault(org.organisation_id)} className="sliderx525s5-button">
              <IoIosTimer />
              <span>Set Default</span>
            </button>
          )}
          {org.is_active != true && (
            <button onClick={() => handleOrgClick(org.organisation_id)} className="sliderx525s5-button">
              <AiOutlineLogin />
              <span>Login</span>
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default OrganizationPopup;
