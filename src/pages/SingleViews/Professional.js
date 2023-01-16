import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory,  useParams} from "react-router-dom";
import { getSingleProfessionalStart } from '../../redux/Actions/professionlasActions';
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar"

const Professional = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams(); 
    const singleProfessionalData = useSelector((state) =>  state?.singleProfessional?.singleProfessional?.postData);

    useEffect(() => {
        dispatch(getSingleProfessionalStart(id));
    }, []);

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Back" icon="pi pi-angle-left" className="p-button-secondary mr-2" onClick={gotoPrevious} />
                </div>
            </React.Fragment>
        )
    }
    
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <div className="font-medium text-4xl text-900 mb-3">{`Professional Information/${singleProfessionalData?.name}`}</div>   
                </div>
            </React.Fragment>
        )
    }
    const gotoPrevious = () => {
        history.goBack();
    }

  return (
    <div className="surface-section card" style={{ margin:'1%', padding:'1%' }}>
    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
         <ul className="list-none p-0 m-0">
             <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                 <div className="text-500 text-2xl w-6 md:w-3 font-medium">Name</div>
                 <div className="text-900 text-2xl w-full md:w-8 md:flex-order-0 flex-order-1">{singleProfessionalData?.name}</div>
             </li>
             <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                 <div className="text-500 text-2xl w-6 md:w-3 font-medium">Profession</div>
                 <div className="text-900 text-2xl w-full md:w-8 md:flex-order-0 flex-order-1">{singleProfessionalData?.professional}</div>
             </li>
             <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                 <div className="text-500 text-2xl w-6 md:w-3 font-medium">Email Address</div>
                 <div className="text-900 text-2xl w-full md:w-8 md:flex-order-0 flex-order-1">{singleProfessionalData?.email}</div>
             </li>
             <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                 <div className="text-500 text-2xl w-6 md:w-3 font-medium">Contact Number</div>
                 <div className="text-900 text-2xl w-full md:w-8 md:flex-order-0 flex-order-1">{singleProfessionalData?.phonenumber}</div>
             </li>
             <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                 <div className="text-500 text-2xl w-6 md:w-3 font-medium">Address</div>
                 <div className="text-900 text-2xl w-full md:w-8 md:flex-order-0 flex-order-1">{singleProfessionalData?.address}</div>
             </li>
             <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                 <div className="text-500 text-2xl w-6 md:w-3 font-medium">Activity Status</div>
                 <div className="text-900 text-2xl w-full md:w-8 md:flex-order-0 flex-order-1">{singleProfessionalData?.status == 1 ? `Active` : `Inactive`}</div>   
             </li>
             <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                 <div className="text-500 text-2xl w-6 md:w-3 font-medium">Created At</div>
                 <div className="text-900 text-2xl w-full md:w-8 md:flex-order-0 flex-order-1">{singleProfessionalData?.created_at}</div>   
             </li>
             <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                 <div className="text-500 text-2xl w-6 md:w-3 font-medium">Updated At</div>
                 <div className="text-900 text-2xl w-full md:w-8 md:flex-order-0 flex-order-1">{singleProfessionalData?.updated_at}</div>    
             </li>
         </ul>
 </div>
  )
}

export default Professional;
