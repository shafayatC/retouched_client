
import { createContext, useState } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import HomeContainer from './Components/HomeContainer/HomeContainer';
import InitialDataLoad from './Components/InitialDataLoad/InitialDataLoad';
import CostBreakDown from './Components/CostBreakDown/CostBreakDown';
import Pricing from './Components/Pricing/Pricing';

import SignIn from './Components/Login/SignIn';
import SignUp from './Components/Login/SignUp';
import { ToastContainer } from "react-toastify";
import ThankYouNote from './Components/Login/ThankYouNote';
import SetPassword from './Components/Login/SetPassword';
import ResetPasswordForm from './Components/Login/ResetPasswordForm';
import ResetPassword from './Components/Login/ResetPassword';

export const FileContextManager = createContext();
export const OrderContextManager = createContext();
export const userContextManager = createContext();
export const menuContextManager = createContext();
export const apiUrlContextManager = createContext();

function App() {
  const [fileInfo, setFileInfo] = useState([]);
  const [getAfterBeforeImg, setAfterBeforeImg] = useState([]);
  const [getImageData, setImageData] = useState()
  const [getMenuId, setMenuId] = useState("")
  const [getLockMenuBool, setLockMenuBool] = useState(false);
  const [getServiceTypeId, setServiceTypeId] = useState("")
  const [getMenu, setMenu] = useState([]);
  const [getDashboardMenu, setDashboardMenu] = useState([])
  const [getUserInfo, setUserInfo] = useState({});
  const [getToken, setToken] = useState("p_k_hKqzczG8QEAdqdy0h5OMOO0ngQ4nawou");
  const [getOrderMasterId, setOrderMasterId] = useState("");
  const [getSubscriptionPlanId, setSubscriptionPlanId] = useState("");
  const [actionStatus, setActionStatus] = useState("");
  const [getTotalImage, setTotalImage] = useState(0);
  const [getProccessImgIndex, setProccessImgIndex] = useState(0);
  const [getCostDetails, setCostDetails] = useState({})
  const [getOrderDetailInfo, setOrderDetailInfo] = useState([])
  const [getSrvPopBool, setSrvPopBool] = useState(true);
  const [getModelBaseUrl, setModelBaseUrl] = useState("");
  const [getApiBasicUrl, setApiBasicUrl] = useState("http://103.197.204.22:8007/api/2023-02");





  return (
    <FileContextManager.Provider
      value={[
        fileInfo,
        setFileInfo,
        getAfterBeforeImg,
        setAfterBeforeImg,
        getLockMenuBool,
        setLockMenuBool,
        getImageData,
        setImageData,
        actionStatus,
        setActionStatus,
        getProccessImgIndex,
        setProccessImgIndex,
        getTotalImage,
        setTotalImage
      ]}
    >
      <OrderContextManager.Provider value={[getServiceTypeId, setServiceTypeId, getSubscriptionPlanId, setSubscriptionPlanId, getOrderMasterId, setOrderMasterId, getCostDetails, setCostDetails, getSrvPopBool, setSrvPopBool, getOrderDetailInfo, setOrderDetailInfo]}>
        <userContextManager.Provider value={[getUserInfo, setUserInfo, getToken, setToken]}>
          <menuContextManager.Provider value={[getMenuId, setMenuId, getMenu, setMenu, getDashboardMenu, setDashboardMenu]}>
            <apiUrlContextManager.Provider value={[getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl]}>
              <div className="App">
                <InitialDataLoad />
                <Routes>
                  <Route path="/" element={<HomeContainer />} />
                  <Route path='/cost-breakdown' element={<CostBreakDown />} />
                  <Route path='/pricing' element={<Pricing />} />
                  <Route path='/log-in' element={<SignIn />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route path="/confirm-password/:token" element={<SetPassword />} />
                  <Route path="/resetpasswordform/" element={<ResetPasswordForm />} />
                  <Route path="/reset-password/:token" element={<ResetPassword />} />
                  <Route path="" element={<ThankYouNote/>}/>
                </Routes>
              </div>
              <ToastContainer/>
            </apiUrlContextManager.Provider>
          </menuContextManager.Provider>
        </userContextManager.Provider>
      </OrderContextManager.Provider>
    </FileContextManager.Provider>
  );
}

export default App;
