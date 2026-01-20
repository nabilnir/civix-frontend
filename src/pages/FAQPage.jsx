import React, { useState } from 'react';
import { Link } from 'react-router';

import { FiChevronDown, FiChevronUp, FiHelpCircle } from 'react-icons/fi';

const FAQPage = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            category: 'Getting Started',
            questions: [
                {
                    question: 'How do I create an account on Civix?',
                    answer: 'Click the "Sign Up" button in the top right corner, fill in your details (name, email, password), and verify your email address. You can also sign up using Google authentication for faster registration.',
                },
                {
                    question: 'Is Civix free to use?',
                    answer: 'Yes! Civix offers a free tier that allows you to report issues, track their progress, and engage with the community. We also offer a premium subscription (100 tk) that provides additional features like issue boosting and priority support.',
                },
                {
                    question: 'What types of issues can I report?',
                    answer: 'You can report various infrastructure issues including potholes, broken streetlights, sewerage problems, garbage collection issues, water supply problems, and other civic infrastructure concerns.',
                },
            ],
        },
        {
            category: 'Reporting Issues',
            questions: [
                {
                    question: 'How do I report an infrastructure issue?',
                    answer: 'Log in to your account, click "Report Issue" from your dashboard, fill in the details (title, description, category, location), add photos if available, and submit. You\'ll receive a confirmation and can track the issue\'s progress.',
                },
                {
                    question: 'Can I add photos to my issue report?',
                    answer: 'Yes! Adding photos is highly encouraged as it helps authorities better understand the problem. You can upload multiple images (max 5MB each) when creating or editing an issue.',
                },
                {
                    question: 'How long does it take for an issue to be resolved?',
                    answer: 'Resolution time varies depending on the severity and complexity of the issue. High-priority issues are typically addressed within 24-48 hours, while normal issues may take 3-7 days. You\'ll receive updates as the issue progresses.',
                },
                {
                    question: 'Can I edit or delete my issue after submitting?',
                    answer: 'Yes, you can edit your issue details or delete it from your "My Issues" page in the dashboard, as long as it hasn\'t been assigned to staff yet.',
                },
            ],
        },
        {
            category: 'Premium Features',
            questions: [
                {
                    question: 'What is issue boosting?',
                    answer: 'Issue boosting is a premium feature that increases the visibility of your issue, making it more likely to be seen and addressed quickly by authorities. Boosted issues appear at the top of the issue list.',
                },
                {
                    question: 'How much does premium membership cost?',
                    answer: 'Premium membership costs 100 tk per subscription period. You can subscribe from your dashboard and cancel anytime.',
                },
                {
                    question: 'What benefits do premium members get?',
                    answer: 'Premium members enjoy: issue boosting to increase visibility, priority customer support, advanced analytics on their reported issues, and early access to new features.',
                },
                {
                    question: 'Can I cancel my premium subscription?',
                    answer: 'Yes, you can cancel your premium subscription at any time from your profile settings. You\'ll continue to have premium access until the end of your current billing period.',
                },
            ],
        },
        {
            category: 'Account & Privacy',
            questions: [
                {
                    question: 'How do I update my profile information?',
                    answer: 'Go to your dashboard, click on "Profile" in the sidebar, and you can update your name, phone number, and profile photo. Your email address cannot be changed for security reasons.',
                },
                {
                    question: 'Is my personal information safe?',
                    answer: 'Yes! We take data security seriously. All data is encrypted in transit and at rest. We never sell your personal information. Read our Privacy Policy for more details.',
                },
                {
                    question: 'Can I report issues anonymously?',
                    answer: 'No, you need to be logged in to report issues. This helps us track issue ownership, prevent spam, and keep you updated on progress. However, your contact information is not publicly displayed.',
                },
                {
                    question: 'How do I delete my account?',
                    answer: 'You can delete your account from your profile settings. Please note that this action is permanent and will remove all your data, including reported issues.',
                },
            ],
        },
        {
            category: 'Community & Engagement',
            questions: [
                {
                    question: 'What is upvoting?',
                    answer: 'Upvoting allows you to show support for issues reported by others. Issues with more upvotes get higher visibility and priority. You can upvote any issue from the issue details page.',
                },
                {
                    question: 'How do I follow updates on an issue?',
                    answer: 'When you report an issue or upvote it, you automatically follow it and will receive email notifications about status changes and updates.',
                },
                {
                    question: 'Can I comment on issues?',
                    answer: 'Currently, commenting is not available, but you can upvote issues to show support. We\'re working on adding a comment feature in future updates.',
                },
                {
                    question: 'What should I do if I see inappropriate content?',
                    answer: 'Please report it immediately using the report button or contact us at support@civix.com. We take community guidelines seriously and will investigate all reports.',
                },
            ],
        },
        {
            category: 'Technical Support',
            questions: [
                {
                    question: 'The app is not working properly. What should I do?',
                    answer: 'Try clearing your browser cache and refreshing the page. If the problem persists, contact our support team at support@civix.com with details about the issue and your browser/device information.',
                },
                {
                    question: 'I forgot my password. How do I reset it?',
                    answer: 'Click "Forgot Password" on the login page, enter your email address, and you\'ll receive a password reset link. Follow the instructions in the email to create a new password.',
                },
                {
                    question: 'Which browsers are supported?',
                    answer: 'Civix works best on the latest versions of Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience.',
                },
                {
                    question: 'Is there a mobile app?',
                    answer: 'Currently, Civix is a web-based platform optimized for mobile browsers. We\'re working on native mobile apps for iOS and Android, coming soon!',
                },
            ],
        },
    ];

    const toggleQuestion = (categoryIndex, questionIndex) => {
        const index = `${categoryIndex}-${questionIndex}`;
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-base-200 py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <FiHelpCircle className="text-6xl text-primary mx-auto mb-4" />
                    <h1 className="text-4xl md:text-5xl font-bold text-base-content font-['Satoshi'] mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-lg text-base-content/70 font-['Satoshi'] max-w-2xl mx-auto">
                        Find answers to common questions about using Civix. Can't find what you're looking for?{' '}
                        <Link to="/help" className="text-primary hover:underline">
                            Visit our Help Center
                        </Link>
                    </p>
                </div>

                {/* FAQ Categories */}
                <div className="space-y-8">
                    {faqs.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300">
                            <h2 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-6">
                                {category.category}
                            </h2>
                            <div className="space-y-4">
                                {category.questions.map((faq, questionIndex) => {
                                    const index = `${categoryIndex}-${questionIndex}`;
                                    const isOpen = openIndex === index;

                                    return (
                                        <div
                                            key={questionIndex}
                                            className="border border-base-300 rounded-lg overflow-hidden"
                                        >
                                            <button
                                                onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                                                className="w-full px-6 py-4 flex items-center justify-between bg-base-200 hover:bg-base-300 transition-colors text-left"
                                            >
                                                <span className="font-semibold text-base-content font-['Satoshi'] pr-4">
                                                    {faq.question}
                                                </span>
                                                {isOpen ? (
                                                    <FiChevronUp className="text-primary flex-shrink-0" />
                                                ) : (
                                                    <FiChevronDown className="text-base-content/50 flex-shrink-0" />
                                                )}
                                            </button>
                                            {isOpen && (
                                                <div className="px-6 py-4 bg-base-100">
                                                    <p className="text-base-content/70 font-['Satoshi']">{faq.answer}</p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Support */}
                <div className="mt-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-8 border border-primary/20 text-center">
                    <h3 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-3">
                        Still have questions?
                    </h3>
                    <p className="text-base-content/70 font-['Satoshi'] mb-6">
                        Our support team is here to help you with any questions or concerns.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            to="/help"
                            className="px-6 py-3 bg-primary text-white rounded-lg font-['Satoshi'] font-semibold hover:bg-primary/80 transition-colors"
                        >
                            Visit Help Center
                        </Link>
                        <Link
                            to="/contact"
                            className="px-6 py-3 bg-base-100 text-base-content rounded-lg font-['Satoshi'] font-semibold hover:bg-base-200 transition-colors border border-base-300"
                        >
                            Contact Support
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQPage;
