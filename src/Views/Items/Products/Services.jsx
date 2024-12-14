import React, { useState } from 'react'
import TopLoadbar from '../../../Components/Toploadbar/TopLoadbar'
import { serviceList } from '../../Helper/Constant'
import { useNavigate } from 'react-router-dom';

const Services = () => {
    const navigate = useNavigate();
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const handleSelectAllChange = () => {
        setSelectAll(!selectAll);
        setSelectedRows(selectAll ? [] : serviceList?.map((row) => row.id));
      };
    const handleRowClicked = (item) => {
        
        navigate(`/dashboard/${item?.route}-services`); 
      };
  return (
    <>
      <TopLoadbar />
      <div id="middlesection">
        <div id="Anotherbox" className='formsectionx1'>
          <div id="leftareax12">
            <h1 id="firstheading">
              <svg height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg" id="fi_5736652"><g id="_30.Category" data-name="30.Category"><path d="m13.5 504.472a5 5 0 0 1 -3.532-8.539l84.375-84.209a5 5 0 1 1 7.064 7.078l-84.375 84.209a4.985 4.985 0 0 1 -3.532 1.461z" fill="#3aa1d9"></path><ellipse cx="165.245" cy="347.307" fill="#a1daf9" rx="95.625" ry="95.023"></ellipse><path d="m258.882 7.528h1.988a0 0 0 0 1 0 0v200.124a0 0 0 0 1 0 0h-201.241a0 0 0 0 1 0 0v-.871a199.253 199.253 0 0 1 199.253-199.253z" fill="#f8b117"></path><path d="m502.071 6.97h.871a0 0 0 0 1 0 0v201.24a0 0 0 0 1 0 0h-200.124a0 0 0 0 1 0 0v-1.988a199.253 199.253 0 0 1 199.253-199.252z" fill="#fb530a" transform="matrix(0 1 -1 0 510.47 -295.29)"></path><path d="m302.26 252.284h201.24a0 0 0 0 1 0 0v.871a199.253 199.253 0 0 1 -199.253 199.253h-1.987a0 0 0 0 1 0 0v-200.124a0 0 0 0 1 0 0z" fill="#f8830e"></path></g></svg>
              All Services
            </h1>
            {/* <p id="firsttagp">{catList?.data?.total} Records</p> */}
          </div>
         
        </div>
        <div id="mainsectioncsls">
          <div id="leftsidecontentxls">
            <div id="item-listsforcontainer">
              <div id="x5ssmalltable">
                <div className="headtablerowindx1" id='h5tablerowindx2'>
                  <div className="table-headerx12">
                    <div className="table-cellx12 checkboxfx2 x2s5554" id="styl_for_check_box">
                      <input type="checkbox" checked={selectAll} onChange={handleSelectAllChange} /> <div className="checkmark"></div>
                    </div>
                    <div className="table-cellx12 cf01">SERVICE NAME</div>
                    
                  </div>
                  {serviceList?.loading ? (
                    <TableViewSkeleton />
                  ) : (
                    <>
                      {serviceList?.length == 0 ? (
                        <div className="notdatafound">
                          <iframe src="https://lottie.host/embed/e8ebd6c5-c682-46b7-a258-5fcbef32b33e/PjfoHtpCIG.json" frameBorder="0"></iframe>
                        </div>
                      ) : (
                       serviceList.map((service, index) => (
                          <div
                            className={`table-rowx12 ${selectedRows.includes(service?.id) ? "selectedresult" : ""} ${service.active == 0 ? "inactive-row" : ""}`}
                            key={index}
                          >
                            {/* Checkbox */}
                            <div className="table-cellx12 checkboxfx2" id="styl_for_check_box">
                              <input
                                checked={selectedRows.includes(service?.id)}
                                type="checkbox"
                              />
                              <div className="checkmark"></div>
                            </div>

                            {/* Category Name */}
                            <div onClick={() => handleRowClicked(service)} className="table-cellx12 cf01">
                              {service?.name || "-"}
                            </div>

                           

                          </div>
                        ))
                      )}

                    
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
       
      </div> 
    </>
  )
}

export default Services
