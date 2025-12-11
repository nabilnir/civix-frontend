import React from 'react';
import { FiSearch, FiLayers, FiTag, FiAlertTriangle } from 'react-icons/fi';

const FilterSidebar = ({ filterState, handleSearchChange, handleFilterChange }) => {
    
    
    const toggleFilter = (type, value) => {
       
        handleFilterChange(type, value);
    };

    return (
        <div className="space-y-6">
            {/* Search */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 font-['Satoshi']">Search Reports</label>
                <div className="relative">
                    <FiSearch className="absolute left-3 top-3 text-gray-400" />
                    <input 
                        type="text" 
                        value={filterState.search} 
                        onChange={handleSearchChange} 
                        placeholder="Search by title..." 
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#238ae9] focus:border-transparent outline-none transition-all" 
                    />
                </div>
            </div>
            
            {/* Category Filter */}
            <div>
                <h4 className="font-bold mb-3 flex items-center gap-2 text-gray-800 font-['Satoshi']">
                    <FiLayers className="text-[#238ae9]"/> Category
                </h4>
                <div className="space-y-2">
                    {["Roads", "Lighting", "Plumbing", "Garbage", "Safety"].map(cat => (
                        <label key={cat} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors">
                            <input 
                                type="checkbox" 
                                checked={filterState.category === cat} 
                                onChange={() => toggleFilter('category', cat)} 
                                className="text-[#238ae9] rounded focus:ring-[#238ae9] cursor-pointer" 
                            />
                            <span className="text-sm text-gray-600 font-medium">{cat}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Status Filter */}
            <div>
                <h4 className="font-bold mb-3 flex items-center gap-2 text-gray-800 font-['Satoshi']">
                    <FiTag className="text-[#238ae9]"/> Status
                </h4>
                <div className="space-y-2">
                    {["Pending", "In-Progress", "Resolved", "Closed"].map(status => (
                        <label key={status} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors">
                            <input 
                                type="checkbox" 
                                checked={filterState.status === status} 
                                onChange={() => toggleFilter('status', status)} 
                                className="text-[#238ae9] rounded focus:ring-[#238ae9] cursor-pointer" 
                            />
                            <span className="text-sm text-gray-600 font-medium">{status}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Priority Filter */}
            <div>
                <h4 className="font-bold mb-3 flex items-center gap-2 text-gray-800 font-['Satoshi']">
                    <FiAlertTriangle className="text-[#238ae9]"/> Priority
                </h4>
                <div className="flex gap-4">
                    {["High", "Medium", "Low"].map(prio => (
                        <label key={prio} className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="radio" 
                                name="priority"
                                checked={filterState.priority === prio} 
                                onChange={() => toggleFilter('priority', prio)} 
                                className="text-[#238ae9] focus:ring-[#238ae9] cursor-pointer" 
                            />
                            <span className="text-sm text-gray-600 font-medium">{prio}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;