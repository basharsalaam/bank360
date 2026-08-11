import React, { useState } from "react";
import { ContactStyles } from "./style";
import { Icons } from "../../assets/icons";

const { Facebook, Instagram, Linkedin, X} = Icons;


const { ContactUs } = ContactStyles;


const Contact = () => {
    return (
        <ContactUs>
            <div className="container">
                <div className="form">
                    <div className="contact-info">
                        <span>
                            <h3 className="title">Let's get in touch</h3>
                            <p className="text">
                            Whether you have questions, need assistance, or just want to share your feedback,
                            our team is ready to support you.
                            </p>
                        </span>

                    <div className="info">
                        <div className="information">
                        <i className="fas fa-map-marker-alt"></i>

                        <p>74B, Murtala Muhammed way, Yaba, Lagos.
                        </p>
                        </div>
                        <div className="information">
                        <i className="fas fa-envelope"></i> 
                        <p>info@bank360.ng</p>
                        </div>
                        <div className="information">
                        <i className="fas fa-phone"></i>
                        <p>+234 814 0311 277</p>
                        </div>
                    </div>

                    <div className="social-media">
                        <p>Connect with us :</p>
                        <div className="social-icons">
                        <a href="https://facebook.com" target="_blank"><Facebook /></a>

                        <a href="https://instagram.com" target="_blank"><Instagram /> </a>

                        <a href="https://linkedin.com" target="_blank"><Linkedin /></a>

                        <a href="https://x.com" target="_blank"><X /></a>

                        </div>
                    </div>
                    </div>

                    <div className="contact-form">

                    <form action="index.html" autocomplete="off">
                        <h3 className="title">Contact us</h3>
                        <div className="input-container">
                        <label for="">First Name</label>
                        <input type="text" name="name" className="input" />
                        <span>First Name</span>
                        </div>
                        <div className="input-container">
                        <label for="">Last Name</label>
                        <input type="text" name="name" className="input" />
                        <span>Last Name</span>
                        </div>
                        <div className="input-container">
                        <label for="">Email</label>
                        <input type="email" name="email" className="input" />
                        <span>Email</span>
                        </div>
                        <div className="input-container">
                        <label for="">Phone</label>
                        <input type="tel" name="phone" className="input" />
                        <span>Phone</span>
                        </div>
                        <div className="input-container textarea">
                        <label for="">Message</label>
                        <textarea name="message" className="input"></textarea>
                        <span>Message</span>
                        </div>
                        <input type="submit" value="Send" className="btn" />
                    </form>
                    </div>
                </div>
                </div>
        </ContactUs>
    );
  };
  
  export default Contact;