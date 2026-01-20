import React from 'react';
import { Link } from 'react-router';

import { FiUsers, FiClock, FiAlertCircle, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const CommunityGuidelines = () => {
    return (
        <div className="min-h-screen bg-base-200 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="bg-base-100 rounded-xl p-8 shadow-sm border border-base-300 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <FiUsers className="text-4xl text-primary" />
                        <div>
                            <h1 className="text-4xl font-bold text-base-content font-['Satoshi']">
                                Community Guidelines
                            </h1>
                            <div className="flex items-center gap-2 text-base-content/70 font-['Satoshi'] mt-2">
                                <FiClock />
                                <span>Last updated: January 20, 2026</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-base-content/70 font-['Satoshi']">
                        Civix is built on trust, respect, and collaboration. These guidelines help maintain a positive and productive community for everyone.
                    </p>
                </div>

                {/* Content */}
                <div className="bg-base-100 rounded-xl p-8 shadow-sm border border-base-300 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-4">
                            Our Core Values
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                                <FiCheckCircle className="text-2xl text-primary mb-2" />
                                <h3 className="font-bold text-base-content font-['Satoshi'] mb-1">Respect</h3>
                                <p className="text-sm text-base-content/70 font-['Satoshi']">Treat all community members with dignity and courtesy</p>
                            </div>
                            <div className="bg-success/10 rounded-lg p-4 border border-success/20">
                                <FiCheckCircle className="text-2xl text-success mb-2" />
                                <h3 className="font-bold text-base-content font-['Satoshi'] mb-1">Honesty</h3>
                                <p className="text-sm text-base-content/70 font-['Satoshi']">Report issues truthfully and accurately</p>
                            </div>
                            <div className="bg-info/10 rounded-lg p-4 border border-info/20">
                                <FiCheckCircle className="text-2xl text-info mb-2" />
                                <h3 className="font-bold text-base-content font-['Satoshi'] mb-1">Collaboration</h3>
                                <p className="text-sm text-base-content/70 font-['Satoshi']">Work together to improve our communities</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-4 flex items-center gap-2">
                            <FiCheckCircle className="text-success" />
                            What We Encourage
                        </h2>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <FiCheckCircle className="text-success mt-1 flex-shrink-0" />
                                <div>
                                    <strong className="text-base-content font-['Satoshi']">Accurate Reporting:</strong>
                                    <p className="text-base-content/70 font-['Satoshi']">Provide clear, detailed descriptions of infrastructure issues with photos and precise locations</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <FiCheckCircle className="text-success mt-1 flex-shrink-0" />
                                <div>
                                    <strong className="text-base-content font-['Satoshi']">Constructive Engagement:</strong>
                                    <p className="text-base-content/70 font-['Satoshi']">Upvote legitimate issues and provide helpful updates or comments</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <FiCheckCircle className="text-success mt-1 flex-shrink-0" />
                                <div>
                                    <strong className="text-base-content font-['Satoshi']">Respectful Communication:</strong>
                                    <p className="text-base-content/70 font-['Satoshi']">Engage with others politely, even when you disagree</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <FiCheckCircle className="text-success mt-1 flex-shrink-0" />
                                <div>
                                    <strong className="text-base-content font-['Satoshi']">Privacy Awareness:</strong>
                                    <p className="text-base-content/70 font-['Satoshi']">Respect others' privacy and avoid sharing personal information without consent</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <FiCheckCircle className="text-success mt-1 flex-shrink-0" />
                                <div>
                                    <strong className="text-base-content font-['Satoshi']">Community Support:</strong>
                                    <p className="text-base-content/70 font-['Satoshi']">Help new users understand how to use the platform effectively</p>
                                </div>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-4 flex items-center gap-2">
                            <FiXCircle className="text-error" />
                            What We Prohibit
                        </h2>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <FiXCircle className="text-error mt-1 flex-shrink-0" />
                                <div>
                                    <strong className="text-base-content font-['Satoshi']">False Reports:</strong>
                                    <p className="text-base-content/70 font-['Satoshi']">Submitting fake, misleading, or exaggerated issue reports</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <FiXCircle className="text-error mt-1 flex-shrink-0" />
                                <div>
                                    <strong className="text-base-content font-['Satoshi']">Harassment:</strong>
                                    <p className="text-base-content/70 font-['Satoshi']">Bullying, threatening, or harassing other users, staff, or authorities</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <FiXCircle className="text-error mt-1 flex-shrink-0" />
                                <div>
                                    <strong className="text-base-content font-['Satoshi']">Hate Speech:</strong>
                                    <p className="text-base-content/70 font-['Satoshi']">Content that promotes discrimination, violence, or hatred based on race, religion, gender, or other protected characteristics</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <FiXCircle className="text-error mt-1 flex-shrink-0" />
                                <div>
                                    <strong className="text-base-content font-['Satoshi']">Spam:</strong>
                                    <p className="text-base-content/70 font-['Satoshi']">Posting repetitive, irrelevant, or promotional content</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <FiXCircle className="text-error mt-1 flex-shrink-0" />
                                <div>
                                    <strong className="text-base-content font-['Satoshi']">Impersonation:</strong>
                                    <p className="text-base-content/70 font-['Satoshi']">Pretending to be someone else or creating fake accounts</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <FiXCircle className="text-error mt-1 flex-shrink-0" />
                                <div>
                                    <strong className="text-base-content font-['Satoshi']">Illegal Content:</strong>
                                    <p className="text-base-content/70 font-['Satoshi']">Sharing content that violates local or national laws</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <FiXCircle className="text-error mt-1 flex-shrink-0" />
                                <div>
                                    <strong className="text-base-content font-['Satoshi']">System Abuse:</strong>
                                    <p className="text-base-content/70 font-['Satoshi']">Attempting to manipulate voting, exploit bugs, or gain unauthorized access</p>
                                </div>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-4 flex items-center gap-2">
                            <FiAlertCircle className="text-warning" />
                            Reporting Violations
                        </h2>
                        <p className="text-base-content/70 font-['Satoshi'] mb-4">
                            If you encounter content or behavior that violates these guidelines, please report it immediately. We take all reports seriously and investigate them promptly.
                        </p>
                        <div className="bg-warning/10 rounded-lg p-4 border border-warning/20">
                            <h3 className="font-bold text-base-content font-['Satoshi'] mb-2">How to Report:</h3>
                            <ul className="list-disc list-inside text-base-content/70 font-['Satoshi'] space-y-1 ml-4">
                                <li>Use the "Report" button on any issue or comment</li>
                                <li>Email support@civix.com with details</li>
                                <li>Contact us through the Help Center</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-4">
                            Consequences for Violations
                        </h2>
                        <p className="text-base-content/70 font-['Satoshi'] mb-4">
                            Violations of these guidelines may result in:
                        </p>
                        <div className="space-y-3">
                            <div className="bg-base-200 rounded-lg p-4">
                                <h3 className="font-bold text-base-content font-['Satoshi'] mb-1">Warning</h3>
                                <p className="text-base-content/70 font-['Satoshi'] text-sm">First-time minor violations may receive a warning</p>
                            </div>
                            <div className="bg-base-200 rounded-lg p-4">
                                <h3 className="font-bold text-base-content font-['Satoshi'] mb-1">Content Removal</h3>
                                <p className="text-base-content/70 font-['Satoshi'] text-sm">Violating content will be removed from the platform</p>
                            </div>
                            <div className="bg-base-200 rounded-lg p-4">
                                <h3 className="font-bold text-base-content font-['Satoshi'] mb-1">Account Suspension</h3>
                                <p className="text-base-content/70 font-['Satoshi'] text-sm">Temporary restriction from using certain features</p>
                            </div>
                            <div className="bg-error/10 rounded-lg p-4 border border-error/20">
                                <h3 className="font-bold text-error font-['Satoshi'] mb-1">Permanent Ban</h3>
                                <p className="text-base-content/70 font-['Satoshi'] text-sm">Severe or repeated violations may result in permanent account termination</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-4">
                            Appeals Process
                        </h2>
                        <p className="text-base-content/70 font-['Satoshi'] mb-4">
                            If you believe your account was suspended or content was removed in error, you may appeal the decision by contacting support@civix.com with:
                        </p>
                        <ul className="list-disc list-inside text-base-content/70 font-['Satoshi'] space-y-2 ml-4">
                            <li>Your account email address</li>
                            <li>Details of the action taken</li>
                            <li>Explanation of why you believe it was an error</li>
                        </ul>
                        <p className="text-base-content/70 font-['Satoshi'] mt-4">
                            We will review appeals within 5-7 business days.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-4">
                            Updates to Guidelines
                        </h2>
                        <p className="text-base-content/70 font-['Satoshi']">
                            We may update these guidelines as our community grows and evolves. Significant changes will be communicated via email and platform notifications. Continued use of Civix after updates constitutes acceptance of the revised guidelines.
                        </p>
                    </section>

                    {/* Call to Action */}
                    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-6 border border-primary/20 text-center">
                        <FiUsers className="text-4xl text-primary mx-auto mb-3" />
                        <h3 className="text-xl font-bold text-base-content font-['Satoshi'] mb-2">
                            Build a Better Community Together
                        </h3>
                        <p className="text-base-content/70 font-['Satoshi'] mb-4">
                            By following these guidelines, you help create a safe, respectful, and productive environment for everyone.
                        </p>
                        <Link
                            to="/help"
                            className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-['Satoshi'] font-semibold hover:bg-primary/80 transition-colors"
                        >
                            Visit Help Center
                        </Link>
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
                        to="/privacy"
                        className="px-6 py-3 bg-base-100 text-base-content rounded-lg font-['Satoshi'] font-semibold hover:bg-base-200 transition-colors border border-base-300"
                    >
                        Privacy Policy
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

export default CommunityGuidelines;
