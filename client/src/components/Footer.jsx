import React, { useState } from 'react';
import Logo from "../../public/logo2.jpeg"
import {
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    Mail,
    Phone,
    Clock,
    MapPin,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
    const [formData, setFormData] = useState({ email: '', message: '' });

    const onFeedbackSubmit = (e) => {
        e.preventdefault();
        console.log('Feedback submitted:', formData);
        // Handle feedback submission
    };

    return (
        <footer className="bg-secondary/80 text-white py-8 px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {/* Company Information */}
                <div className='w-full'>
                    <div className="flex items-center justify-center sm:justify-start gap-4 mb-4">
                        <img src={Logo} alt="logo" className='size-7' />
                        <h2 className="text-2xl font-bold">My AI Study</h2>
                    </div>
                    <p  className="mb-3 text-center sm:text-start text-lg font-semibold">
                        Empowering students worldwide with AI-driven learning tools for personalized education and skill development.
                    </p>
                    <div className="flex justify-center items-center gap-4 sm:justify-start">
                        <Link to={"#"} className='hover:text-blue-500 duration-200 hover:scale-110'>
                            <Facebook />
                        </Link>
                        <Link to={"#"} className='hover:text-blue-500 duration-200 hover:scale-110'>
                            <Twitter />
                        </Link>
                        <Link to={"#"} className='hover:text-blue-500 duration-200 hover:scale-110'>
                            <Linkedin />
                        </Link>
                        <Link to={"#"} className='hover:text-blue-500 duration-200 hover:scale-110'>
                            <Instagram />
                        </Link>
                    </div>
                </div>

                {/* Contact Information */}
                <div>
                    <h3 className="text-white text-xl font-bold mb-4">Contact Us</h3>
                    <div className="space-y-4">
                        <div className="flex items-center font-semibold gap-2">
                            <MapPin className="w-5 h-5 text-accent" />
                            <p>Faridabad , Haryana</p>
                        </div>
                        <div className="flex items-center font-semibold gap-2">
                            <Mail className="w-5 h-5 text-accent" />
                            <a href="mailto:contact@myaistudy.com" className="hover:text-indigo-400 transition-colors">
                                tinup2580@gmail.com
                            </a>
                        </div>
                        <div className="flex items-center font-semibold gap-2">
                            <Phone className="w-5 h-5 text-accent" />
                            <a href="tel:+1-555-123-4567" className="hover:text-indigo-400 transition-colors">
                                +1 (555) 123-4567
                            </a>
                        </div>
                        <div className="flex items-center font-semibold gap-2">
                            <Clock className="w-5 h-5 text-accent" />
                            <p>
                                Monday - Friday<br />
                                9:00 AM - 6:00 PM PST
                            </p>
                        </div>
                    </div>
                </div>

                {/* Feedback and Newsletter */}
                <div>
                    <h3 className="text-white text-2xl font-bold text-center mb-4">Share Your Feedback</h3>
                    <form onSubmit={onFeedbackSubmit} className="space-y-4">
                        <div>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full px-4 h-10 border-2 bg-white text-gray-900 border-accent rounded-md outline-none focus:ring-2 focus:ring-primary-400 focus:border-none"
                            />
                            {formData.email && (
                                <span className="text-red-500 text-sm">Please enter a valid email</span>
                            )}
                        </div>
                        <div>
                            <textarea
                                placeholder="Your Message"
                                className="w-full px-4 py-1 border-2 bg-white text-gray-900 border-accent rounded-md outline-none focus:ring-2 focus:ring-primary-400 focus:border-none"
                                rows={3}
                            />
                            {formData.message && (
                                <span className="text-red-500 text-sm">Please enter your message</span>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-primary text-white font-bold py-2 px-4 rounded-md active:scale-90"
                        >
                            Submit Feedback
                        </button>
                    </form>
                </div>
            </div>

            <div className="border-t-2 border-accent mt-6 pt-4 text-center text-xl font-bold">
                <p>© 2024 My AI Study. All rights reserved.</p>
            </div>
        </footer>
    );
}