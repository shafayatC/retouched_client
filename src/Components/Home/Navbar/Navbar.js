import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import imgTrain from "./img/train.svg";
import logo from '../../images/logo_2.png'
import "./navbar.css";
import { menuContextManager, OrderContextManager, userContextManager } from "../../../App";
import localforage from "localforage";

const Navbar = ({ items }) => {
  //const [error, setError] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [getMenuId, setMenuId] = useContext(menuContextManager)
  const [getUserInfo, setUserInfo] = useContext(userContextManager);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const signOutFunc = () => {
    localforage.removeItem("userInfo");
    setUserInfo({});


  };

  const refresh = () => {
    window.location.reload(true)


  }

  const [showSignInForm, setShowSignInForm] = useState(false);

  function handleOpen() {
    setShowSignInForm(true);
  }

  function handleClose() {
    setShowSignInForm(false);
  }



  return (
    <nav className=" px-2 sm:px-4 shadow-md light:bg-gray-900">
      {console.log(items)}
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link to="/" className="flex items-center">
          <span>
            <img className="h-8 w-52 -ml-6" src={logo} alt="" />
          </span>

        </Link>
        <button
          type="button"
          onClick={handleToggle}
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 light:text-gray-400 light:hover:bg-gray-700 light:focus:ring-gray-600"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <div className="menuWrap flex flex-col gap-4 border border-gray-100 rounded-lg bg-black-shade md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-black-shade light:bg-gray-800 md:light:bg-gray-900 light:border-gray-700">
            {typeof items !== 'undefined' && items.map((item, index) =>
              !item.parent_menu_list_id &&
              <div
                key={index}
                className={item.type == "sign_up" ? Object.keys(getUserInfo).length > 0 ? "hidden" : " py-2 " : item.type == "sign_in" ? Object.keys(getUserInfo).length > 0 ? "hidden" : " py-2" : " py-2"}
                style={{
                  order: item.sequence_no,
                  marginLeft: "0px",
                  marginRight: "0px",
                  position: "relative"
                }}>

                {item.type == "sign_up" ?
                  <button
                    onClick={() =>
                      document.querySelector("#singUpButton").click()
                    }
                  >
                    <button className={`rounded-md text-white w-20 py-1 hover:bg-white hover:text-black ${item.type == 'sign_up' && 'bg-theme-shade'}`}>
                      <div key={item.id}>{item.name}</div>
                    </button>
                  </button>
                  : item.type == "sign_in" ?
                    <button
                      onClick={() =>
                        document.querySelector("#singInButton").click()
                      }
                    >
                      <button className={`rounded-md text-white w-20 py-1 hover:bg-white hover:text-black ${item.type == 'sign_up' && 'bg-theme-shade'}`}>
                        <div key={item.id}>{item.name}</div>
                      </button>
                    </button>
                    :
                    <Link
                      onClick={() => setMenuId(item.id)}
                      to={item.url}
                    >
                      <button className={`rounded-md text-white w-20 py-1 hover:bg-white hover:text-black ${item.type == 'sign_up' && 'bg-theme-shade'}`}>
                        <div key={item.id}>{item.name}</div>
                      </button>
                    </Link>
                }


                <div className="subMenu">
                  {items.map((subItem, subIndex) =>
                    item.id === subItem.parent_menu_list_id &&
                    <div key={subIndex}
                      className={`menuItem ${getUserInfo.status_code !== 200 && 'displayNone'}`}
                      style={{
                        order: subItem.sequence_no
                      }}
                    >
                      <Link to={subItem.url}>
                        <button>
                          <div key={subItem.id}>{subItem.name}</div>
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {getUserInfo.status_code == 200 && (
              <div
                className={" px-4  py-2"}
                style={{
                  order: 99,
                  marginLeft: "0px",
                  marginRight: "0px",
                  position: "relative"
                }}>
                <a
                >
                  {/* <Link to="/"> */}
                  <button
                    onClick={() => {
                      signOutFunc();
                      refresh();
                    }}
                    className="bg-theme-shade rounded-md text-white w-20 py-1 hover:bg-white hover:text-black"
                  >
                    <div>Sign out</div>
                  </button>
                  {/* </Link> */}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
