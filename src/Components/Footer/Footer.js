import React from "react";
import logo from "../images/logo.png";
import {
    FaFacebookSquare,
    FaLinkedin,
    FaInstagramSquare,
    FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
    return (
        <div id="contact" className="bg_1">
            <footer className="footer container mx-auto lg:justify-items-center p-10 text-white grid lg:grid-cols-4">
                <div className="text-start">
                    <figure>
                        <img className="h-10 w-10 rounded-full mb-2" src={logo} alt="" />
                    </figure>
                    <p>
                        <span className="font-bold text-orange-400 text-xl">Hotline</span>{" "}
                        +91 657 3460
                    </p>
                    <p>2nd Floor, Navana DH Tower, Plot:06, Panthapath, Dhaka 1215</p>
                    <p className="text-orange-400 font-semibold mb-4">Retouched.ai</p>
                    <div className="flex text-white gap-1">
                        <a className="link link-hover">
                            <FaFacebookSquare className="h-6 w-6" />
                        </a>
                        <a className="link link-hover">
                            <FaLinkedin className="h-6 w-6" />
                        </a>
                        <a className="link link-hover">
                            <FaInstagramSquare className="h-6 w-6" />
                        </a>
                        <a className="link link-hover">
                            <FaTwitterSquare className="h-6 w-6" />
                        </a>
                    </div>
                </div>

                <div className="flex flex-col text-start gap-2">
                    <span className="text-lg font-bold text-orange-400  ">Company</span>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Blog</a>
                    <a className="link link-hover">Location</a>
                </div>
                <div className="flex flex-col text-start gap-2">
                    <span className="text-lg font-bold text-orange-400">Legal</span>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                    <a className="link link-hover">Data Management </a>
                </div>
                <div className="text-center md:ml-0 lg:ml-0">
                    <span className="font-bold text-orange-400 text-lg pb-2  lg:ml-5">
                        Our Address
                    </span>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10329.283883735325!2d90.39304891556642!3d23.749043274767246!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xc1fb12dbea63beca!2sCutOutWiz!5e0!3m2!1sbn!2sbd!4v1639129804206!5m2!1sbn!2sbd"
                        width="75%"
                        height="75%"
                        style={{ border: "0" }}
                        allowfullscreen=""
                        loading="lazy"
                        className="ml-10"
                    ></iframe>
                </div>
            </footer>
            <footer className="footer px-10 py-4 border-t bg_1 text-white  justify-center ">
                <div className="items-center grid-flow-col">
                    <p className="text-center">
                        <span className="text-orange-400">Retouced.ai</span> <br />
                        © Copyright 2023
                    </p>
                </div>
                <div className="md:place-self-center md:justify-self-end">
                    <div className="grid grid-flow-col gap-4"></div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;