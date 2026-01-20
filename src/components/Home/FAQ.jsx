import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "How do I report an infrastructure issue?",
            answer: "Simply create an account, log in, and click on 'Report Issue' in your dashboard. Fill out the form with details about the issue, add photos if possible, and submit. Our team will review and forward it to the relevant authorities."
        },
        {
            question: "Is there a limit to how many issues I can report?",
            answer: "Free users can report up to 3 issues. Premium members enjoy unlimited issue reporting along with priority processing and detailed analytics. Upgrade to premium for just 1000 BDT one-time payment."
        },
        {
            question: "How long does it take to resolve an issue?",
            answer: "Resolution time varies depending on the issue type and severity. Minor issues like streetlight repairs typically take 3-7 days, while major infrastructure work may take several weeks. You'll receive real-time updates on your issue's progress."
        },
        {
            question: "Can I track the status of my reported issues?",
            answer: "Yes! Once you report an issue, you can track its status in real-time from your dashboard. You'll see updates as it moves from 'Pending' to 'In Progress' to 'Resolved'. Premium users also get detailed analytics and notifications."
        },
        {
            question: "What happens if my issue is not resolved?",
            answer: "If you feel your issue hasn't been addressed properly, you can add comments or updates to your report. Our support team monitors all issues and will escalate unresolved cases to the appropriate authorities."
        },
        {
            question: "How does the boost feature work?",
            answer: "The boost feature (100 BDT) increases the visibility of your issue, ensuring it gets priority attention from authorities. Boosted issues are highlighted in the system and typically receive faster response times."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-16 bg-base-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-block mb-4">
                        <span className="px-4 py-2 bg-warning/10 text-warning rounded-full font-['Satoshi'] text-sm font-medium">
                            Help Center
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-base-content font-['Satoshi'] mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-base-content/70 font-['Satoshi'] max-w-2xl mx-auto">
                        Find answers to common questions about reporting issues and using our platform.
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-base-200 rounded-xl border border-base-300 overflow-hidden transition-all duration-300"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-base-300 transition-colors"
                            >
                                <span className="font-['Satoshi'] font-bold text-base-content pr-4">
                                    {faq.question}
                                </span>
                                <span className="text-primary flex-shrink-0">
                                    {openIndex === index ? (
                                        <FiChevronUp size={20} />
                                    ) : (
                                        <FiChevronDown size={20} />
                                    )}
                                </span>
                            </button>

                            {openIndex === index && (
                                <div className="px-6 pb-5 pt-2">
                                    <p className="text-base-content/70 font-['Satoshi'] leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Contact Support */}
                <div className="mt-12 text-center">
                    <p className="text-base-content/70 font-['Satoshi'] mb-4">
                        Still have questions?
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-content rounded-xl font-['Satoshi'] font-bold hover:shadow-lg transition-all"
                    >
                        Contact Support
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
