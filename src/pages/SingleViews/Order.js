import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory,  useParams} from "react-router-dom";
// import {  getSingleOrderStart  } from "../../redux/Actions/productActions";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar"

const Order = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams(); 

    // const categorySingle = useSelector((state) => state?.categoryDetails?.categoryDetails);

    useEffect(() => {
        // dispatch(getSingleOrderStart(id));
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
                    {/* <div className="font-medium text-4xl text-900 mb-3">{`Category Information/${categorySingle.categoryName}`}</div> */}
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
                    <div className="text-500 text-2xl w-6 md:w-3 font-medium mb-2">Id</div>
                    {/* <div className="text-900 text-2xl w-full md:w-8 md:flex-order-0 flex-order-1">{categorySingle?.id}</div> */}
                </li>
            </ul>
        </div>
  )
}

export default Order
