// 'use client'

// import Link from 'next/link';
// import { useState, useEffect } from 'react';
// import { Building2, Users, DollarSign, Eye, ArrowRight, CheckCircle, TrendingUp, Calendar } from 'lucide-react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// // Sample data for chart (yeh baad mein database se aa jayega)
// const sampleChartData = [
//   { month: 'Jan', count: 4 },
//   { month: 'Feb', count: 7 },
//   { month: 'Mar', count: 12 },
//   { month: 'Apr', count: 9 },
//   { month: 'May', count: 15 },
//   { month: 'Jun', count: 22 },
// ];

// const COLORS = ['#6366F1', '#8B5CF6', '#A855F7', '#D946EF', '#EC4899', '#F43F5E'];

// export default function DashboardPage() {
//   const [chartData, setChartData] = useState(sampleChartData);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     // Yahan database se data fetch kar sakte ho
//     // async function fetchData() {
//     //   const res = await fetch('/api/chart-data');
//     //   const data = await res.json();
//     //   setChartData(data);
//     // }
//     // fetchData();
//   }, []);

//   if (!mounted) {
//     return <div className="p-8 text-center">Loading...</div>;
//   }

//   const maxCount = Math.max(...chartData.map((d) => d.count), 1);
//   const totalRegistrations = chartData.reduce((sum, d) => sum + d.count, 0);
//   const growthRate = Math.round(((chartData[chartData.length - 1]?.count || 0) - (chartData[0]?.count || 0)) / (chartData[0]?.count || 1) * 100);

//   return (
//     <div className="space-y-6">
//       {/* Welcome Banner */}
//       <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 text-white shadow-xl">
//         <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
//         <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
//         <div className="relative">
//           <h1 className="text-2xl font-bold tracking-tight">Welcome back! 👋</h1>
//           <p className="text-indigo-100 text-sm mt-1">Here's what's happening with your business today</p>
//           <div className="flex gap-3 mt-4">
//             <button className="text-sm bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-lg hover:bg-white/30 transition-all flex items-center gap-2">
//               <TrendingUp size={14} /> View Reports
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <StatCard title="Total Tenants" value="0" icon={Building2} trend="+12%" trendUp={true} color="indigo" />
//         <StatCard title="Active Tenants" value="0" icon={Users} trend="+5%" trendUp={true} color="green" />
//         <StatCard title="Monthly Revenue" value="0" icon={DollarSign} trend="+18%" trendUp={true} color="blue" prefix="$" />
//         <StatCard title="Completion Rate" value="0" icon={CheckCircle} trend="+3%" trendUp={true} color="purple" suffix="%" />
//       </div>

//       {/* Chart Section - Full Width */}
//       <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden">
//         <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center flex-wrap gap-3">
//           <div>
//             <h3 className="font-semibold text-slate-800 dark:text-white">Tenant Growth Overview</h3>
//             <p className="text-xs text-slate-500 mt-0.5">Monthly tenant registrations (Last 6 months)</p>
//           </div>
//           <div className="flex items-center gap-2">
//             <select className="text-xs border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1.5 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300">
//               <option>Last 6 months</option>
//               <option>Last year</option>
//             </select>
//             <button className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all">
//               <Calendar size={16} />
//             </button>
//           </div>
//         </div>
        
//         <div className="p-5">
//           {/* Chart */}
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#CBD5E1" className="dark:stroke-slate-700" />
//               <XAxis 
//                 dataKey="month" 
//                 stroke="#64748B" 
//                 className="dark:stroke-slate-500"
//                 tick={{ fill: '#64748B', fontSize: 12 }}
//               />
//               <YAxis 
//                 stroke="#64748B" 
//                 className="dark:stroke-slate-500"
//                 tick={{ fill: '#64748B', fontSize: 12 }}
//                 allowDecimals={false}
//               />
//               <Tooltip 
//                 contentStyle={{ 
//                   backgroundColor: '#1E293B', 
//                   border: 'none', 
//                   borderRadius: '8px',
//                   padding: '8px 12px'
//                 }}
//                 cursor={{ fill: '#6366F1', fillOpacity: 0.1 }}
//                 formatter={(value: any) => [`${value} tenants`, 'Registrations']}
//                 labelStyle={{ color: '#94A3B8', fontSize: '12px' }}
//                 itemStyle={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 'bold' }}
//               />
//               <Bar dataKey="count" radius={[8, 8, 0, 0]} animationDuration={1500}>
//                 {chartData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
          
//           {/* Chart Stats */}
//           <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
//             <div className="text-center">
//               <p className="text-2xl font-bold text-slate-800 dark:text-white">{totalRegistrations}</p>
//               <p className="text-xs text-slate-500">Total Registrations</p>
//             </div>
//             <div className="text-center">
//               <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">+{growthRate}%</p>
//               <p className="text-xs text-slate-500">Growth Rate</p>
//             </div>
//             <div className="text-center">
//               <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{chartData[chartData.length - 1]?.count || 0}</p>
//               <p className="text-xs text-slate-500">This Month</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recent Tenants - Static for now */}
//       <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden">
//         <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
//           <div>
//             <h3 className="font-semibold text-slate-800 dark:text-white">Recent Tenants</h3>
//             <p className="text-xs text-slate-500 mt-0.5">Latest organizations that joined</p>
//           </div>
//           <Link href="/tenants" className="text-indigo-600 dark:text-indigo-400 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
//             View all <ArrowRight size={14} />
//           </Link>
//         </div>
        
//         <div className="p-8 text-center">
//           <Building2 className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
//           <p className="text-slate-500 dark:text-slate-400 text-sm">No tenants found</p>
//           <Link href="/tenants/create" className="text-indigo-600 dark:text-indigo-400 text-sm mt-2 inline-block hover:underline">
//             Create Tenant →
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Stat Card Component
// function StatCard({ title, value, icon: Icon, trend, trendUp, color, prefix = '', suffix = '' }: any) {
//   const colors: Record<string, string> = {
//     indigo: 'from-indigo-500 to-indigo-400',
//     green: 'from-emerald-500 to-green-400',
//     blue: 'from-blue-500 to-cyan-400',
//     purple: 'from-purple-500 to-pink-400'
//   };

//   return (
//     <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm hover:shadow-md transition-all duration-300 group">
//       <div className="flex justify-between items-start">
//         <div>
//           <p className="text-xs text-slate-500 dark:text-slate-400">{title}</p>
//           <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">
//             {prefix}{value}{suffix}
//           </p>
//           <span className={`inline-block text-xs px-1.5 py-0.5 rounded-full mt-1.5 ${
//             trendUp 
//               ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
//               : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
//           }`}>
//             {trend}
//           </span>
//         </div>
//         <div className={`p-2.5 rounded-xl bg-gradient-to-br ${colors[color]} shadow-md group-hover:scale-110 transition-transform duration-300`}>
//           <Icon size={18} className="text-white" />
//         </div>
//       </div>
//     </div>
//   );
// }



// 'use client'

// import Link from 'next/link';
// import { useState, useEffect } from 'react';
// import { Building2, Users, DollarSign, Eye, ArrowRight, CheckCircle, TrendingUp, Calendar } from 'lucide-react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// // Sample data for chart (yeh baad mein database se aa jayega)
// const sampleChartData = [
//   { month: 'Jan', count: 4 },
//   { month: 'Feb', count: 7 },
//   { month: 'Mar', count: 12 },
//   { month: 'Apr', count: 9 },
//   { month: 'May', count: 15 },
//   { month: 'Jun', count: 22 },
// ];

// const COLORS = ['#EF4444', '#DC2626', '#B91C1C', '#991B1B', '#7F1D1D', '#450A0A'];

// export default function DashboardPage() {
//   const [chartData, setChartData] = useState(sampleChartData);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     // Yahan database se data fetch kar sakte ho
//     // async function fetchData() {
//     //   const res = await fetch('/api/chart-data');
//     //   const data = await res.json();
//     //   setChartData(data);
//     // }
//     // fetchData();
//   }, []);

//   if (!mounted) {
//     return <div className="p-8 text-center">Loading...</div>;
//   }

//   const maxCount = Math.max(...chartData.map((d) => d.count), 1);
//   const totalRegistrations = chartData.reduce((sum, d) => sum + d.count, 0);
//   const growthRate = Math.round(((chartData[chartData.length - 1]?.count || 0) - (chartData[0]?.count || 0)) / (chartData[0]?.count || 1) * 100);

//   return (
//     <div className="space-y-6">
//       {/* Welcome Banner */}
//       <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 via-red-700 to-red-800 p-6 text-white shadow-xl">
//         <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
//         <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
//         <div className="relative">
//           <h1 className="text-2xl font-bold tracking-tight">Welcome back! 👋</h1>
//           <p className="text-red-100 text-sm mt-1">Here's what's happening with your business today</p>
//           <div className="flex gap-3 mt-4">
//             <button className="text-sm bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-lg hover:bg-white/30 transition-all flex items-center gap-2 cursor-pointer">
//               <TrendingUp size={14} /> View Reports
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <StatCard title="Total Tenants" value="0" icon={Building2} trend="+12%" trendUp={true} color="red" />
//         <StatCard title="Active Tenants" value="0" icon={Users} trend="+5%" trendUp={true} color="red" />
//         <StatCard title="Monthly Revenue" value="0" icon={DollarSign} trend="+18%" trendUp={true} color="red" prefix="$" />
//         <StatCard title="Completion Rate" value="0" icon={CheckCircle} trend="+3%" trendUp={true} color="red" suffix="%" />
//       </div>

//       {/* Chart Section - Full Width */}
//       <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
//         <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center flex-wrap gap-3">
//           <div>
//             <h3 className="font-semibold text-gray-800">Tenant Growth Overview</h3>
//             <p className="text-xs text-gray-500 mt-0.5">Monthly tenant registrations (Last 6 months)</p>
//           </div>
//           <div className="flex items-center gap-2">
//             <select className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white text-gray-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400">
//               <option>Last 6 months</option>
//               <option>Last year</option>
//             </select>
//             <button className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all cursor-pointer">
//               <Calendar size={16} />
//             </button>
//           </div>
//         </div>
        
//         <div className="p-5">
//           {/* Chart */}
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
//               <XAxis 
//                 dataKey="month" 
//                 stroke="#6B7280"
//                 tick={{ fill: '#6B7280', fontSize: 12 }}
//               />
//               <YAxis 
//                 stroke="#6B7280"
//                 tick={{ fill: '#6B7280', fontSize: 12 }}
//                 allowDecimals={false}
//               />
//               <Tooltip 
//                 contentStyle={{ 
//                   backgroundColor: '#FFFFFF', 
//                   border: '1px solid #E5E7EB', 
//                   borderRadius: '8px',
//                   padding: '8px 12px',
//                   boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
//                 }}
//                 cursor={{ fill: '#EF4444', fillOpacity: 0.1 }}
//                 formatter={(value: any) => [`${value} tenants`, 'Registrations']}
//                 labelStyle={{ color: '#374151', fontSize: '12px', fontWeight: 'bold' }}
//                 itemStyle={{ color: '#EF4444', fontSize: '14px', fontWeight: 'bold' }}
//               />
//               <Bar dataKey="count" radius={[8, 8, 0, 0]} animationDuration={1500}>
//                 {chartData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
          
//           {/* Chart Stats */}
//           <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-100">
//             <div className="text-center">
//               <p className="text-2xl font-bold text-gray-800">{totalRegistrations}</p>
//               <p className="text-xs text-gray-500">Total Registrations</p>
//             </div>
//             <div className="text-center">
//               <p className="text-2xl font-bold text-red-600">+{growthRate}%</p>
//               <p className="text-xs text-gray-500">Growth Rate</p>
//             </div>
//             <div className="text-center">
//               <p className="text-2xl font-bold text-red-600">{chartData[chartData.length - 1]?.count || 0}</p>
//               <p className="text-xs text-gray-500">This Month</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recent Tenants - Static for now */}
//       <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
//         <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
//           <div>
//             <h3 className="font-semibold text-gray-800">Recent Tenants</h3>
//             <p className="text-xs text-gray-500 mt-0.5">Latest organizations that joined</p>
//           </div>
//           <Link href="/tenants" className="text-red-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all cursor-pointer">
//             View all <ArrowRight size={14} />
//           </Link>
//         </div>
        
//         <div className="p-8 text-center">
//           <Building2 className="w-10 h-10 text-gray-300 mx-auto mb-2" />
//           <p className="text-gray-500 text-sm">No tenants found</p>
//           <Link href="/tenants/create" className="text-red-600 text-sm mt-2 inline-block hover:underline cursor-pointer">
//             Create Tenant →
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Stat Card Component
// function StatCard({ title, value, icon: Icon, trend, trendUp, color, prefix = '', suffix = '' }: any) {
//   const colors: Record<string, string> = {
//     red: 'from-red-500 to-red-600'
//   };

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer">
//       <div className="flex justify-between items-start">
//         <div>
//           <p className="text-xs text-gray-500">{title}</p>
//           <p className="text-2xl font-bold text-gray-800 mt-1">
//             {prefix}{value}{suffix}
//           </p>
//           <span className={`inline-block text-xs px-1.5 py-0.5 rounded-full mt-1.5 ${
//             trendUp 
//               ? 'bg-green-100 text-green-700' 
//               : 'bg-red-100 text-red-700'
//           }`}>
//             {trend}
//           </span>
//         </div>
//         <div className={`p-2.5 rounded-xl bg-gradient-to-br ${colors[color]} shadow-md group-hover:scale-110 transition-transform duration-300`}>
//           <Icon size={18} className="text-white" />
//         </div>
//       </div>
//     </div>
//   );
// }



'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/components/layout/SessionProvider';

export default function Home() {
  const router = useRouter();
  const { user, loading } = useSession();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/dashboard');
      } else {
        router.push('/signin');
      }
    }
  }, [user, loading, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}