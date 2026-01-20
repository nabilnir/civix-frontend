import { FiTool, FiDroplet, FiZap, FiTrash2, FiAlertCircle, FiHome } from 'react-icons/fi';

const Categories = () => {
    const categories = [
        {
            id: 1,
            name: "Roads & Infrastructure",
            icon: <FiTool />,
            description: "Potholes, damaged roads, and street maintenance",
            color: "primary"
        },
        {
            id: 2,
            name: "Water & Sanitation",
            icon: <FiDroplet />,
            description: "Water supply issues, drainage, and sewage problems",
            color: "info"
        },
        {
            id: 3,
            name: "Electricity",
            icon: <FiZap />,
            description: "Power outages, streetlights, and electrical faults",
            color: "warning"
        },
        {
            id: 4,
            name: "Waste Management",
            icon: <FiTrash2 />,
            description: "Garbage collection, littering, and recycling",
            color: "success"
        },
        {
            id: 5,
            name: "Public Safety",
            icon: <FiAlertCircle />,
            description: "Safety hazards, broken equipment, and security concerns",
            color: "error"
        },
        {
            id: 6,
            name: "Public Facilities",
            icon: <FiHome />,
            description: "Parks, community centers, and public buildings",
            color: "secondary"
        }
    ];

    const getColorClasses = (color) => {
        const colorMap = {
            primary: 'bg-primary/10 text-primary hover:bg-primary/20',
            info: 'bg-info/10 text-info hover:bg-info/20',
            warning: 'bg-warning/10 text-warning hover:bg-warning/20',
            success: 'bg-success/10 text-success hover:bg-success/20',
            error: 'bg-error/10 text-error hover:bg-error/20',
            secondary: 'bg-secondary/10 text-secondary hover:bg-secondary/20'
        };
        return colorMap[color] || colorMap.primary;
    };

    return (
        <section className="py-16 bg-base-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-block mb-4">
                        <span className="px-4 py-2 bg-primary/10 text-primary rounded-full font-['Satoshi'] text-sm font-medium">
                            Our Services
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-base-content font-['Satoshi'] mb-4">
                        Our Service Categories
                    </h2>
                    <p className="text-lg text-base-content/70 font-['Satoshi'] max-w-2xl mx-auto">
                        We work across multiple fields to ensure your city runs smoothly. Report issues in any of these categories.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="bg-base-100 rounded-2xl p-6 border border-base-300 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                        >
                            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 transition-all duration-300 ${getColorClasses(category.color)}`}>
                                <span className="text-2xl">{category.icon}</span>
                            </div>

                            <h3 className="text-xl font-bold text-base-content font-['Satoshi'] mb-2 group-hover:text-primary transition-colors">
                                {category.name}
                            </h3>

                            <p className="text-base-content/70 font-['Satoshi'] text-sm leading-relaxed">
                                {category.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
