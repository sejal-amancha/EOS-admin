import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { addnewBannerStart, loadBannersStart, updateBannerStart } from '../../redux/Actions/bannerActions';
import classNames from "classnames";

const emptyBanner = {
    imageName: "",
    image: null ,
}

const AddUpdateBanner = () => {
    const [banner, setBanner] = useState(emptyBanner);
    var { id, imageName, image } = banner;

    const dispatch = useDispatch();
    const history = useHistory();
    var { id } = useParams();
    const formData = new FormData();
    const bannerss = useSelector((state) => state?.banners?.banners?.BannerData);
    const [submitted, setSubmitted] = useState(false);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        dispatch(loadBannersStart());
    }, []);

    useEffect(() => {
        if (id) {
          setEditMode(true);
          const singlebanner = bannerss ? bannerss.find((item) => item.id === Number(id)) : null;
          setBanner({ ...singlebanner });
        } else {
          setEditMode(false);
          setBanner({ ...banner });
        }
      }, [id]);

    const gotoPrevious = () => {
        history.goBack();
    };

    const addbanner = (e) => {
        e.preventDefault();
        setSubmitted(true);
    
        if (imageName && image) { 
            if(!editMode) {
                    formData.append("imageName", imageName);
                    formData.append("image", image );
                    dispatch(addnewBannerStart(formData));
                    setTimeout(() => {
                            history.push('/admindashboard/banners')
                        }, 1000)
                    }        
             else {
                formData.append("imageName", imageName);
                formData.append("image", image );
                formData.append("id", id);
                dispatch(updateBannerStart(formData));
                setTimeout(() => {
                        history.push('/admindashboard/banners')
                    }, 1000)
            }  
        }
    }
    

    const onInputChange = (e) => {
        let { name, value } = e.target;
        setBanner({ ...banner, [name]: value });
    };

    const handleFileSelect = (e) => {
        setBanner({...banner,  [e.target.name]: e.target.files[0]})
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <div className="font-medium text-4xl text-900 mb-3"> {!editMode ? "Add New banner" : `Update banner/${banner.imageName}`}</div>
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
                    <label htmlFor="name">Banner Name</label>
                    <InputText id="imageName" name="imageName" value={imageName} onChange={onInputChange} className={classNames({ "p-invalid": submitted && !banner.imageName })} required  />
                    {submitted && !banner.imageName && <small className="p-error">Banner Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="name">Banner Image</label>
                    <div className="field">
                    <InputText
                        id="image"
                        type="file"
                        accept="/image/*"
                        placeholder="image"
                        name="image"
                        variant="standard"
                        onChange={handleFileSelect}
                        style={{paddingTop:10}}
                        className={classNames({ "p-invalid": submitted && !banner.image })}
                    />
                    {submitted && !banner.image && <small className="p-error">Upload Banner Image</small>}
                    </div>
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <Button label="Cancel" icon="pi pi-times" className="p-button-secondary mr-2 mb-2" onClick={gotoPrevious} />
                    </div>
                    <div className="field col">
                        <Button label={!editMode ? "Add" : "Update"} icon="pi pi-check" className="p-button-warning mr-2 mb-2" onClick={addbanner} />
                    </div>
                </div>
            </div>
        </div>

    </div>

  )
}

export default AddUpdateBanner;
