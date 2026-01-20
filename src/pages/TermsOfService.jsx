import React from 'react';
import { Link } from 'react-router';

import { FiFileText, FiClock } from 'react-icons/fi';

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-base-200 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="bg-base-100 rounded-xl p-8 shadow-sm border border-base-300 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <FiFileText className="text-4xl text-primary" />
                        <div>
                            <h1 className="text-4xl font-bold text-base-content font-['Satoshi']">
                                Terms of Service
                            </h1>
                            <div className="flex items-center gap-2 text-base-content/70 font-['Satoshi'] mt-2">
                                <FiClock />
                                <span>Last updated: January 20, 2026</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-base-content/70 font-['Satoshi']">
                        Please read these terms carefully before using Civix. By accessing or using our service, you agree to be bound by these terms.
                    </p>
                </div>

                {/* Content */}
                <div className="bg-base-100 rounded-xl p-8 shadow-sm border border-base-300 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-4">
                            1. Acceptance of Terms
                        </h2>
                        <p className="text-base-content/70 font-['Satoshi'] mb-4">
                            By creating an account or using Civix, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-4">
                            2. Description of Service
                        </h2>
                        <p className="text-base-content/70 font-['Satoshi'] mb-4">
                            Civix is a platform that enables citizens to report, track, and resolve infrastructure issues in their communities. We provide tools for:
                        </p>
                        <ul className="list-disc list-inside text-base-content/70 font-['Satoshi'] space-y-2 ml-4">
                            <li>Reporting infrastructure problems with photos and location data</li>
                            <li>Tracking the status and progress of reported issues</li>
                            <li>Engaging with community members through upvoting and comments</li>
                            <li>Accessing premium features through paid subscriptions</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-4">
                            3. User Accounts
                        </h2>
                        <p className="text-base-content/70 font-['Satoshi'] mb-4">
                            To use certain features of Civix, you must create an account. You agree to:
                        </p>
                        <ul className="list-disc list-inside text-base-content/70 font-['Satoshi'] space-y-2 ml-4">
                            <li>Provide accurate and complete information during registration</li>
                            <li>Maintain the security of your account credentials</li>
                            <li>Notify us immediately of any unauthorized access</li>
                            <li>Be responsible for all activities under your account</li>
                            <li>Not share your account with others</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-4">
                            4. User Conduct
                        </h2>
                        <p className="text-base-content/70 font-['Satoshi'] mb-4">
                            When using Civix, you agree not to:
                        </p>
                        <ul className="list-disc list-inside text-base-content/70 font-['Satoshi'] space-y-2 ml-4">
                            <li>Submit false, misleading, or fraudulent issue reports</li>
                            <li>Harass, abuse, or harm other users</li>
                            <li>Violate any applicable laws or regulations</li>
                            <li>Infringe on intellectual property rights</li>
                            <li>Attempt to gain unauthorized access to our systems</li>
                            <li>Use automated tools to scrape or collect data</li>
                            <li>Spam or post irrelevant content</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-4">
                            5. Content and Intellectual Property
                        </h2>
                        <p className="text-base-content/70 font-['Satoshi'] mb-4">
                            You retain ownership of content you submit to Civix. However, by submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, display, and distribute your content for the purpose of operating and improving our service.
                        </p>
                        <p className="text-base-content/70 font-['Satoshi']">
                            All Civix branding, logos, and platform features are the property of Civix and protected by copyright and trademark laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-4">
                            6. Premium Services
                        </h2>
                        <p className="text-base-content/70 font-['Satoshi'] mb-4">
                            Premium subscriptions provide additional features such as issue boosting and priority support. Premium subscriptions:
                        </p>
                        <ul className="list-disc list-inside text-base-content/70 font-['Satoshi'] space-y-2 ml-4">
                            <li>Are billed at 100 tk per subscription period</li>
                            <li>Automatically renew unless cancelled</li>
                            <li>Can be cancelled at any time from your dashboard</li>
                            <li>Are non-refundable except as required by law</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-4">
                            7. Termination
                        </h2>
                        <p className="text-base-content/70 font-['Satoshi'] mb-4">
                            We reserve the right to suspend or terminate your account if you violate these terms or engage in harmful behavior. You may also delete your account at any time from your profile settings.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-4">
                            8. Disclaimer of Warranties
                        </h2>
                        <p className="text-base-content/70 font-['Satoshi'] mb-4">
                            Civix is provided "as is" without warranties of any kind. We do not guarantee that:
                        </p>
                        <ul className="list-disc list-inside text-base-content/70 font-['Satoshi'] space-y-2 ml-4">
                            <li>The service will be uninterrupted or error-free</li>
                            <li>All reported issues will be resolved</li>
                            <li>The service will meet your specific requirements</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-4">
                            9. Limitation of Liability
                        </h2>
                        <p className="text-base-content/70 font-['Satoshi'] mb-4">
                            To the maximum extent permitted by law, Civix shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-4">
                            10. Changes to Terms
                        </h2>
                        <p className="text-base-content/70 font-['Satoshi'] mb-4">
                            We may update these terms from time to time. We will notify users of significant changes via email or platform notifications. Continued use of Civix after changes constitutes acceptance of the updated terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-4">
                            11. Contact Information
                        </h2>
                        <p className="text-base-content/70 font-['Satoshi'] mb-4">
                            If you have questions about these Terms of Service, please contact us:
                        </p>
                        <div className="bg-base-200 rounded-lg p-4 font-['Satoshi']">
                            <p className="text-base-content/70">Email: support@civix.com</p>
                            <p className="text-base-content/70">Phone: +880 123 456 7890</p>
                            <p className="text-base-content/70">Address: Kafrul, Dhaka Division, Bangladesh</p>
                        </div>
                    </section>
                </div>

                {/* Footer Navigation */}
                <div className="mt-8 flex flex-wrap gap-4 justify-center">
                    <Link
                        to="/privacy"
                        className="px-6 py-3 bg-base-100 text-base-content rounded-lg font-['Satoshi'] font-semibold hover:bg-base-200 transition-colors border border-base-300"
                    >
                        Privacy Policy
                    </Link>
                    <Link
                        to="/community-guidelines"
                        className="px-6 py-3 bg-base-100 text-base-content rounded-lg font-['Satoshi'] font-semibold hover:bg-base-200 transition-colors border border-base-300"
                    >
                        Community Guidelines
                    </Link>
                    <Link
                        to="/"
                        className="px-6 py-3 bg-primary text-white rounded-lg font-['Satoshi'] font-semibold hover:bg-primary/80 transition-colors"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
