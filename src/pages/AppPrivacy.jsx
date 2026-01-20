import React from 'react';
import { Link } from 'react-router';

import { FiShield, FiClock, FiLock } from 'react-icons/fi';

const AppPrivacy = () => {
    return (
        <div className="min-h-screen bg-base-200 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="bg-base-100 rounded-xl p-8 shadow-sm border border-base-300 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <FiShield className="text-4xl text-primary" />
                        <div>
                            <h1 className="text-4xl font-bold text-base-content font-['Satoshi']">
                                Privacy Policy
                            </h1>
                            <div className="flex items-center gap-2 text-base-content/70 font-['Satoshi'] mt-2">
                                <FiClock />
                                <span>Last updated: January 20, 2026</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-base-content/70 font-['Satoshi']">
                        Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
                    </p>
                </div>

                {/* Content */}
                <div className="bg-base-100 rounded-xl p-8 shadow-sm border border-base-300 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-4">
                            1. Information We Collect
                        </h2>
                        <p className="text-base-content/70 font-['Satoshi'] mb-4">
                            We collect information that you provide directly to us, including:
                        </p>
                        <ul className="list-disc list-inside text-base-content/70 font-['Satoshi'] space-y-2 ml-4">
                            <li><strong>Account Information:</strong> Name, email address, phone number, and profile photo</li>
                            <li><strong>Issue Reports:</strong> Descriptions, photos, location data, and timestamps</li>
                            <li><strong>Payment Information:</strong> Payment method details for premium subscriptions (processed securely by third-party providers)</li>
                            <li><strong>Usage Data:</strong> How you interact with our platform, including pages visited and features used</li>
                            <li><strong>Device Information:</strong> IP address, browser type, and operating system</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-4">
                            2. How We Use Your Information
                        </h2>
                        <p className="text-base-content/70 font-['Satoshi'] mb-4">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc list-inside text-base-content/70 font-['Satoshi'] space-y-2 ml-4">
                            <li>Provide, maintain, and improve our services</li>
                            <li>Process and track issue reports</li>
                            <li>Communicate with you about your account and issues</li>
                            <li>Process payments and manage subscriptions</li>
                            <li>Send important updates and notifications</li>
                            <li>Analyze usage patterns to improve user experience</li>
                            <li>Prevent fraud and ensure platform security</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-4">
                            3. Information Sharing
                        </h2>
                        <p className="text-base-content/70 font-['Satoshi'] mb-4">
                            We do not sell your personal information. We may share your information with:
                        </p>
                        <ul className="list-disc list-inside text-base-content/70 font-['Satoshi'] space-y-2 ml-4">
                            <li><strong>Government Authorities:</strong> Issue reports are shared with relevant authorities for resolution</li>
                            <li><strong>Service Providers:</strong> Third-party services that help us operate (e.g., payment processors, cloud hosting)</li>
                            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                            <li><strong>Public Display:</strong> Issue reports and user profiles are visible to other users</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-4">
                            4. Data Security
                        </h2>
                        <p className="text-base-content/70 font-['Satoshi'] mb-4">
                            We implement appropriate technical and organizational measures to protect your personal information, including:
                        </p>
                        <ul className="list-disc list-inside text-base-content/70 font-['Satoshi'] space-y-2 ml-4">
                            <li>Encryption of data in transit and at rest</li>
                            <li>Regular security assessments and updates</li>
                            <li>Access controls and authentication</li>
                            <li>Secure payment processing through trusted providers</li>
                        </ul>
                        <p className="text-base-content/70 font-['Satoshi'] mt-4">
                            However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-4">
                            5. Your Rights and Choices
                        </h2>
                        <p className="text-base-content/70 font-['Satoshi'] mb-4">
                            You have the right to:
                        </p>
                        <ul className="list-disc list-inside text-base-content/70 font-['Satoshi'] space-y-2 ml-4">
                            <li><strong>Access:</strong> Request a copy of your personal data</li>
                            <li><strong>Correction:</strong> Update or correct your information</li>
                            <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                            <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                            <li><strong>Data Portability:</strong> Request your data in a portable format</li>
                        </ul>
                        <p className="text-base-content/70 font-['Satoshi'] mt-4">
                            To exercise these rights, please contact us at support@civix.com or use your account settings.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-4">
                            6. Cookies and Tracking
                        </h2>
                        <p className="text-base-content/70 font-['Satoshi'] mb-4">
                            We use cookies and similar technologies to:
                        </p>
                        <ul className="list-disc list-inside text-base-content/70 font-['Satoshi'] space-y-2 ml-4">
                            <li>Remember your preferences and settings</li>
                            <li>Analyze how you use our platform</li>
                            <li>Improve platform performance</li>
                            <li>Provide personalized content</li>
                        </ul>
                        <p className="text-base-content/70 font-['Satoshi'] mt-4">
                            You can control cookies through your browser settings, but some features may not work properly if cookies are disabled.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-4">
                            7. Children's Privacy
                        </h2>
                        <p className="text-base-content/70 font-['Satoshi']">
                            Civix is not intended for users under 13 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-4">
                            8. Data Retention
                        </h2>
                        <p className="text-base-content/70 font-['Satoshi']">
                            We retain your personal information for as long as necessary to provide our services and comply with legal obligations. When you delete your account, we will delete or anonymize your personal data, except where retention is required by law.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-4">
                            9. International Data Transfers
                        </h2>
                        <p className="text-base-content/70 font-['Satoshi']">
                            Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with this privacy policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-4">
                            10. Changes to This Policy
                        </h2>
                        <p className="text-base-content/70 font-['Satoshi']">
                            We may update this privacy policy from time to time. We will notify you of significant changes via email or platform notification. The "Last updated" date at the top indicates when the policy was last revised.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-4">
                            11. Contact Us
                        </h2>
                        <p className="text-base-content/70 font-['Satoshi'] mb-4">
                            If you have questions about this Privacy Policy or how we handle your data, please contact us:
                        </p>
                        <div className="bg-base-200 rounded-lg p-4 font-['Satoshi']">
                            <p className="text-base-content/70">Email: support@civix.com</p>
                            <p className="text-base-content/70">Phone: +880 123 456 7890</p>
                            <p className="text-base-content/70">Address: Kafrul, Dhaka Division, Bangladesh</p>
                        </div>
                    </section>

                    {/* Security Badge */}
                    <div className="bg-primary/10 rounded-lg p-6 border border-primary/20 text-center">
                        <FiLock className="text-4xl text-primary mx-auto mb-3" />
                        <h3 className="text-xl font-bold text-base-content font-['Satoshi'] mb-2">
                            Your Data is Secure
                        </h3>
                        <p className="text-base-content/70 font-['Satoshi']">
                            We use industry-standard encryption and security practices to protect your information.
                        </p>
                    </div>
                </div>

                {/* Footer Navigation */}
                <div className="mt-8 flex flex-wrap gap-4 justify-center">
                    <Link
                        to="/terms"
                        className="px-6 py-3 bg-base-100 text-base-content rounded-lg font-['Satoshi'] font-semibold hover:bg-base-200 transition-colors border border-base-300"
                    >
                        Terms of Service
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

export default AppPrivacy;
