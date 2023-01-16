import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { addnewServiceStart, loadServicesStart, updateServiceStart } from '../../redux/Actions/serviceActions';
import classNames from "classnames";

const emptyService = {
    servicename: "",
    image: null ,
}

const AddUpdateNewService = () => {
    const [service, setService] = useState(emptyService);
    var { id, servicename, image } = service;

    const dispatch = useDispatch();
    const history = useHistory();
    var { id } = useParams();
    const formData = new FormData();
    // const [imagePreview, setImagePreview] = React.useState();
    // console.log("imagePreview~~~~~~~>>>>",imagePreview);

    // const onImageChange = (event) => {
    //     let reader = new FileReader();
    //     if (event.target.files && event.target.files.length > 0) {
    //       reader.readAsDataURL(event.target.files[0]);
    //       reader.onload = () => {
    //         setImagePreview(reader.result);
    //       };
    //     }
    //   };

    const servicess = useSelector((state) => state?.serviceData?.serviceData?.serviceData);
    const [submitted, setSubmitted] = useState(false);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        dispatch(loadServicesStart());
    }, []);


    useEffect(() => {
        if (id) {
          setEditMode(true);
          const singleService = servicess ? servicess.find((item) => item.id === Number(id)) : null;
          setService({ ...singleService });
        } else {
          setEditMode(false);
          setService({ ...service });
        }
      }, [id]);

    const gotoPrevious = () => {
        history.goBack();
    };

    const addService = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (servicename && image){ 
                    if(!editMode) {
                        formData.append("servicename", servicename);
                        formData.append("image", image );  
                        dispatch(addnewServiceStart(formData));
                        setTimeout(() => {
                            history.push('/admindashboard/services') 
                            }, 1000)
                    }
                
                    else {
                        formData.append("servicename", service.servicename);
                        formData.append("image", service.image);
                        formData.append("id", service.id)
                        dispatch(updateServiceStart(formData));
                        setTimeout(() => {
                                history.push('/admindashboard/services')
                            }, 1000)
                    }
        }
    }
    

    const onInputChange = (e) => {
        let { name, value } = e.target;
        setService({ ...service, [name]: value });
    };

    const handleFileSelect = (e) => {
        setService({...service,  [e.target.name]: e.target.files[0]})
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <div className="font-medium text-4xl text-900 mb-3"> {!editMode ? "Add New Service" : `Update Service/${service.servicename}`}</div>
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Back" icon="pi pi-angle-left" className="p-button-secondary mr-2" onClick={gotoPrevious} />
                </div>
            </React.Fragment>
        );
    };

  return (
    <div className="surface-section card" style={{ margin: "1%", padding: "1%" }}>
    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
        <div className="col-12 md:col-6">

                    <div className="card p-fluid">
                    <div className="field">
                        <label htmlFor="name">Service Name</label>
                        <InputText id="servicename" name="servicename" value={servicename} onChange={onInputChange} className={classNames({ "p-invalid": submitted && !service.servicename })} required  />
                        {submitted && !service.servicename && <small className="p-error">Service Name is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="name">Service Image</label>
                        <div className="field">
                        <InputText
                            id="image"
                            type="file"
                            accept="/image/*"
                            placeholder="image"
                            name="image"
                            variant="standard"
                            // onChange={onImageChange}
                            onChange={handleFileSelect}
                            style={{paddingTop:10}}
                        />
                        </div>
                        {/* <div className="bg-black">
                            {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="preview"
                                className="h-64 w-full object-contain"
                            />
                            )}
                        </div> */}
                    </div>
    
                    <div className="formgrid grid">
                        <div className="field col">
                            <Button label="Cancel" icon="pi pi-times" className="p-button-secondary mr-2 mb-2" onClick={gotoPrevious} />
                        </div>
                        <div className="field col">
                            <Button label={!editMode ? "Add" : "Update"} icon="pi pi-check" className="p-button-warning mr-2 mb-2" onClick={addService} />
                        </div>
                    </div>
                </div>
        </div>

    </div>

  )
}

export default AddUpdateNewService;
