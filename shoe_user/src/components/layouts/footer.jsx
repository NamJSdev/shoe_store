import React from 'react'

export default function Footer() {
    return (
        <>
            {/* footer top area start */}
            <div className="footer-top-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-contact">
                                <img src="img/logo.png" alt="" />
                                <p>
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                                    nonummy nibh euismod tincidunt.
                                </p>
                                <ul className="address">
                                    <li>
                                        <span className="fa fa-fax" />
                                        (800) 123 456 789
                                    </li>
                                    <li>
                                        <span className="fa fa-phone" />
                                        (800) 123 456 789
                                    </li>
                                    <li>
                                        <span className="fa fa-envelope-o" />
                                        admin@bootexperts.com
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-tweets">
                                <div className="footer-title">
                                    <h3>Latest tweets</h3>
                                </div>
                                <div className="twitter-feed">
                                    <div className="twitter-article">
                                        <div className="twitter-img">
                                            <a href="#">
                                                <img src="img/twitter/twitter-1.png" alt="" />
                                            </a>
                                        </div>
                                        <div className="twitter-text">
                                            <p>
                                                Raboda Fashion #Magento #Theme comes up with pure white and
                                                grey, which great show your products. Check it:
                                            </p>
                                            {/* <a href="#">https://t.co/iu0OYBwti8</a> */}
                                            <div className="twitter-time">
                                                {/* <a href="#">16h</a> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="twitter-article">
                                        <div className="twitter-img">
                                            <a href="#">
                                                <img src="img/twitter/twitter-1.png" alt="" />
                                            </a>
                                        </div>
                                        <div className="twitter-text">
                                            <p>
                                                Raboda Fashion #Magento #Theme comes up with pure white and
                                                grey, which great show your products. Check it:
                                            </p>
                                            {/* <a href="#">https://t.co/iu0OYBwti8</a> */}
                                            <div className="twitter-time">
                                                {/* <a href="#">16h</a> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-support">
                                <div className="footer-title">
                                    <h3>Our support</h3>
                                </div>
                                <div className="footer-menu">
                                    <ul>
                                        <li>
                                            <a href="#">Sitemap</a>
                                        </li>
                                        <li>
                                            <a href="#">Privacy Policy</a>
                                        </li>
                                        <li>
                                            <a href="#">Your Account</a>
                                        </li>
                                        <li>
                                            <a href="#">Advanced Search</a>
                                        </li>
                                        <li>
                                            <a href="contact.html">Contact Us</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-info">
                                <div className="footer-title">
                                    <h3>Our information</h3>
                                </div>
                                <div className="footer-menu">
                                    <ul>
                                        <li>
                                            <a href="about-us.html">About Us</a>
                                        </li>
                                        <li>
                                            <a href="#">Customer Service</a>
                                        </li>
                                        <li>
                                            <a href="#">Privacy Policy</a>
                                        </li>
                                        <li>
                                            <a href="#">Orders and Returns</a>
                                        </li>
                                        <li>
                                            <a href="#">Site Map</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* footer top area end */}
            {/* footer area start */}
            <footer className="footer-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="footer-copyright">
                                <p>
                                    Copyright © 2024 <a href="#"> Dung Mac</a>. All Rights Reserved
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="payment-icon">
                                <img src="img/payment.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <a href="#" id="scrollUp">
                    <i className="fa fa fa-arrow-up" />
                </a>
            </footer>
            {/* footer area end */}
        </>
    )
}
