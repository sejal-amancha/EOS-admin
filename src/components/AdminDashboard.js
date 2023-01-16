import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Route, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useHistory, useParams } from "react-router-dom";

import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import Dashboard from './Dashboard';

import { Tooltip } from 'primereact/tooltip';

import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import '../assets/demo/flags/flags.css';
import '../assets/demo/Demos.scss';
import '../assets/layout/layout.scss';
import '../App.scss';

import Users from './menu/Users';
import Professionals from './menu/Professionals';
import User from '../pages/SingleViews/User';
import Professional from '../pages/SingleViews/Professional';
import Services from './menu/Services';
import Service from '../pages/SingleViews/Service';
import AddUpdateNewService from '../pages/EditComponent/AddUpdateNewService';
import ServiceCategories from './menu/ServiceCategories';
import Orders from './menu/Orders';
import Order from '../pages/SingleViews/Order';
import Banners from './menu/Banners';
import Banner from '../pages/SingleViews/Banner';
import AddUpdateBanner from '../pages/EditComponent/AddUpdateBanner';
import Category from '../pages/SingleViews/Category';
import BestOffers from './menu/BestOffers';
import Offer from '../pages/SingleViews/Offer';
import Estimation from './menu/Estimation';
import AddCategory from '../pages/EditComponent/AddCategory';
import UpdateCategory from '../pages/EditComponent/UpdateCategory';
import AddUpdateOffer from '../pages/EditComponent/AddUpdateOffer';

const AdminDashboard = () => {

    const history = useHistory();

    useEffect(() => {
        const token = sessionStorage.getItem("ADMIN_TOKEN");
        if (!token) {
            history.push('/login')
        }
    },[])

    const [layoutMode, setLayoutMode] = useState('static');
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
    const copyTooltipRef = useRef();
    const location = useLocation();

    let menuClick = false;
    let mobileTopbarMenuClick = false;
     
    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);


    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    }

    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === 'overlay') {
                if (mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }

                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            }
            else if (layoutMode === 'static') {
                setStaticMenuInactive((prevState) => !prevState);
            }
        }
        else {
            setMobileMenuActive((prevState) => !prevState);
        }
        event.preventDefault();
    }

    const onSidebarClick = () => {
        menuClick = true;
    }

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;
        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    }

    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;
        event.preventDefault();
    }

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    }
    const isDesktop = () => {
        return window.innerWidth >= 992;
    }

    const menu = [
        {
            label: 'Home',
            items: [{
                label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/admindashboard'
            }]
        },
       
        {
            label: 'LISTS', icon: 'pi pi-fw pi-search',
            items: [
                { label: 'USERS', icon: 'pi pi-fw pi-users',  to: '/admindashboard/users'},  
                { label: 'PROFESSIONALS', icon: 'pi pi-fw pi-star-fill',  to: '/admindashboard/professionals'},  
                { label: 'ORDERS', icon: 'pi pi-fw pi-money-bill',  to: '/admindashboard/orders'}, 
                { label: 'ESTIMATION', icon: 'pi pi-fw pi-cog', to:'/admindashboard/estimations' }
            ]
        },

        {
            label: 'SERVICES', icon: 'pi pi-fw pi-search',
            items: [
                { label: 'SERVICES', icon: 'pi pi-fw pi-tags',  to: '/admindashboard/services'},  
                { label: 'OFFERS', icon: 'pi pi-fw pi-percentage' , to: '/admindashboard/best-offers'},   
                { label: 'BANNERS', icon: 'pi pi-fw pi-th-large' , to: '/admindashboard/banners'},   
            ]
        },
    ];

    const addClass = (element, className) => {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    const removeClass = (element, className) => {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    const wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
        'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
        'layout-mobile-sidebar-active': mobileMenuActive,
    });

    return (
        <div className={wrapperClass} onClick={onWrapperClick}>
            <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

            <AppTopbar onToggleMenuClick={onToggleMenuClick} 
                mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />

            <div className="layout-sidebar pointer-events-auto" onClick={onSidebarClick}>
                <AppMenu model={menu} onMenuItemClick={onMenuItemClick} />
            </div>

            <div className="layout-main-container"> 
                <div className="layout-main">
                    <Route path="/admindashboard" exact render={() => <Dashboard location={location} />}  />
                    <Route path="/admindashboard/users" component={Users} />
                    <Route path="/user-info/:id" component={User} />
                    <Route path="/admindashboard/professionals" component={Professionals} />
                    <Route path="/professional-info/:id" component={Professional} />
                    <Route path="/admindashboard/orders" component={Orders} />
                    <Route path="/order-info/:id" component={Order} />
                    <Route path="/admindashboard/estimations" component={Estimation} />
                    <Route path="/admindashboard/services" component={Services} />
                    <Route path="/service-info/:id" component={Service} />
                    <Route path="/addnew-service" component={AddUpdateNewService} />
                    <Route path="/update-service/:id" component={AddUpdateNewService} />
                    <Route path="/service-categories-info/:id" component={ServiceCategories} />
                    <Route path="/category-info/:id" component={Category} />
                    <Route path="/admindashboard/banners" component={Banners} />
                    <Route path="/addnew-banner" component={AddUpdateBanner} />
                    <Route path="/update-banner/:id" component={AddUpdateBanner} />
                    <Route path="/banner-info/:id" component={Banner} />
                    <Route path="/category/:id" component={Category} />
                    <Route path="/addnew-category/:id" component={AddCategory} />
                    <Route path="/update-service-category/:id" component={UpdateCategory} />
                    <Route path="/admindashboard/best-offers" component={BestOffers} />
                    <Route path="/addnew-offer" component={AddUpdateOffer} />
                    <Route path="/update-offer/:id" component={AddUpdateOffer} />
                    <Route path="/offer-info/:id" component={Offer} />
                </div>
                <AppFooter  />
            </div>

            <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                <div className="layout-mask p-component-overlay"></div>
            </CSSTransition>
        </div>
    );
}

export default AdminDashboard;
