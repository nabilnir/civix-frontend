import { FiCalendar, FiUser, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router';

const Blogs = () => {
    const blogs = [
        {
            id: 1,
            title: "How Citizen Reporting is Transforming Urban Infrastructure",
            excerpt: "Discover how everyday citizens are becoming the eyes and ears of city maintenance, leading to faster response times and better resource allocation.",
            author: "Sarah Johnson",
            date: "Jan 15, 2026",
            image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
            category: "Urban Planning",
            readTime: "5 min read"
        },
        {
            id: 2,
            title: "The Power of Community: Success Stories from Our Platform",
            excerpt: "Read inspiring stories of how communities came together to solve local issues, from fixing potholes to restoring public parks.",
            author: "Michael Chen",
            date: "Jan 10, 2026",
            image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80",
            category: "Community",
            readTime: "4 min read"
        },
        {
            id: 3,
            title: "Smart Cities: Integrating Technology with Civic Engagement",
            excerpt: "Explore how modern technology platforms are bridging the gap between citizens and local government for more responsive governance.",
            author: "Emily Rodriguez",
            date: "Jan 5, 2026",
            image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
            category: "Technology",
            readTime: "6 min read"
        }
    ];

    return (
        <section className="py-16 bg-base-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-block mb-4">
                        <span className="px-4 py-2 bg-info/10 text-info rounded-full font-['Satoshi'] text-sm font-medium">
                            Insights & Updates
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-base-content font-['Satoshi'] mb-4">
                        Latest from Our Blog
                    </h2>
                    <p className="text-lg text-base-content/70 font-['Satoshi'] max-w-2xl mx-auto">
                        Stay informed with the latest news, insights, and stories about civic engagement and community development.
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <article
                            key={blog.id}
                            className="bg-base-100 rounded-2xl overflow-hidden border border-base-300 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                        >
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 bg-base-100 text-primary px-3 py-1 rounded-lg text-xs font-['Satoshi'] font-semibold">
                                    {blog.category}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-base-content font-['Satoshi'] mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                    {blog.title}
                                </h3>

                                <p className="text-base-content/70 font-['Satoshi'] text-sm leading-relaxed mb-4 line-clamp-3">
                                    {blog.excerpt}
                                </p>

                                {/* Meta Info */}
                                <div className="flex items-center justify-between pt-4 border-t border-base-200">
                                    <div className="flex items-center gap-4 text-xs text-base-content/60">
                                        <div className="flex items-center gap-1">
                                            <FiUser size={12} />
                                            <span className="font-['Satoshi']">{blog.author}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <FiCalendar size={12} />
                                            <span className="font-['Satoshi']">{blog.date}</span>
                                        </div>
                                    </div>
                                    <span className="text-xs text-base-content/50 font-['Satoshi']">
                                        {blog.readTime}
                                    </span>
                                </div>

                                {/* Read More Link */}
                                <div className="mt-4">
                                    <Link
                                        to="#"
                                        className="inline-flex items-center gap-2 text-primary font-['Satoshi'] text-sm font-semibold group-hover:gap-3 transition-all"
                                    >
                                        Read More
                                        <FiArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <Link
                        to="#"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-content rounded-xl font-['Satoshi'] font-bold hover:shadow-lg transition-all"
                    >
                        View All Articles
                        <FiArrowRight />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Blogs;
