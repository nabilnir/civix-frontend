import { FiCheckCircle, FiMapPin, FiCalendar } from 'react-icons/fi';

const Highlights = () => {
    const highlights = [
        {
            id: 1,
            title: "Main Street Pothole Repair",
            location: "Downtown District",
            date: "Completed Dec 2024",
            image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
            description: "Successfully repaired 15 major potholes on Main Street, improving traffic flow and safety for over 10,000 daily commuters.",
            impact: "10,000+ Citizens Benefited"
        },
        {
            id: 2,
            title: "Park Lighting Installation",
            location: "Central Park",
            date: "Completed Nov 2024",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
            description: "Installed 50 new LED streetlights in Central Park, enhancing safety for evening visitors and reducing energy consumption by 40%.",
            impact: "40% Energy Savings"
        },
        {
            id: 3,
            title: "Water Pipeline Restoration",
            location: "Riverside Community",
            date: "Completed Oct 2024",
            image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
            description: "Replaced aging water pipelines serving 500+ households, eliminating water contamination issues and improving water pressure.",
            impact: "500+ Homes Served"
        }
    ];

    return (
        <section className="py-16 bg-base-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-block mb-4">
                        <span className="px-4 py-2 bg-success/10 text-success rounded-full font-['Satoshi'] text-sm font-medium">
                            Success Stories
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-base-content font-['Satoshi'] mb-4">
                        Highlights of Our Impact
                    </h2>
                    <p className="text-lg text-base-content/70 font-['Satoshi'] max-w-2xl mx-auto">
                        See how citizen reports have transformed our community. Real issues, real solutions, real impact.
                    </p>
                </div>

                {/* Highlights Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {highlights.map((highlight) => (
                        <div
                            key={highlight.id}
                            className="bg-base-100 rounded-2xl overflow-hidden border border-base-300 hover:shadow-xl transition-all duration-300 group"
                        >
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={highlight.image}
                                    alt={highlight.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-success text-white px-3 py-1 rounded-full flex items-center gap-1 text-xs font-['Satoshi'] font-medium">
                                    <FiCheckCircle size={14} />
                                    <span>Resolved</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-base-content font-['Satoshi'] mb-3 group-hover:text-primary transition-colors">
                                    {highlight.title}
                                </h3>

                                <p className="text-base-content/70 font-['Satoshi'] text-sm leading-relaxed mb-4">
                                    {highlight.description}
                                </p>

                                {/* Meta Info */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-base-content/60">
                                        <FiMapPin size={14} className="text-primary" />
                                        <span className="font-['Satoshi']">{highlight.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-base-content/60">
                                        <FiCalendar size={14} className="text-primary" />
                                        <span className="font-['Satoshi']">{highlight.date}</span>
                                    </div>
                                </div>

                                {/* Impact Badge */}
                                <div className="pt-4 border-t border-base-200">
                                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-lg text-xs font-['Satoshi'] font-semibold">
                                        {highlight.impact}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Highlights;
