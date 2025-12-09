// pages/AllIssues.jsx
import React, { useState } from 'react';
import { Link } from 'react-router';
import { FiMapPin, FiClock, FiTag, FiFilter, FiSearch, FiLayers, FiAlertTriangle, FiChevronLeft, FiChevronRight, FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import AOS from 'aos';
import 'aos/dist/aos.css';


const categories = ["Roads", "Lighting", "Plumbing", "Garbage", "Footpaths", "Safety"];
const statuses = ["Pending", "In-Progress", "Resolved", "Closed"];
const priorities = ["High", "Medium", "Low"];

const mockIssues = [
   
    { id: 1, title: "Large Pothole on Main Street", category: "Roads", status: "In-Progress", priority: "High", location: "Central Avenue, Sector 3", date: "2 hours ago", image: "https://via.placeholder.com/300x200?text=Road+Pothole", color: 'text-amber-600', bg: 'bg-amber-100' },
    { id: 2, title: "Streetlight Out Near School", category: "Lighting", status: "Pending", priority: "Medium", location: "School District 5, Block B", date: "5 hours ago", image: "https://via.placeholder.com/300x200?text=Broken+Light", color: 'text-gray-600', bg: 'bg-gray-100' },
    { id: 3, title: "Water Main Leakage", category: "Plumbing", status: "Resolved", priority: "Low", location: "Residential Area, Suburb C", date: "1 day ago", image: "https://via.placeholder.com/300x200?text=Water+Leak", color: 'text-green-600', bg: 'bg-green-100' },
    { id: 4, title: "Overflowing Garbage Bins", category: "Garbage", status: "Pending", priority: "High", location: "Market Square, Downtown", date: "1 hour ago", image: "https://via.placeholder.com/300x200?text=Trash+Overflow", color: 'text-gray-600', bg: 'bg-gray-100' },
    { id: 5, title: "Damaged Sidewalk", category: "Footpaths", status: "In-Progress", priority: "Medium", location: "Parkside Path", date: "3 days ago", image: "https://via.placeholder.com/300x200?text=Damaged+Path", color: 'text-amber-600', bg: 'bg-amber-100' },
    { id: 6, title: "Vandalism at Bus Stop", category: "Safety", status: "Pending", priority: "Medium", location: "Bus Terminal 2", date: "8 hours ago", image: "https://via.placeholder.com/300x200?text=Vandalism", color: 'text-gray-600', bg: 'bg-gray-100' },
    { id: 7, title: "Missing Manhole Cover", category: "Roads", status: "High", priority: "High", location: "Industrial Zone A", date: "2 days ago", image: "https://via.placeholder.com/300x200?text=Manhole+Cover", color: 'text-amber-600', bg: 'bg-amber-100' },
    { id: 8, title: "Fallen Tree Branch", category: "Safety", status: "Resolved", priority: "Low", location: "Forest Grove Community", date: "4 days ago", image: "https://via.placeholder.com/300x200?text=Fallen+Branch", color: 'text-green-600', bg: 'bg-green-100' },
    { id: 9, title: "Signal Light Malfunction", category: "Lighting", status: "Pending", priority: "High", location: "Intersection of Kazi & Jinnah", date: "10 mins ago", image: "https://via.placeholder.com/300x200?text=Traffic+Light", color: 'text-gray-600', bg: 'bg-gray-100' },
    { id: 10, title: "Graffiti on Community Wall", category: "Safety", status: "Resolved", priority: "Low", location: "Public Park Gate 4", date: "2 days ago", image: "https://via.placeholder.com/300x200?text=Graffiti+Removal", color: 'text-green-600', bg: 'bg-green-100' },
    { id: 11, title: "Water Meter Vandalism", category: "Plumbing", status: "In-Progress", priority: "Medium", location: "Behind Sector 7 Market", date: "1 day ago", image: "https://via.placeholder.com/300x200?text=Meter+Damage", color: 'text-amber-600', bg: 'bg-amber-100' },
    { id: 12, title: "Excess Construction Debris", category: "Garbage", status: "Pending", priority: "Medium", location: "New Housing Development", date: "7 hours ago", image: "https://via.placeholder.com/300x200?text=Construction+Waste", color: 'text-gray-600', bg: 'bg-gray-100' },
    { id: 13, title: "Uneven Paver Stones", category: "Footpaths", status: "In-Progress", priority: "Low", location: "Near City Library", date: "4 hours ago", image: "https://via.placeholder.com/300x200?text=Uneven+Ground", color: 'text-amber-600', bg: 'bg-amber-100' },
    { id: 14, title: "Missing Street Sign", category: "Roads", status: "Resolved", priority: "High", location: "Exit 5 Toll Plaza", date: "5 days ago", image: "https://via.placeholder.com/300x200?text=Missing+Sign", color: 'text-green-600', bg: 'bg-green-100' },
    { id: 15, title: "Noise Complaint: Factory", category: "Safety", status: "Closed", priority: "Low", location: "Industrial Block 22", date: "1 month ago", image: "https://via.placeholder.com/300x200?text=Noise+Report", color: 'text-green-600', bg: 'bg-green-100' },
    { id: 16, title: "Drainage Blockage", category: "Plumbing", status: "Pending", priority: "High", location: "Under Bridge 3", date: "3 hours ago", image: "https://via.placeholder.com/300x200?text=Blocked+Drain", color: 'text-gray-600', bg: 'bg-gray-100' },
    { id: 17, title: "Dead Tree Hazard", category: "Safety", status: "In-Progress", priority: "High", location: "Residential Road 15", date: "1 day ago", image: "https://via.placeholder.com/300x200?text=Tree+Hazard", color: 'text-amber-600', bg: 'bg-amber-100' },
    { id: 18, title: "Recycling Bin Damage", category: "Garbage", status: "Resolved", priority: "Medium", location: "Apartment Complex 8", date: "9 days ago", image: "https://via.placeholder.com/300x200?text=Bin+Damage", color: 'text-green-600', bg: 'bg-green-100' },
    { id: 19, title: "Dim Streetlight", category: "Lighting", status: "Pending", priority: "Medium", location: "Alleyway behind Hospital", date: "1 hour ago", image: "https://via.placeholder.com/300x200?text=Dim+Light", color: 'text-gray-600', bg: 'bg-gray-100' },
    { id: 20, title: "Cracked Bridge Support", category: "Roads", status: "In-Progress", priority: "High", location: "Bridge over River", date: "6 hours ago", image: "https://via.placeholder.com/300x200?text=Bridge+Crack", color: 'text-amber-600', bg: 'bg-amber-100' },
    { id: 21, title: "Faded Crosswalk", category: "Footpaths", status: "Pending", priority: "Low", location: "School Zone Entrance", date: "1 week ago", image: "https://via.placeholder.com/300x200?text=Faded+Crosswalk", color: 'text-gray-600', bg: 'bg-gray-100' },
    { id: 22, title: "Sewer Smell/Fumes", category: "Plumbing", status: "Closed", priority: "Medium", location: "Commercial Street 1", date: "2 weeks ago", image: "https://via.placeholder.com/300x200?text=Sewer+Issue", color: 'text-green-600', bg: 'bg-green-100' },
    { id: 23, title: "Illegal Dumping", category: "Garbage", status: "In-Progress", priority: "High", location: "Service Road 4", date: "12 hours ago", image: "https://via.placeholder.com/300x200?text=Illegal+Dumping", color: 'text-amber-600', bg: 'bg-amber-100' },
    { id: 24, title: "Playground Equipment Broken", category: "Safety", status: "Pending", priority: "High", location: "East City Playground", date: "1 day ago", image: "https://via.placeholder.com/300x200?text=Broken+Swing", color: 'text-gray-600', bg: 'bg-gray-100' },
    { id: 25, title: "Fire Hydrant Leak", category: "Plumbing", status: "Pending", priority: "High", location: "Outside Fire Station", date: "30 mins ago", image: "https://via.placeholder.com/300x200?text=Hydrant+Leak", color: 'text-gray-600', bg: 'bg-gray-100' },
    { id: 26, title: "Sidewalk Encroachment", category: "Footpaths", status: "Resolved", priority: "Low", location: "Café Row", date: "1 week ago", image: "https://via.placeholder.com/300x200?text=Sidewalk+Blocked", color: 'text-green-600', bg: 'bg-green-100' },
    { id: 27, title: "Permanent Street Closure", category: "Roads", status: "Closed", priority: "High", location: "Old Town District", date: "3 months ago", image: "https://via.placeholder.com/300x200?text=Street+Closed", color: 'text-green-600', bg: 'bg-green-100' },
    { id: 28, title: "Solar Panel Malfunction", category: "Lighting", status: "In-Progress", priority: "Medium", location: "City Hall Roof", date: "10 days ago", image: "https://via.placeholder.com/300x200?text=Solar+Panel", color: 'text-amber-600', bg: 'bg-amber-100' },

];

// --- Sub-Components ---

// Component for a single issue card
const IssueCard = ({ issue, index }) => {
    return (
        <div 
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group border border-gray-100"
            data-aos="fade-up"
            data-aos-delay={index * 50} 
        >
            {/* Issue Image */}
            <div className="h-40 overflow-hidden">
                <img 
                    src={issue.image} 
                    alt={issue.title} 
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
            </div>
            
            <div className="p-5">
                {/* Status & Priority Tags */}
                <div className="flex justify-between items-center mb-3">
                    <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${issue.bg} ${issue.color}`}>
                        {issue.status}
                    </span>
                    <span className={`inline-flex items-center text-xs font-medium ${issue.priority === 'High' ? 'text-red-500' : 'text-gray-500'}`}>
                        <FiAlertTriangle className="mr-1 w-3 h-3" />
                        {issue.priority}
                    </span>
                </div>

                <h3 className="font-['Satoshi'] text-lg font-bold text-[#242424] mb-2 line-clamp-2 hover:text-[#238ae9] transition-colors">
                    <Link to={`/issue/${issue.id}`}>{issue.title}</Link>
                </h3>
                
                {/* Location & Time */}
                <div className="space-y-1 text-sm text-gray-600">
                    <p className="flex items-center">
                        <FiMapPin className="mr-2 w-4 h-4 text-[#238ae9]" />
                        {issue.location}
                    </p>
                    <p className="flex items-center">
                        <FiClock className="mr-2 w-4 h-4 text-[#238ae9]" />
                        Reported {issue.date}
                    </p>
                </div>
                
                {/* View Details Link */}
                <Link 
                    to={`/issue/${issue.id}`}
                    className="mt-4 inline-flex items-center font-['Satoshi'] text-[#238ae9] font-semibold text-sm hover:text-[#1e7acc] transition-colors"
                >
                    View Report <FiArrowUpRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
};

// Component for the left-hand filter sidebar
const FilterSidebar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    // In a real app, you would manage filter state here

    return (
        <aside className="p-6 bg-white rounded-xl shadow-lg sticky top-20 border border-gray-100" data-aos="fade-right" data-aos-duration="800">
            <h3 className="font-['Satoshi'] text-xl font-bold text-[#242424] mb-5 flex items-center gap-2 border-b pb-3">
                <FiFilter className="text-[#238ae9]" />
                Filter Issues
            </h3>

            {/* 1. Search Bar */}
            <div className="mb-6">
                <label htmlFor="search" className="block font-['Satoshi'] text-sm font-medium text-gray-700 mb-2">
                    Search Report
                </label>
                <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        id="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by name, location..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#238ae9] focus:border-[#238ae9] text-sm"
                    />
                </div>
            </div>

            {/* 2. Status Filter */}
            <div className="mb-6">
                <h4 className="font-['Satoshi'] text-base font-semibold text-[#242424] mb-3 flex items-center gap-1">
                    <FiLayers className="text-gray-500 w-4 h-4" />
                    Status
                </h4>
                <div className="space-y-2">
                    {statuses.map(status => (
                        <div key={status} className="flex items-center">
                            <input
                                id={`status-${status}`}
                                name="status"
                                type="checkbox"
                                className="h-4 w-4 text-[#238ae9] border-gray-300 rounded focus:ring-[#238ae9]"
                            />
                            <label htmlFor={`status-${status}`} className="ml-3 font-['Satoshi'] text-sm text-gray-600">
                                {status}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. Category Filter */}
            <div className="mb-6">
                <h4 className="font-['Satoshi'] text-base font-semibold text-[#242424] mb-3 flex items-center gap-1">
                    <FiTag className="text-gray-500 w-4 h-4" />
                    Category
                </h4>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                    {categories.map(category => (
                        <div key={category} className="flex items-center">
                            <input
                                id={`category-${category}`}
                                name="category"
                                type="checkbox"
                                className="h-4 w-4 text-[#238ae9] border-gray-300 rounded focus:ring-[#238ae9]"
                            />
                            <label htmlFor={`category-${category}`} className="ml-3 font-['Satoshi'] text-sm text-gray-600">
                                {category}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* 4. Priority Filter (Example of a radio group) */}
            <div className="mb-0">
                <h4 className="font-['Satoshi'] text-base font-semibold text-[#242424] mb-3 flex items-center gap-1">
                    <FiAlertTriangle className="text-gray-500 w-4 h-4" />
                    Priority
                </h4>
                <div className="flex gap-4">
                    {priorities.map(priority => (
                        <div key={priority} className="flex items-center">
                            <input
                                id={`priority-${priority}`}
                                name="priority"
                                type="radio"
                                className="h-4 w-4 text-[#238ae9] border-gray-300 focus:ring-[#238ae9]"
                            />
                            <label htmlFor={`priority-${priority}`} className="ml-2 font-['Satoshi'] text-sm text-gray-600">
                                {priority}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Apply Filters Button */}
            <button className="mt-6 w-full bg-[#238ae9] text-white py-2 rounded-lg font-['Satoshi'] font-medium hover:bg-[#1e7acc] transition-colors">
                Apply Filters
            </button>
        </aside>
    );
};

// Component for pagination controls
const Pagination = ({ currentPage = 1, totalPages = 5, onPageChange }) => {
    // Mock page numbers for UI demonstration
    const pages = [1, 2, 3, 4, 5];

    return (
        <div className="flex justify-center items-center space-x-2 mt-12" data-aos="fade-up" data-aos-duration="600">
            {/* Previous Button */}
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className={`p-3 rounded-xl transition-colors ${currentPage === 1 ? 'text-gray-400 bg-gray-100' : 'text-[#238ae9] hover:bg-gray-100'}`}
                aria-label="Previous Page"
            >
                <FiChevronLeft className="w-5 h-5" />
            </button>

            {/* Page Numbers */}
            <div className="flex space-x-1">
                {pages.map(page => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-4 py-2 rounded-xl font-['Satoshi'] font-semibold transition-all ${
                            page === currentPage 
                                ? 'bg-[#238ae9] text-white shadow-md' 
                                : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        aria-current={page === currentPage ? 'page' : undefined}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {/* Next Button */}
            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className={`p-3 rounded-xl transition-colors ${currentPage === totalPages ? 'text-gray-400 bg-gray-100' : 'text-[#238ae9] hover:bg-gray-100'}`}
                aria-label="Next Page"
            >
                <FiChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
};


// --- Main Component ---
const AllIssues = () => {
   
    const [currentPage, setCurrentPage] = useState(1);
    
    // Mock calculation for issues to display
    const issuesPerPage = 6;
    const startIndex = (currentPage - 1) * issuesPerPage;
    const endIndex = startIndex + issuesPerPage;
    const issuesToDisplay = mockIssues.slice(startIndex, endIndex);

    return (
        <section className="bg-[#f4f6f8] py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1 bg-white text-[#238ae9] rounded-full font-['Satoshi'] text-sm font-medium mb-3"
                    data-aos="fade-up" data-aos-duration="600">
                        Public Report Hub
                    </span>
                    <h1 
                        className="font-['Satoshi'] text-4xl md:text-5xl font-bold text-[#242424] mb-4 leading-tight"
                        data-aos="fade-up" data-aos-duration="600" data-aos-delay="200"
                    >
                        All Citizen Reports
                    </h1>
                    <p 
                        className="font-['Satoshi'] text-lg text-gray-600 max-w-3xl mx-auto"
                        data-aos="fade-up" data-aos-duration="600" data-aos-delay="400"
                    >
                        Explore the full list of reported infrastructure issues across the city. Use the filters to track progress on items that matter to you.
                    </p>
                </div>

                {/* Main Content Grid: Sidebar + Issues */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                    
                    {/* Filter Sidebar (Left) - Hidden on small screens */}
                    <div className="hidden lg:block lg:col-span-1">
                        <FilterSidebar />
                    </div>
                    
                    {/* Issues Grid (Right) */}
                    <div className="lg:col-span-3">
                        {/* Issue Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                            {issuesToDisplay.map((issue, index) => (
                                <IssueCard key={issue.id} issue={issue} index={index} />
                            ))}
                            {/* Filler for demonstration if less than issuesPerPage are mocked */}
                            {issuesToDisplay.length < issuesPerPage && Array.from({ length: issuesPerPage - issuesToDisplay.length }).map((_, i) => (
                                <div key={`placeholder-${i}`} className="p-8 bg-white/50 rounded-xl border border-dashed border-gray-300 hidden xl:block">
                                    <p className="text-center text-gray-500 text-sm">More issues coming soon...</p>
                                </div>
                            ))}
                        </div>
                        
                        {/* Pagination */}
                        <Pagination 
                            currentPage={currentPage}
                            totalPages={Math.ceil(mockIssues.length / issuesPerPage)}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                    
                    {/* Mobile Filter Button */}
                    <div className="lg:hidden text-center">
                        <button className="w-full py-3 bg-white border border-gray-300 rounded-xl font-['Satoshi'] font-semibold text-[#238ae9] flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                            <FiFilter className="w-5 h-5" />
                            Show Filters (Mobile)
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AllIssues;