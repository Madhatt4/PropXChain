import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Clock, Home, TrendingUp, Users, Activity, FileText, CheckCircle, Circle, AlertCircle } from 'lucide-react';

const PropChainDeveloperDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sample data
  const propertyData = [
    { name: 'Woodland Heights', units: 24, active: 14, pending: 6, completed: 4 },
    { name: 'Meadow View', units: 18, active: 8, pending: 7, completed: 3 },
    { name: 'Riverside Gardens', units: 32, active: 20, pending: 10, completed: 2 },
    { name: 'Harbor Point', units: 16, active: 5, pending: 3, completed: 8 },
  ];

  const transactionTimeData = [
    { name: 'Jan', traditional: 14, propchain: 3.5 },
    { name: 'Feb', traditional: 16, propchain: 3.2 },
    { name: 'Mar', traditional: 15, propchain: 3.0 },
    { name: 'Apr', traditional: 14, propchain: 3.4 },
    { name: 'May', traditional: 15, propchain: 3.2 },
    { name: 'Jun', traditional: 13, propchain: 3.1 },
  ];

  const transactionStatusData = [
    { name: 'Document Collection', value: 20 },
    { name: 'Verification', value: 35 },
    { name: 'Contract Generation', value: 15 },
    { name: 'Signing', value: 25 },
    { name: 'Settlement', value: 5 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#60a5fa', '#34d399', '#6366f1'];

  const recentTransactions = [
    { id: 'TX-4582', property: 'Woodland Heights - Unit 42B', status: 'active', stage: 'Blockchain Verification', progress: 65, updated: '2 hours ago' },
    { id: 'TX-4581', property: 'Meadow View - Unit 15A', status: 'active', stage: 'Contract Review', progress: 45, updated: '5 hours ago' },
    { id: 'TX-4578', property: 'Woodland Heights - Unit 40A', status: 'pending', stage: 'Document Collection', progress: 25, updated: '1 day ago' },
    { id: 'TX-4575', property: 'Harbor Point - Unit 8C', status: 'completed', stage: 'Completed', progress: 100, updated: '2 days ago' },
    { id: 'TX-4572', property: 'Woodland Heights - Unit 39B', status: 'completed', stage: 'Completed', progress: 100, updated: '3 days ago' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-2">
            <svg width="40" height="40" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30,30 C30,22 25,15 18,15 C11,15 5,22 5,30 C5,38 11,45 18,45 L30,45" 
                    fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
              <path d="M28,45 L40,45 C47,45 53,38 53,30 C53,22 47,15 40,15 C33,15 28,22 28,30" 
                    fill="none" stroke="#60a5fa" strokeWidth="4" strokeLinecap="round" />
              <path d="M15,15 L40,0 L65,15" fill="none" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="25" y="15" width="30" height="30" fill="none" stroke="#34d399" strokeWidth="4" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">PropChain Developer Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-slate-700 px-4 py-2 rounded-full flex items-center">
            <Clock className="h-4 w-4 mr-2 text-blue-400" />
            <span className="text-sm">Last updated: Just now</span>
          </div>
          <div className="bg-blue-500 p-2 rounded-full">
            <span className="font-bold">JS</span>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-slate-800 px-4 py-2 border-t border-slate-700">
        <ul className="flex space-x-6">
          <li>
            <button 
              className={`px-3 py-2 rounded ${activeTab === 'dashboard' ? 'bg-blue-600' : 'hover:bg-slate-700'}`} 
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button 
              className={`px-3 py-2 rounded ${activeTab === 'properties' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}
              onClick={() => setActiveTab('properties')}
            >
              Properties
            </button>
          </li>
          <li>
            <button 
              className={`px-3 py-2 rounded ${activeTab === 'transactions' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}
              onClick={() => setActiveTab('transactions')}
            >
              Transactions
            </button>
          </li>
          <li>
            <button 
              className={`px-3 py-2 rounded ${activeTab === 'analytics' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}
              onClick={() => setActiveTab('analytics')}
            >
              Analytics
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-slate-800 rounded-lg p-6 shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 mb-1">Active Properties</p>
                <h2 className="text-3xl font-bold text-blue-500">4</h2>
                <p className="text-sm text-slate-400 mt-1">90 total units</p>
              </div>
              <div className="bg-blue-500 bg-opacity-20 p-3 rounded-lg">
                <Home className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-6 shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 mb-1">Active Transactions</p>
                <h2 className="text-3xl font-bold text-green-500">47</h2>
                <p className="text-sm text-green-400 mt-1">↑ 12% from last month</p>
              </div>
              <div className="bg-green-500 bg-opacity-20 p-3 rounded-lg">
                <Activity className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-6 shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 mb-1">Avg. Completion Time</p>
                <h2 className="text-3xl font-bold text-blue-400">3.2<span className="text-lg font-normal"> weeks</span></h2>
                <p className="text-sm text-green-400 mt-1">↓ 74% vs traditional</p>
              </div>
              <div className="bg-blue-400 bg-opacity-20 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-6 shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 mb-1">Cost Savings</p>
                <h2 className="text-3xl font-bold text-green-400">48<span className="text-xl font-normal">%</span></h2>
                <p className="text-sm text-slate-400 mt-1">£520,000 total savings</p>
              </div>
              <div className="bg-green-400 bg-opacity-20 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Middle Row - Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-slate-800 rounded-lg p-6 shadow col-span-2">
            <h3 className="text-lg font-bold mb-4">Transaction Time Comparison</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={transactionTimeData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" label={{ value: 'Weeks', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569' }}
                    labelStyle={{ color: '#f8fafc' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="traditional" stroke="#94a3b8" strokeWidth={2} name="Traditional Process" />
                  <Line type="monotone" dataKey="propchain" stroke="#10b981" strokeWidth={2} name="PropChain Process" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-6 shadow">
            <h3 className="text-lg font-bold mb-4">Transaction Status</h3>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={transactionStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {transactionStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569' }}
                    labelStyle={{ color: '#f8fafc' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Properties Bar Chart */}
        <div className="bg-slate-800 rounded-lg p-6 shadow mb-6">
          <h3 className="text-lg font-bold mb-4">Property Portfolio</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={propertyData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569' }}
                  labelStyle={{ color: '#f8fafc' }}
                />
                <Legend />
                <Bar dataKey="units" stackId="a" fill="#3b82f6" name="Total Units" />
                <Bar dataKey="active" stackId="b" fill="#10b981" name="Active Transactions" />
                <Bar dataKey="pending" stackId="b" fill="#60a5fa" name="Pending" />
                <Bar dataKey="completed" stackId="b" fill="#34d399" name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Recent Transactions */}
        <div className="bg-slate-800 rounded-lg p-6 shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Recent Transactions</h3>
            <button className="text-blue-400 hover:text-blue-300 text-sm">View all transactions</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-slate-400 border-b border-slate-700">
                  <th className="pb-3 pr-6">ID</th>
                  <th className="pb-3 pr-6">Property</th>
                  <th className="pb-3 pr-6">Status</th>
                  <th className="pb-3 pr-6">Stage</th>
                  <th className="pb-3 pr-6">Progress</th>
                  <th className="pb-3">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-slate-700 text-sm">
                    <td className="py-4 pr-6 font-mono">{transaction.id}</td>
                    <td className="py-4 pr-6">{transaction.property}</td>
                    <td className="py-4 pr-6">
                      {transaction.status === 'active' && <span className="flex items-center"><Circle className="h-3 w-3 text-blue-500 mr-2 fill-blue-500" /> Active</span>}
                      {transaction.status === 'pending' && <span className="flex items-center"><AlertCircle className="h-3 w-3 text-amber-500 mr-2" /> Pending</span>}
                      {transaction.status === 'completed' && <span className="flex items-center"><CheckCircle className="h-3 w-3 text-green-500 mr-2" /> Completed</span>}
                    </td>
                    <td className="py-4 pr-6">{transaction.stage}</td>
                    <td className="py-4 pr-6">
                      <div className="w-full bg-slate-700 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            transaction.status === 'completed' ? 'bg-green-500' : 
                            transaction.progress > 50 ? 'bg-blue-500' : 'bg-blue-400'
                          }`} 
                          style={{ width: `${transaction.progress}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="py-4 text-slate-400">{transaction.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PropChainDeveloperDashboard;