import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { addnewOfferStart, updateOfferStart, loadOffersStart } from '../../redux/Actions/offerActions';
import classNames from "classnames";
import { InputTextarea } from "primereact/inputtextarea";

const emptyOffer = {
    bestoffersName: "",
    image: null ,
    description: "",
    price: "",
}

const AddUpdateOffer = () => {
    const [offer, setOffer] = useState(emptyOffer);
    var { id, bestoffersName, image, description, price } = offer;

    const dispatch = useDispatch();
    const history = useHistory();
    var { id } = useParams();
    const formData = new FormData();

    const offerss = useSelector((state) => state?.offers?.offers?.bestoffersData);
    const [submitted, setSubmitted] = useState(false);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        dispatch(loadOffersStart());
    }, []);

    useEffect(() => {
        if (id) {
          setEditMode(true);
          const singleoffer = offerss ? offerss.find((item) => item.id === Number(id)) : null;
          setOffer({ ...singleoffer });
        } else {
          setEditMode(false);
          setOffer({ ...offer });
        }
      }, [id]);

    const gotoPrevious = () => {
        history.goBack();
    };

    const addoffer = (e) => {
        e.preventDefault();
        setSubmitted(true);
    
        if (bestoffersName && image && description && price) { 
            if(!editMode) {
                    formData.append("bestoffersName", bestoffersName);
                    formData.append("image", image );
                    formData.append("description", description);
                    formData.append("price", price)
                    dispatch(addnewOfferStart(formData));
                    setTimeout(() => {
                            history.push('/admindashboard/best-offers')
                        }, 1000)
                    }        
             else {
                formData.append("id", id);
                formData.append("bestoffersName", bestoffersName);
                formData.append("image", image );
                formData.append("description", description);
                formData.append("price", price)
                dispatch(updateOfferStart(formData));
                setTimeout(() => {
                        history.push('/admindashboard/best-offers')
                    }, 1000)
            }  
        }
    }
    
    const onInputChange = (e) => {
        let { name, value } = e.target;
        setOffer({ ...offer, [name]: value });
    };

    const handleFileSelect = (e) => {
        setOffer({...offer,  [e.target.name]: e.target.files[0]})
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <div className="font-medium text-4xl text-900 mb-3"> {!editMode ? "Add New offer" : `Update offer/${offer.bestoffersName}`}</div>
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
                    <label htmlFor="name">offer Name</label>
                    <InputText id="bestoffersName" name="bestoffersName" value={bestoffersName} onChange={onInputChange} className={classNames({ "p-invalid": submitted && !offer.bestoffersName })} required  />
                    {submitted && !offer.bestoffersName && <small className="p-error">offer Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="name">offer Image</label>
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
                        className={classNames({ "p-invalid": submitted && !offer.image })}
                    />
                    {submitted && !offer.image && <small className="p-error">Upload offer Image</small>}
                    </div>
               </div>
               <div className="field">
                    <label htmlFor="name">Description</label>
                    <InputTextarea id="description" name="description" value={description} onChange={onInputChange} className={classNames({ "p-invalid": submitted && !offer.description })} required  />
                    {submitted && !offer.description && <small className="p-error">Description Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="name">Price</label>
                    <InputText id="price" name="price" value={price} onChange={onInputChange} className={classNames({ "p-invalid": submitted && !offer.price })} required  />
                    {submitted && !offer.price && <small className="p-error">Price is required.</small>}
                </div>
                <div className="formgrid grid">
                    <div className="field col">
                        <Button label="Cancel" icon="pi pi-times" className="p-button-secondary mr-2 mb-2" onClick={gotoPrevious} />
                    </div>
                    <div className="field col">
                        <Button label={!editMode ? "Add" : "Update"} icon="pi pi-check" className="p-button-warning mr-2 mb-2" onClick={addoffer} />
                    </div>
                </div>
            </div>

        </div>

    </div>

  )
}

export default AddUpdateOffer;
