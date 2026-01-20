import React, { useState } from 'react';
import { Link } from 'react-router';
import { FiSearch, FiBook, FiMessageCircle, FiShield, FiUsers, FiHelpCircle, FiMail } from 'react-icons/fi';


const HelpCenter = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        {
            icon: <FiBook className="text-3xl" />,
            title: 'Getting Started',
            description: 'Learn the basics of using Civix',
            articles: [
                { title: 'How to create an account', link: '#' },
                { title: 'Reporting your first issue', link: '#' },
                { title: 'Understanding issue statuses', link: '#' },
                { title: 'Navigating the dashboard', link: '#' },
            ],
        },
        {
            icon: <FiMessageCircle className="text-3xl" />,
            title: 'Reporting Issues',
            description: 'Everything about submitting and tracking issues',
            articles: [
                { title: 'How to report an infrastructure issue', link: '#' },
                { title: 'Adding photos and location', link: '#' },
                { title: 'Tracking issue progress', link: '#' },
                { title: 'Editing or deleting your issue', link: '#' },
            ],
        },
        {
            icon: <FiShield className="text-3xl" />,
            title: 'Account & Privacy',
            description: 'Manage your account and privacy settings',
            articles: [
                { title: 'Updating your profile', link: '#' },
                { title: 'Privacy settings', link: '#' },
                { title: 'Deleting your account', link: '#' },
                { title: 'Data security', link: '#' },
            ],
        },
        {
            icon: <FiUsers className="text-3xl" />,
            title: 'Community',
            description: 'Engage with the Civix community',
            articles: [
                { title: 'Community guidelines', link: '/community-guidelines' },
                { title: 'Upvoting issues', link: '#' },
                { title: 'Boosting issues', link: '#' },
                { title: 'Following issue updates', link: '#' },
            ],
        },
    ];

    const faqs = [
        {
            question: 'How long does it take for an issue to be resolved?',
            answer: 'Resolution time varies depending on the severity and complexity of the issue. Typically, high-priority issues are addressed within 24-48 hours, while normal issues may take 3-7 days.',
        },
        {
            question: 'Can I report issues anonymously?',
            answer: 'No, you need to create an account to report issues. This helps us track issue ownership and keep you updated on progress.',
        },
        {
            question: 'What is issue boosting?',
            answer: 'Boosting is a premium feature that increases the visibility of your issue, helping it get faster attention from authorities.',
        },
        {
            question: 'How do I become a premium member?',
            answer: 'You can upgrade to premium from your dashboard. Premium membership costs 100 tk and provides benefits like issue boosting and priority support.',
        },
    ];

    return (
        <div className="min-h-screen bg-base-200">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-primary to-secondary text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold font-['Satoshi'] mb-4">
                            How can we help you?
                        </h1>
                        <p className="text-lg mb-8 opacity-90">
                            Search our knowledge base or browse categories below
                        </p>

                        {/* Search Bar */}
                        <div className="relative">
                            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                                type="text"
                                placeholder="Search for help articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-lg bg-white text-gray-900 font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className="container mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold text-base-content font-['Satoshi'] mb-8 text-center">
                    Browse by Category
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300 hover:shadow-md transition-shadow"
                        >
                            <div className="text-primary mb-4">{category.icon}</div>
                            <h3 className="text-xl font-bold text-base-content font-['Satoshi'] mb-2">
                                {category.title}
                            </h3>
                            <p className="text-base-content/70 font-['Satoshi'] text-sm mb-4">
                                {category.description}
                            </p>
                            <ul className="space-y-2">
                                {category.articles.map((article, idx) => (
                                    <li key={idx}>
                                        <a
                                            href={article.link}
                                            className="text-sm text-primary hover:underline font-['Satoshi']"
                                        >
                                            {article.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Popular FAQs */}
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-base-content font-['Satoshi'] mb-8 text-center">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300"
                            >
                                <h3 className="text-lg font-bold text-base-content font-['Satoshi'] mb-3 flex items-start gap-2">
                                    <FiHelpCircle className="text-primary mt-1 flex-shrink-0" />
                                    {faq.question}
                                </h3>
                                <p className="text-base-content/70 font-['Satoshi'] pl-7">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <Link
                            to="/faq"
                            className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-['Satoshi'] font-semibold hover:bg-primary/80 transition-colors"
                        >
                            View All FAQs
                        </Link>
                    </div>
                </div>

                {/* Contact Support */}
                <div className="max-w-2xl mx-auto mt-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-8 border border-primary/20 text-center">
                    <FiMail className="text-5xl text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-3">
                        Still need help?
                    </h3>
                    <p className="text-base-content/70 font-['Satoshi'] mb-6">
                        Can't find what you're looking for? Our support team is here to help.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-['Satoshi'] font-semibold hover:bg-primary/80 transition-colors"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HelpCenter;
