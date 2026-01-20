import { FiBell, FiCalendar, FiTag } from 'react-icons/fi';

const Announcements = () => {
    const announcements = [
        {
            id: 1,
            title: "City Hall Renovation Complete",
            date: "Oct 20, 2025",
            category: "Infrastructure",
            content: "The historic City Hall renovation project has been successfully completed ahead of schedule. The building now features improved accessibility and energy-efficient lighting.",
            tag: "News"
        },
        {
            id: 2,
            title: "New Recycling Program Launch",
            date: "Oct 25, 2025",
            category: "Environment",
            content: "Starting next month, we are introducing a new single-stream recycling program. Blue bins will be distributed to all residential neighborhoods.",
            tag: "Important"
        },
        {
            id: 3,
            title: "Annual Winter Festival",
            date: "Nov 01, 2025",
            category: "Events",
            content: "Join us for the Annual Winter Festival at Central Park! There will be live music, food stalls, and activities for the whole family.",
            tag: "Event"
        }
    ];

    return (
        <div className="pt-24 pb-16 min-h-screen bg-base-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-primary/10 text-primary">
                        <FiBell className="w-6 h-6" />
                    </div>
                    <h1 className="text-4xl font-bold text-base-content font-['Satoshi'] mb-4">
                        Announcements
                    </h1>
                    <p className="text-lg text-base-content/70 font-['Satoshi'] max-w-2xl mx-auto">
                        Stay updated with the latest news, events, and important notifications from your city administration.
                    </p>
                </div>

                {/* Announcements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {announcements.map((item) => (
                        <div key={item.id} className="bg-base-100 rounded-2xl p-6 border border-base-300 hover:shadow-lg transition-all duration-300 group">
                            <div className="flex items-center justify-between mb-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-['Satoshi'] font-medium
                  ${item.tag === 'Important' ? 'bg-error/10 text-error' :
                                        item.tag === 'Event' ? 'bg-secondary/10 text-secondary' :
                                            'bg-primary/10 text-primary'}`}>
                                    {item.tag}
                                </span>
                                <div className="flex items-center gap-2 text-base-content/50 text-sm">
                                    <FiCalendar size={14} />
                                    <span>{item.date}</span>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-base-content font-['Satoshi'] mb-3 group-hover:text-primary transition-colors">
                                {item.title}
                            </h3>

                            <p className="text-base-content/70 font-['Satoshi'] text-sm leading-relaxed mb-4">
                                {item.content}
                            </p>

                            <div className="flex items-center gap-2 text-sm font-medium text-base-content/60 pt-4 border-t border-base-200">
                                <FiTag size={14} />
                                <span>{item.category}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Announcements;
