import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const socialLinks = [
    { name: 'GitHub', icon: 'ph-github-logo', href: 'https://github.com/utkarsshhhh' },
    { name: 'LinkedIn', icon: 'ph-linkedin-logo', href: 'https://www.linkedin.com/in/utkarsh-adlak/' },
    { name: 'Email', icon: 'ph-envelope', href: 'mailto:utkarshadlak@gmail.com' },
];


const Contact: React.FC = () => {
    const [ref, isVisible] = useScrollAnimation<HTMLElement>();
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('sending');

        const form = e.currentTarget;
        const data = new FormData(form);

        try {
            // IMPORTANT: Replace this URL with your own Formspree endpoint.
            // 1. Go to https://formspree.io/
            // 2. Create a new form and set the destination email to "utkarshadlak30@gmail.com"
            // 3. Copy the endpoint URL they provide and paste it below.
            const response = await fetch('https://formspree.io/f/mwprevzw', {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setStatus('success');
                form.reset();
                setTimeout(() => setStatus('idle'), 4000); // Reset after 4 seconds
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 4000);
            }
        } catch (error) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 4000);
        }
    };
    
    const getButtonText = () => {
        switch (status) {
            case 'sending': return 'Sending...';
            case 'success': return 'Message Sent!';
            case 'error': return 'Error! Try Again.';
            default: return 'Send Message';
        }
    }

    return (
        <section id="contact" ref={ref} className="py-24 sm:py-32 relative">
            <div className="container mx-auto px-6">
                <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    Get In Touch
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                        <h3 className="text-2xl sm:text-3xl font-semibold mb-4">Let's Connect</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-8">
                            I'm currently available for freelance work or full-time opportunities. If you have a project in mind or just want to say hi, feel free to reach out.
                        </p>
                        <div className="flex flex-wrap items-center gap-6">
                            {socialLinks.map((link, index) => (
                                <a 
                                    key={index} 
                                    href={link.href} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className={`text-4xl text-slate-700 dark:text-[#D8ECF8] transition-all duration-300 hover:text-slate-900 dark:hover:text-white hover:-translate-y-1 glowing-shadow-sm p-2 rounded-full`}
                                    aria-label={`Contact me on ${link.name}`}
                                >
                                    <i className={`ph-bold ${link.icon}`}></i>
                                </a>
                            ))}
                            <a 
                                href="https://res.cloudinary.com/dtppzubgz/image/upload/v1771919696/Resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-transparent border-2 border-slate-800 dark:border-[#D8ECF8] text-slate-800 dark:text-[#D8ECF8] font-bold py-3 px-6 rounded-lg glowing-btn-hover hover:bg-slate-800 dark:hover:bg-[#D8ECF8] hover:text-white dark:hover:text-[#05060f] transition-all duration-300"
                            >
                                Resume
                            </a>
                        </div>
                    </div>
                    <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                        <form 
                            onSubmit={handleSubmit} 
                            className="bg-white dark:bg-black/20 p-8 rounded-2xl border border-gray-200 dark:border-white/10 glowing-shadow-sm space-y-6"
                        >
                            <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{transitionDelay: '300ms'}}>
                                <input type="text" name="name" placeholder="Your Name" required className="w-full bg-gray-100 dark:bg-white/5 p-4 rounded-lg border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-[#D8ECF8]/50 transition-all text-slate-800 dark:text-white" />
                            </div>
                            <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{transitionDelay: '400ms'}}>
                                <input type="email" name="email" placeholder="Your Email" required className="w-full bg-gray-100 dark:bg-white/5 p-4 rounded-lg border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-[#D8ECF8]/50 transition-all text-slate-800 dark:text-white" />
                            </div>
                            <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{transitionDelay: '500ms'}}>
                                <textarea name="message" placeholder="Your Message" rows={4} required className="w-full bg-gray-100 dark:bg-white/5 p-4 rounded-lg border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-[#D8ECF8]/50 transition-all text-slate-800 dark:text-white resize-none"></textarea>
                            </div>
                            <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{transitionDelay: '600ms'}}>
                                <button 
                                    type="submit" 
                                    disabled={status === 'sending'}
                                    className={`w-full text-white dark:text-[#05060f] font-bold py-4 px-6 rounded-lg transition-all duration-300 glowing-btn-hover hover:bg-slate-700 dark:hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed
                                    ${status === 'success' ? 'bg-green-500' : ''}
                                    ${status === 'error' ? 'bg-red-500' : ''}
                                    ${status === 'idle' ? 'bg-slate-800 dark:bg-[#D8ECF8]' : ''}
                                    `}
                                >
                                    {getButtonText()}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
