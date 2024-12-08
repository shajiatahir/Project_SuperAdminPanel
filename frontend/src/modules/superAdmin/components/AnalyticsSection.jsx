import React from 'react';
import {
    LineChart, Line, AreaChart, Area,
    BarChart, Bar, XAxis, YAxis,
    CartesianGrid, Tooltip, Legend,
    ResponsiveContainer, PieChart, Pie,
    Cell
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AnalyticsSection = ({ initialData }) => {
    return (
        <div className="space-y-8">
            {/* User Engagement Chart */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">User Engagement</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={initialData.userEngagement}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                        <XAxis dataKey="name" stroke="#fff" />
                        <YAxis stroke="#fff" />
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: '#1f2937', 
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '0.5rem'
                            }}
                            labelStyle={{ color: '#fff' }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="students" stroke="#8884d8" name="Students" />
                        <Line type="monotone" dataKey="instructors" stroke="#82ca9d" name="Instructors" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Course Progress Chart */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Course Progress Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={initialData.courseProgress}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                        <XAxis dataKey="name" stroke="#fff" />
                        <YAxis stroke="#fff" />
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: '#1f2937', 
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '0.5rem'
                            }}
                            labelStyle={{ color: '#fff' }}
                        />
                        <Legend />
                        <Bar dataKey="completed" stackId="a" fill="#4CAF50" name="Completed" />
                        <Bar dataKey="inProgress" stackId="a" fill="#FFC107" name="In Progress" />
                        <Bar dataKey="notStarted" stackId="a" fill="#F44336" name="Not Started" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Login Activity Chart */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Login Activity (24h)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={initialData.loginActivity}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                        <XAxis dataKey="time" stroke="#fff" />
                        <YAxis stroke="#fff" />
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: '#1f2937', 
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '0.5rem'
                            }}
                            labelStyle={{ color: '#fff' }}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="logins" 
                            stroke="#8884d8" 
                            fill="#8884d8" 
                            fillOpacity={0.3}
                            name="Logins"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Content Distribution Chart */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Content Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={initialData.contentDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {initialData.contentDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: '#1f2937', 
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '0.5rem'
                            }}
                            labelStyle={{ color: '#fff' }}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AnalyticsSection; 