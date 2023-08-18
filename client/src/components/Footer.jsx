import React from 'react';

import logo from '../assets/img/logo/logo.png';
import footer_bg from '../assets/img/bg/footer-bg-3.jpg';
export default function Footer() {
    return <div>
        <footer style={{ backgroundImage: `url(${footer_bg})` }}>
            <div className="footer-area footer-3 pb-60 pt-100">
            <div className="container">
                <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-6">
                    <div className="footer-widget mb-40">
                    {/*<div className="footer-logo mb-25">*/}
                    {/*    Probe*/}
                    {/*</div>*/}
                    <div className="social-icon mb-20">
                        <a href="#">
                        <i className="fab fa-facebook-f" />
                        </a>
                        <a href="#">
                        <i className="fab fa-twitter" />
                        </a>
                        <a href="#">
                        <i className="fab fa-behance" />
                        </a>
                        <a href="#">
                        <i className="fab fa-linkedin-in" />
                        </a>
                        <a href="#">
                        <i className="fab fa-youtube" />
                        </a>
                    </div>
                    <address className="address-point">
                        <span>Oyo, Nigeria</span>
                        <p>No 4, Our address here</p>
                        <a href="#">Find Us On Map</a>
                    </address>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6">
                    <div className="footer-widget mb-40">
                    <h4 className="footer-title">Campaign</h4>
                    <ul className="footer-link">
                        <li>
                        <a href="#">Trust &amp; Safety</a>
                        </li>
                        <li>
                        <a href="#">Support</a>
                        </li>
                        <li>
                        <a href="#">Terms of Use</a>
                        </li>
                        <li>
                        <a href="#">Privacy Policy</a>
                        </li>
                    </ul>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6">
                    <div className="footer-widget mb-40">
                    <h4 className="footer-title">Explore</h4>
                    <ul className="footer-link">
                        <li>
                        <a href="#">Videos</a>
                        </li>
                        <li>
                        <a href="#">Food</a>
                        </li>
                        <li>
                        <a href="#">Book</a>
                        </li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div className="copyright-area">
            <div className="container">
                <div className="copyright-border pt-30 pb-30">
                <div className="row align-items-center">
                    <div className="col-xl-6 col-lg-6">
                    <div className="right-text text-center text-lg-left">
                        <p>Copyright All Right Reserved</p>
                    </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 ">
                    <div className="social-icon-link text-center text-lg-right">
                        <a href="#">
                        <i className="fab fa-twitter" />
                        </a>
                        <a href="#">
                        <i className="fab fa-linkedin-in" />
                        </a>
                        <a href="#">
                        <i className="fab fa-youtube" />
                        </a>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </footer>
    </div>;
}