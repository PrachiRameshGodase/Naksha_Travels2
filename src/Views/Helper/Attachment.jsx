// import React, { useState } from "react";
// import { MdArrowOutward } from "react-icons/md";
// import ImageMo

// const Attachment = ({ attachments }) => {
//    console.log("attachments", attachments)
//     //Show items image
//     const [showImagesModal, setshowImagesModal] = useState(false);
//     // const [showComponent, setShowComponent] = useState(false);
//     const [imagesVal, setImagesVal] = useState([]);

//     const showAllImages = (val) => {
//         setImagesVal(val);
//         setshowImagesModal(true);
//         // setShowComponent(true);
//     }
//     return (
//         <div>
//             <p className='sfdjklsd1xs2w4' style={{ marginLeft: "5px" }}>
//                 {(attachments)?.length >= 1 ? (
//                     <span onClick={() => showAllImages(attachments)}>
//                         {(attachments)?.length} Images <MdArrowOutward />
//                     </span>
//                 ) : (
//                     "No Image"
//                 )}
//             </p>
//             {showImagesModal && (
//                 <ImagesModal
//                     showModal={showImagesModal}
//                     closeModal={setshowImagesModal}
//                     images={imagesVal}
//                 />
//             )}
//         </div>
//     );
// };

// export default Attachment;
import React from 'react'

const Attachment = () => {
  return (
    <div>
      
    </div>
  )
}

export default Attachment
