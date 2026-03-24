import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { FiAward, FiStar, FiShield, FiTrendingUp } from 'react-icons/fi';

const Leaderboard = () => {
    const axiosPublic = useAxiosPublic();

    const { data: topUsers, isLoading, isError } = useQuery({
        queryKey: ['leaderboard'],
        queryFn: async () => {
            const res = await axiosPublic.get('/api/users/leaderboard');
            return res.data.data || [];
        }
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[70vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center text-error mt-10">
                <p>Failed to load the leaderboard. Please try again later.</p>
            </div>
        );
    }

    const renderMedal = (index) => {
        if (index === 0) return <FiAward className="text-yellow-400 fill-yellow-400" size={32} />;
        if (index === 1) return <FiAward className="text-gray-400 fill-gray-300" size={28} />;
        if (index === 2) return <FiAward className="text-amber-600 fill-amber-700" size={24} />;
        return <span className="text-base-content/50 font-bold text-lg w-8 text-center">#{index + 1}</span>;
    };

    // Demo Data for display when DB is empty
    const demoData = [
        { _id: 'd1', name: 'Alex Johnson', photoURL: 'https://i.ibb.co/LtbQfK1/user1.jpg', civicPoints: 450 },
        { _id: 'd2', name: 'Maria Garcia', photoURL: 'https://i.ibb.co/3sX8M8H/user2.jpg', civicPoints: 320 },
        { _id: 'd3', name: 'Sam Taylor', photoURL: 'https://i.ibb.co/7KzB1jV/user3.jpg', civicPoints: 210 },
        { _id: 'd4', name: 'Jamie Doe', photoURL: 'https://i.ibb.co/q5k2XZx/user4.jpg', civicPoints: 150 },
        { _id: 'd5', name: 'Chris Lee', photoURL: 'https://i.ibb.co/8Y2X6qP/user5.jpg', civicPoints: 50 },
    ];

    const displayUsers = topUsers && topUsers.length > 0 ? topUsers : demoData;

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn animate-duration-500">
            {/* Header section */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-2">
                    <FiTrendingUp className="text-primary" size={40} />
                </div>
                <h1 className="text-4xl font-black text-base-content font-['Satoshi'] tracking-tight">
                    Civic <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Leaderboard</span>
                </h1>
                <p className="text-base-content/70 max-w-2xl mx-auto font-['Satoshi'] text-lg">
                    Recognizing our community heroes! Earn civic points by actively reporting infrastructure issues and helping us build a better city together. 
                </p>
                {(!topUsers || topUsers.length === 0) && (
                    <div className="inline-flex items-center gap-2 bg-warning/20 text-warning-content px-4 py-2 rounded-full text-sm font-bold animate-pulse">
                        <FiStar /> Displaying Demo Data
                    </div>
                )}
            </div>

            {/* Leaderboard Cards */}
            <div className="bg-base-100 rounded-3xl shadow-xl overflow-hidden border border-base-200 p-2 md:p-6">
                <div className="space-y-4">
                    {displayUsers.map((user, index) => (
                        <div 
                                key={user._id} 
                                className={`flex items-center p-4 md:p-6 rounded-2xl transition-all duration-300 hover:scale-[1.01] ${
                                    index === 0 ? 'bg-gradient-to-r from-yellow-500/10 to-amber-500/5 border border-yellow-500/20 shadow-sm' : 
                                    index === 1 ? 'bg-gradient-to-r from-slate-400/10 to-gray-400/5 border border-slate-400/20' : 
                                    index === 2 ? 'bg-gradient-to-r from-orange-700/10 to-amber-800/5 border border-amber-700/20' : 
                                    'bg-base-200 hover:bg-base-300 border border-transparent'
                                }`}
                            >
                                {/* Rank */}
                                <div className="flex items-center justify-center w-12 h-12 shrink-0">
                                    {renderMedal(index)}
                                </div>
                                
                                {/* Avatar & Info */}
                                <div className="flex flex-1 items-center gap-4 ml-2 md:ml-6">
                                    <div className="relative">
                                        <img 
                                            src={user.photoURL || 'https://i.ibb.co/2W8Py4W/default-avatar.png'} 
                                            alt={user.name} 
                                            className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 shadow-sm border-base-100"
                                            onError={(e) => { e.target.src = 'https://i.ibb.co/2W8Py4W/default-avatar.png' }}
                                        />
                                        {index < 3 && (
                                            <div className="absolute -top-2 -right-2 bg-base-100 rounded-full p-1 shadow-md">
                                                <FiShield className={index === 0 ? 'text-yellow-500 fill-yellow-500' : index === 1 ? 'text-slate-400 fill-slate-400' : 'text-amber-700 fill-amber-700'} size={14} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex w-full flex-col md:flex-row md:items-center justify-between gap-1 md:gap-4">
                                        <div>
                                            <h3 className={`font-bold font-['Satoshi'] truncate max-w-[150px] md:max-w-xs ${index === 0 ? 'text-xl text-yellow-600 dark:text-yellow-400' : 'text-lg text-base-content'}`}>
                                                {user.name}
                                            </h3>
                                            {index === 0 && <p className="text-xs font-bold text-yellow-600/70 uppercase tracking-widest">Community Hero</p>}
                                        </div>
                                        <div className="flex items-center gap-2 bg-base-100/50 px-4 py-2 rounded-xl backdrop-blur-sm self-start md:self-auto">
                                            <FiStar className="text-primary fill-primary/20" size={18} />
                                            <span className="font-black text-primary font-['Satoshi'] text-lg">
                                                {user.civicPoints.toLocaleString()} <span className="text-xs text-primary/70 font-bold uppercase tracking-wide">pts</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
