import { useState } from 'react';
import { FiMail, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error('Please enter your email address');
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            toast.success('Successfully subscribed to newsletter!');
            setEmail('');
            setIsLoading(false);
        }, 1000);
    };

    return (
        <section className="py-16 bg-gradient-to-br from-primary to-primary/80">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center text-white">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                        <FiMail className="w-8 h-8" />
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl md:text-4xl font-bold font-['Satoshi'] mb-4">
                        Stay Updated with Our Newsletter
                    </h2>
                    <p className="text-lg text-white/90 font-['Satoshi'] mb-8 max-w-2xl mx-auto">
                        Get the latest updates on resolved issues, community initiatives, and civic engagement opportunities delivered straight to your inbox.
                    </p>

                    {/* Newsletter Form */}
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="flex-1 relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className="w-full px-6 py-4 rounded-xl bg-white text-gray-900 font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                                    disabled={isLoading}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-8 py-4 bg-white text-primary rounded-xl font-['Satoshi'] font-bold hover:bg-white/90 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Subscribing...' : 'Subscribe'}
                                <FiSend size={18} />
                            </button>
                        </div>
                        <p className="text-sm text-white/70 font-['Satoshi'] mt-4">
                            We respect your privacy. Unsubscribe at any time.
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
