import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { loadCategoriesStart, updateCategoryStart } from '../../redux/Actions/categoryActions';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import classNames from "classnames";
import { Dropdown } from "primereact/dropdown";
import { loadProfessionalsStart } from "../../redux/Actions/professionlasActions";

const UpdateCategory = () => {
    var { id } = useParams(); 
    let emptyCategory = {
        categoriesName: '',
        image: null,
        price: '',
        description: '',
        Service_ref_id: id,
        professional_ref_id:'',
    }

    const [category, setCategory] = useState(emptyCategory);
    var { categoriesName, description, image, price, Service_ref_id, professional_ref_id }  = category;
    const dispatch = useDispatch();
    const history = useHistory();
    const formData = new FormData();
  
    const [submitted, setSubmitted] = useState(false);
    const categoriess = useSelector((state) => state?.categories?.categories?.categoriesData?.categories);
    const professionalss = useSelector((state) => state?.professional?.professional?.postData);
    
    useEffect(() => {
        dispatch(loadCategoriesStart());
    }, []);

    useEffect(() => {
        dispatch(loadProfessionalsStart());
    }, []);

    useEffect(() => {
        if(id) {
            const singleCategory = categoriess ? categoriess.find((item) => item.id === Number(id)) : null;
            setCategory({...singleCategory});    
        } 
    }, [id]);
   

    const gotoPrevious = () => {
        history.goBack();
    };

    const addUpdateCategory = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if(categoriesName && image && price && description && Service_ref_id && professional_ref_id) {
                formData.append("id", id);
                formData.append("categoriesName", categoriesName);
                formData.append("image", image );
                formData.append("price", price);
                formData.append("description", description );
                formData.append("Service_ref_id", Service_ref_id);
                formData.append("professional_ref_id", professional_ref_id);
                dispatch(updateCategoryStart(formData)); 
                setTimeout(() => {
                        history.push(`/admindashboard/services`)
                    }, 1000)
                }       
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || "";
        setCategory({ ...category, [name]: val });
    };
    const handleFileSelect = (e) => {
        setCategory({...category,  [e.target.name]: e.target.files[0]})
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <div className="font-medium text-4xl text-900 mb-3"> { `Update Category`}</div>
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
                            <label htmlFor="name">Category Name</label>
                            <InputText id="categoriesName" value={categoriesName} onChange={(e) => onInputChange(e, "categoriesName")} className={classNames({ "p-invalid": submitted && !category.categoriesName })} required autoFocus />
                            {submitted && !category.categoriesName && <small className="p-error">Category Name is required.</small>}
                    </div>
                    <div className="field">
                            <label htmlFor="name">Category Discription</label>
                            <InputTextarea id="description" value={description} onChange={(e) => onInputChange(e, "description")} className={classNames({ "p-invalid": submitted && !category.description })} required autoResize rows="3" cols="30" />
                            {submitted && !category.description && <small className="p-error">Category Description is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="name">Category Image</label>
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
                        />
                        </div>
                    </div>
                    <div className="field">
                            <label htmlFor="name">Price</label>
                            <InputText id="price" value={price} onChange={(e) => onInputChange(e, "price")} className={classNames({ "p-invalid": submitted && !category.price })} required  />
                            {submitted && !category.price && <small className="p-error">Category Price is required.</small>}
                    </div>
                    <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="name">Select Profession</label>
                                <Dropdown 
                                    value={professional_ref_id}
                                    className={classNames({ "p-invalid": submitted && !category.professional_ref_id })} 
                                    id="professional_ref_id"  
                                    onChange={(e) => onInputChange(e, "professional_ref_id")} 
                                    required autoFocus
                                    options={professionalss}
                                    optionValue="id"
                                    placeholder="Choose a Professional"
                                    optionLabel="name">
                                </Dropdown>
                                {submitted && !category.professional_ref_id && <small className="p-error">Select Professional </small>}
                            </div>
                        </div>
                    <div className="formgrid grid">
                            <div className="field col">
                                <Button label="Cancel" icon="pi pi-times" className="p-button-secondary mr-2 mb-2" onClick={gotoPrevious} />
                            </div>
                            <div className="field col">
                                <Button label={"UPDATE"} icon="pi pi-check" className="p-button-warning mr-2 mb-2" onClick={addUpdateCategory} />
                            </div>
                    </div>
                </div>
        </div>
    </div>
  );
}

export default UpdateCategory;
