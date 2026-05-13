// import React from 'react';
// import { 
//   Package, 
//   Users, 
//   ShoppingCart, 
//   DollarSign, 
//   TrendingUp, 
//   TrendingDown,
//   Eye,
//   Calendar
// } from 'lucide-react';

// const AdminDashboard = () => {
//   const stats = [
//     {
//       title: 'Total Products',
//       value: '156',
//       change: '+12%',
//       changeType: 'increase',
//       icon: Package,
//       color: 'bg-blue-500'
//     },
//     {
//       title: 'Total Users',
//       value: '2,847',
//       change: '+18%',
//       changeType: 'increase',
//       icon: Users,
//       color: 'bg-green-500'
//     },
//     {
//       title: 'Total Orders',
//       value: '1,234',
//       change: '+8%',
//       changeType: 'increase',
//       icon: ShoppingCart,
//       color: 'bg-purple-500'
//     },
//     {
//       title: 'Revenue',
//       value: '$45,678',
//       change: '-3%',
//       changeType: 'decrease',
//       icon: DollarSign,
//       color: 'bg-gold'
//     }
//   ];

//   const recentOrders = [
//     { id: 'ORD-001', customer: 'John Doe', amount: '$195', status: 'Completed', date: '2024-01-20' },
//     { id: 'ORD-002', customer: 'Jane Smith', amount: '$285', status: 'Processing', date: '2024-01-20' },
//     { id: 'ORD-003', customer: 'Mike Johnson', amount: '$125', status: 'Shipped', date: '2024-01-19' },
//     { id: 'ORD-004', customer: 'Sarah Wilson', amount: '$450', status: 'Pending', date: '2024-01-19' },
//     { id: 'ORD-005', customer: 'David Brown', amount: '$235', status: 'Completed', date: '2024-01-18' }
//   ];

//   const topProducts = [
//     { name: 'Himalayan Harmony Bowl', sales: 45, revenue: '$8,775' },
//     { name: 'Ancient Resonance Bowl', sales: 32, revenue: '$9,120' },
//     { name: 'Tranquility Mini Bowl', sales: 28, revenue: '$3,500' },
//     { name: 'Mountain Echo Bowl', sales: 22, revenue: '$5,170' },
//     { name: 'Artisan\'s Masterpiece Bowl', sales: 15, revenue: '$6,750' }
//   ];

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'Completed':
//         return 'bg-green-100 text-green-800';
//       case 'Processing':
//         return 'bg-blue-100 text-blue-800';
//       case 'Shipped':
//         return 'bg-purple-100 text-purple-800';
//       case 'Pending':
//         return 'bg-yellow-100 text-yellow-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Page Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
//           <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
//         </div>
//         <div className="flex items-center space-x-2 text-sm text-gray-500">
//           <Calendar size={16} />
//           <span>{new Date().toLocaleDateString()}</span>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, index) => (
//           <div key={index} className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">{stat.title}</p>
//                 <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//               </div>
//               <div className={`p-3 rounded-full ${stat.color}`}>
//                 <stat.icon className="h-6 w-6 text-white" />
//               </div>
//             </div>
//             <div className="mt-4 flex items-center">
//               {stat.changeType === 'increase' ? (
//                 <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
//               ) : (
//                 <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
//               )}
//               <span className={`text-sm font-medium ${
//                 stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
//               }`}>
//                 {stat.change}
//               </span>
//               <span className="text-sm text-gray-500 ml-1">from last month</span>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Recent Orders */}
//         <div className="bg-white rounded-lg shadow">
//           <div className="p-6 border-b border-gray-200">
//             <div className="flex items-center justify-between">
//               <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
//               <button className="text-gold hover:text-gold/80 text-sm font-medium">
//                 View all
//               </button>
//             </div>
//           </div>
//           <div className="p-6">
//             <div className="space-y-4">
//               {recentOrders.map((order) => (
//                 <div key={order.id} className="flex items-center justify-between">
//                   <div>
//                     <p className="font-medium text-gray-900">{order.id}</p>
//                     <p className="text-sm text-gray-500">{order.customer}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-medium text-gray-900">{order.amount}</p>
//                     <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
//                       {order.status}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Top Products */}
//         <div className="bg-white rounded-lg shadow">
//           <div className="p-6 border-b border-gray-200">
//             <div className="flex items-center justify-between">
//               <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
//               <button className="text-gold hover:text-gold/80 text-sm font-medium">
//                 View all
//               </button>
//             </div>
//           </div>
//           <div className="p-6">
//             <div className="space-y-4">
//               {topProducts.map((product, index) => (
//                 <div key={index} className="flex items-center justify-between">
//                   <div className="flex-1">
//                     <p className="font-medium text-gray-900 truncate">{product.name}</p>
//                     <p className="text-sm text-gray-500">{product.sales} sales</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-medium text-gray-900">{product.revenue}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white rounded-lg shadow p-6">
//         <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gold hover:bg-gold/5 transition-colors">
//             <Package className="h-8 w-8 text-gray-400 mx-auto mb-2" />
//             <p className="text-sm font-medium text-gray-600">Add New Product</p>
//           </button>
//           <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gold hover:bg-gold/5 transition-colors">
//             <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
//             <p className="text-sm font-medium text-gray-600">Manage Users</p>
//           </button>
//           <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gold hover:bg-gold/5 transition-colors">
//             <Eye className="h-8 w-8 text-gray-400 mx-auto mb-2" />
//             <p className="text-sm font-medium text-gray-600">View Analytics</p>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


//new

// import React, { useEffect, useState } from "react"
// import {
//   Package,
//   Users,
//   ShoppingCart,
//   DollarSign,
//   TrendingUp,
//   TrendingDown,
//   Eye,
//   Calendar,
// } from "lucide-react"

// const API_BASE = "http://localhost:5000/api"

// interface Product {
//   _id: string
//   name: string
// }

// interface User {
//   _id: string
// }

// interface OrderItem {
//   productName: string
//   quantity: number
//   price: number
// }

// interface Order {
//   _id: string
//   customerName: string
//   totalAmount: number
//   status: string
//   createdAt: string
//   items: OrderItem[]
// }

// const AdminDashboard = () => {
//   const [products, setProducts] = useState<Product[]>([])
//   const [users, setUsers] = useState<User[]>([])
//   const [orders, setOrders] = useState<Order[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const [productsRes, usersRes, ordersRes] = await Promise.all([
//           fetch(`${API_BASE}/products`),
//           fetch(`${API_BASE}/users`),
//           fetch(`${API_BASE}/orders`),
//         ])

//         const productsData = await productsRes.json()
//         const usersData = await usersRes.json()
//         const ordersData = await ordersRes.json()

//         setProducts(productsData)
//         setUsers(usersData)
//         setOrders(ordersData)
//       } catch (error) {
//         console.error("Dashboard fetch error:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchDashboardData()
//   }, [])

//   /* ===================== CALCULATIONS ===================== */

//   const totalRevenue = orders.reduce(
//     (sum, order) => sum + order.totalAmount,
//     0
//   )

//   const recentOrders = [...orders]
//     .sort(
//       (a, b) =>
//         new Date(b.createdAt).getTime() -
//         new Date(a.createdAt).getTime()
//     )
//     .slice(0, 5)

//   const productSalesMap: Record<string, { sales: number; revenue: number }> = {}

//   orders.forEach(order => {
//     order.items.forEach(item => {
//       if (!productSalesMap[item.productName]) {
//         productSalesMap[item.productName] = { sales: 0, revenue: 0 }
//       }
//       productSalesMap[item.productName].sales += item.quantity
//       productSalesMap[item.productName].revenue +=
//         item.quantity * item.price
//     })
//   })

//   const topProducts = Object.entries(productSalesMap)
//     .map(([name, data]) => ({
//       name,
//       sales: data.sales,
//       revenue: `$${data.revenue.toLocaleString()}`,
//     }))
//     .sort((a, b) => b.sales - a.sales)
//     .slice(0, 5)

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "Completed":
//         return "bg-green-100 text-green-800"
//       case "Processing":
//         return "bg-blue-100 text-blue-800"
//       case "Shipped":
//         return "bg-purple-100 text-purple-800"
//       case "Pending":
//         return "bg-yellow-100 text-yellow-800"
//       default:
//         return "bg-gray-100 text-gray-800"
//     }
//   }

//   if (loading) {
//     return <div className="text-center py-20">Loading dashboard...</div>
//   }

//   const stats = [
//     {
//       title: "Total Products",
//       value: products.length,
//       icon: Package,
//       color: "bg-blue-500",
//     },
//     {
//       title: "Total Users",
//       value: users.length,
//       icon: Users,
//       color: "bg-green-500",
//     },
//     {
//       title: "Total Orders",
//       value: orders.length,
//       icon: ShoppingCart,
//       color: "bg-purple-500",
//     },
//     {
//       title: "Revenue",
//       value: `$${totalRevenue.toLocaleString()}`,
//       icon: DollarSign,
//       color: "bg-gold",
//     },
//   ]

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
//           <p className="text-gray-600">
//             Welcome back! Here's what's happening with your store.
//           </p>
//         </div>
//         <div className="flex items-center space-x-2 text-sm text-gray-500">
//           <Calendar size={16} />
//           <span>{new Date().toLocaleDateString()}</span>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, index) => (
//           <div key={index} className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">{stat.title}</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {stat.value}
//                 </p>
//               </div>
//               <div className={`p-3 rounded-full ${stat.color}`}>
//                 <stat.icon className="h-6 w-6 text-white" />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Recent Orders */}
//         <div className="bg-white rounded-lg shadow">
//           <div className="p-6 border-b">
//             <h2 className="text-lg font-semibold">Recent Orders</h2>
//           </div>
//           <div className="p-6 space-y-4">
//             {recentOrders.map(order => (
//               <div key={order._id} className="flex justify-between">
//                 <div>
//                   <p className="font-medium">{order._id}</p>
//                   <p className="text-sm text-gray-500">
//                     {order.customerName}
//                   </p>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-medium">
//                     ${order.totalAmount}
//                   </p>
//                   <span
//                     className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
//                       order.status
//                     )}`}
//                   >
//                     {order.status}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Top Products */}
//         <div className="bg-white rounded-lg shadow">
//           <div className="p-6 border-b">
//             <h2 className="text-lg font-semibold">Top Products</h2>
//           </div>
//           <div className="p-6 space-y-4">
//             {topProducts.map((product, index) => (
//               <div key={index} className="flex justify-between">
//                 <div>
//                   <p className="font-medium">{product.name}</p>
//                   <p className="text-sm text-gray-500">
//                     {product.sales} sales
//                   </p>
//                 </div>
//                 <p className="font-medium">{product.revenue}</p>
//               </div>
              
//             ))}
//           </div>
          
//         </div>
//       </div>
//       <div className="bg-white rounded-lg shadow p-6">
//         <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gold hover:bg-gold/5 transition-colors">
//             <Package className="h-8 w-8 text-gray-400 mx-auto mb-2" />
//             <p className="text-sm font-medium text-gray-600">Add New Product</p>
//           </button>
//           <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gold hover:bg-gold/5 transition-colors">
//             <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
//             <p className="text-sm font-medium text-gray-600">Manage Users</p>
//           </button>
//           <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gold hover:bg-gold/5 transition-colors">
//             <Eye className="h-8 w-8 text-gray-400 mx-auto mb-2" />
//             <p className="text-sm font-medium text-gray-600">View Analytics</p>
//           </button>
//         </div>
//       </div>
//     </div>
    
//   )
// }
// export default AdminDashboard



// // //new new

// import React, { useEffect, useState } from "react"
// import {
//   Package,
//   Users,
//   ShoppingCart,
//   DollarSign,
//   TrendingUp,
//   TrendingDown,
//   Eye,
//   Calendar,
// } from "lucide-react"

// const API_BASE = "http://localhost:5000/api"

// interface Product {
//   _id: string
//   name: string
//   price: number
//   stock: number
// }

// interface User {
//   _id: string
//   firstName: string
//   lastName: string
//   email: string
//   role: string
//   status: string
// }

// interface OrderItem {
//   productName: string
//   quantity: number
//   price: number
// }

// interface Order {
//   _id: string
//   customerName: string
//   totalAmount: number
//   status: string
//   createdAt: string
//   items: OrderItem[]
// }

// const AdminDashboard = () => {
//   const [products, setProducts] = useState<Product[]>([])
//   const [users, setUsers] = useState<User[]>([])
//   const [orders, setOrders] = useState<Order[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   const getToken = () => {
//     // Try to get token from localStorage (same as your AuthContext)
//     const token = localStorage.getItem('token') || 
//                   localStorage.getItem('authToken') ||
//                   localStorage.getItem('userToken') ||
//                   sessionStorage.getItem('token')
    
//     console.log("Token found in storage:", !!token)
//     return token
//   }

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       setLoading(true)
//       setError(null)
      
//       try {
//         const token = getToken()
        
//         if (!token) {
//           setError("Authentication required. Please login first.")
//           setLoading(false)
//           return
//         }

//         console.log("Fetching dashboard data with token")

//         // Prepare headers with authentication
//         const headers = {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }

//         // Fetch all data in parallel
//         const [productsRes, usersRes, ordersRes] = await Promise.all([
//           fetch(`${API_BASE}/products`, { headers }),
//           fetch(`${API_BASE}/users`, { headers }),
//           fetch(`${API_BASE}/orders`, { headers }),
//         ])

//         // Log response statuses for debugging
//         console.log("API Response Statuses:", {
//           products: productsRes.status,
//           users: usersRes.status,
//           orders: ordersRes.status
//         })

//         // Check if users request failed
//         if (!usersRes.ok) {
//           const errorText = await usersRes.text()
//           console.error("Users API Error:", errorText)
//           throw new Error(`Users API: ${usersRes.status} ${usersRes.statusText}`)
//         }

//         const productsData = await productsRes.json()
//         const usersData = await usersRes.json()
//         const ordersData = await ordersRes.json()

//         console.log("Raw API Responses:", {
//           products: productsData,
//           users: usersData,
//           orders: ordersData
//         })

//         // Extract data from API responses
//         // For Products
//         let productsArray: Product[] = []
//         if (productsData.data && productsData.data.products && Array.isArray(productsData.data.products)) {
//           productsArray = productsData.data.products
//         } else if (productsData.data && Array.isArray(productsData.data)) {
//           productsArray = productsData.data
//         } else if (productsData.products && Array.isArray(productsData.products)) {
//           productsArray = productsData.products
//         } else if (Array.isArray(productsData)) {
//           productsArray = productsData
//         }

//         // For Users - This is the key fix!
//         let usersArray: User[] = []
//         if (usersData.data && usersData.data.users && Array.isArray(usersData.data.users)) {
//           // Structure: { data: { users: [...] } }
//           usersArray = usersData.data.users
//         } else if (usersData.data && Array.isArray(usersData.data)) {
//           // Structure: { data: [...] }
//           usersArray = usersData.data
//         } else if (usersData.users && Array.isArray(usersData.users)) {
//           // Structure: { users: [...] }
//           usersArray = usersData.users
//         } else if (Array.isArray(usersData)) {
//           // Structure: [...]
//           usersArray = usersData
//         }

//         // For Orders
//         let ordersArray: Order[] = []
//         if (ordersData.data && ordersData.data.orders && Array.isArray(ordersData.data.orders)) {
//           ordersArray = ordersData.data.orders
//         } else if (ordersData.data && Array.isArray(ordersData.data)) {
//           ordersArray = ordersData.data
//         } else if (ordersData.orders && Array.isArray(ordersData.orders)) {
//           ordersArray = ordersData.orders
//         } else if (Array.isArray(ordersData)) {
//           ordersArray = ordersData
//         }

//         console.log("Extracted Data Counts:", {
//           products: productsArray.length,
//           users: usersArray.length,
//           orders: ordersArray.length
//         })

//         // Validate we got arrays
//         if (!Array.isArray(productsArray) || !Array.isArray(usersArray) || !Array.isArray(ordersArray)) {
//           console.error("Data extraction failed:", {
//             productsIsArray: Array.isArray(productsArray),
//             usersIsArray: Array.isArray(usersArray),
//             ordersIsArray: Array.isArray(ordersArray)
//           })
//         }

//         setProducts(productsArray || [])
//         setUsers(usersArray || [])
//         setOrders(ordersArray || [])

//       } catch (error) {
//         console.error("Dashboard fetch error:", error)
//         setError(error instanceof Error ? error.message : "Failed to load dashboard data")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchDashboardData()
//   }, [])

//   /* ===================== CALCULATIONS ===================== */

//   const totalRevenue = orders.reduce(
//     (sum, order) => sum + (order?.totalAmount || 0),
//     0
//   )

//   const recentOrders = [...orders]
//     .sort(
//       (a, b) =>
//         new Date(b.createdAt).getTime() -
//         new Date(a.createdAt).getTime()
//     )
//     .slice(0, 5)

//   const productSalesMap: Record<string, { sales: number; revenue: number }> = {}

//   orders.forEach(order => {
//     order?.items?.forEach(item => {
//       if (!productSalesMap[item.productName]) {
//         productSalesMap[item.productName] = { sales: 0, revenue: 0 }
//       }
//       productSalesMap[item.productName].sales += item.quantity
//       productSalesMap[item.productName].revenue +=
//         item.quantity * item.price
//     })
//   })

//   const topProducts = Object.entries(productSalesMap)
//     .map(([name, data]) => ({
//       name,
//       sales: data.sales,
//       revenue: `$${(data.revenue || 0).toLocaleString()}`,
//     }))
//     .sort((a, b) => b.sales - a.sales)
//     .slice(0, 5)

//   const getStatusColor = (status: string) => {
//     switch (status?.toLowerCase()) {
//       case "completed":
//         return "bg-green-100 text-green-800"
//       case "processing":
//         return "bg-blue-100 text-blue-800"
//       case "shipped":
//         return "bg-purple-100 text-purple-800"
//       case "pending":
//         return "bg-yellow-100 text-yellow-800"
//       default:
//         return "bg-gray-100 text-gray-800"
//     }
//   }

//   const getRevenueGrowth = () => {
//     const currentMonth = new Date().getMonth()
//     const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1
//     const currentYear = new Date().getFullYear()
//     const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear

//     const currentMonthRevenue = orders
//       .filter(order => {
//         const orderDate = new Date(order.createdAt)
//         return orderDate.getMonth() === currentMonth && 
//                orderDate.getFullYear() === currentYear
//       })
//       .reduce((sum, order) => sum + (order.totalAmount || 0), 0)

//     const lastMonthRevenue = orders
//       .filter(order => {
//         const orderDate = new Date(order.createdAt)
//         return orderDate.getMonth() === lastMonth && 
//                orderDate.getFullYear() === lastMonthYear
//       })
//       .reduce((sum, order) => sum + (order.totalAmount || 0), 0)

//     if (lastMonthRevenue === 0) return { percentage: 100, isPositive: true }
    
//     const growth = ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
//     return { 
//       percentage: Math.abs(Math.round(growth)), 
//       isPositive: growth >= 0 
//     }
//   }

//   const revenueGrowth = getRevenueGrowth()
//   const activeUsers = users.filter(user => user?.status === 'active').length

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
//         <p className="ml-4">Loading dashboard...</p>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center h-64 space-y-4">
//         <div className="text-red-500 text-lg font-medium">Error Loading Dashboard</div>
//         <div className="text-gray-600 text-center max-w-md">
//           <p>{error}</p>
//           <p className="text-sm mt-2">Try these steps:</p>
//           <ol className="text-sm text-left mt-1 text-gray-500 list-decimal list-inside">
//             <li>Make sure you're logged in</li>
//             <li>Check browser console for details (F12)</li>
//             <li>Try refreshing the page</li>
//           </ol>
//         </div>
//         <div className="flex space-x-3">
//           <button
//             onClick={() => window.location.href = '/login'}
//             className="px-4 py-2 bg-gold text-white rounded-md hover:bg-gold/90"
//           >
//             Go to Login
//           </button>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     )
//   }

//   const stats = [
//     {
//       title: "Total Products",
//       value: products.length,
//       icon: Package,
//       color: "bg-blue-500",
//       description: "All available products"
//     },
//     {
//       title: "Total Users",
//       value: users.length,
//       icon: Users,
//       color: "bg-green-500",
//       description: `${activeUsers} active users`
//     },
//     {
//       title: "Total Orders",
//       value: orders.length,
//       icon: ShoppingCart,
//       color: "bg-purple-500",
//       description: `${orders.filter(o => o?.status?.toLowerCase() === "completed").length} completed`
//     },
//     {
//       title: "Total Revenue",
//       value: `$${totalRevenue.toLocaleString()}`,
//       icon: DollarSign,
//       color: "bg-gold",
//       description: (
//         <div className="flex items-center">
//           {revenueGrowth.isPositive ? (
//             <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
//           ) : (
//             <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
//           )}
//           <span className={revenueGrowth.isPositive ? "text-green-500" : "text-red-500"}>
//             {revenueGrowth.percentage}% {revenueGrowth.isPositive ? "growth" : "decline"}
//           </span>
//         </div>
//       )
//     },
//   ]

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
//           <p className="text-gray-600">
//             Welcome back! Here's what's happening with your store.
//           </p>
//         </div>
//         <div className="flex items-center space-x-2 text-sm text-gray-500">
//           <Calendar size={16} />
//           <span>{new Date().toLocaleDateString()}</span>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, index) => (
//           <div key={index} className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-start justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">{stat.title}</p>
//                 <p className="text-2xl font-bold text-gray-900 mt-1">
//                   {stat.value}
//                 </p>
//                 <div className="mt-2 text-xs text-gray-500">
//                   {stat.description}
//                 </div>
//               </div>
//               <div className={`p-3 rounded-full ${stat.color}`}>
//                 <stat.icon className="h-6 w-6 text-white" />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Recent Orders */}
//         <div className="bg-white rounded-lg shadow">
//           <div className="p-6 border-b">
//             <h2 className="text-lg font-semibold">Recent Orders</h2>
//             <p className="text-sm text-gray-500 mt-1">Latest 5 orders</p>
//           </div>
//           <div className="p-6 space-y-4">
//             {recentOrders.length > 0 ? (
//               recentOrders.map(order => (
//                 <div key={order._id} className="flex justify-between items-center">
//                   <div>
//                     <p className="font-medium text-gray-900">Order #{order._id?.slice(-6)}</p>
//                     <p className="text-sm text-gray-500">
//                       {order.customerName}
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-medium text-gray-900">
//                       ${(order.totalAmount || 0).toFixed(2)}
//                     </p>
//                     <span
//                       className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
//                         order.status
//                       )}`}
//                     >
//                       {order.status || "Unknown"}
//                     </span>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center py-8">
//                 <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
//                 <p className="text-gray-500">No orders yet</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Top Products */}
//         <div className="bg-white rounded-lg shadow">
//           <div className="p-6 border-b">
//             <h2 className="text-lg font-semibold">Top Products</h2>
//             <p className="text-sm text-gray-500 mt-1">Best selling items</p>
//           </div>
//           <div className="p-6 space-y-4">
//             {topProducts.length > 0 ? (
//               topProducts.map((product, index) => (
//                 <div key={index} className="flex justify-between items-center">
//                   <div>
//                     <p className="font-medium text-gray-900">{product.name}</p>
//                     <p className="text-sm text-gray-500">
//                       {product.sales} sales
//                     </p>
//                   </div>
//                   <p className="font-medium text-gray-900">{product.revenue}</p>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center py-8">
//                 <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
//                 <p className="text-gray-500">No sales data yet</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
      
//       <div className="bg-white rounded-lg shadow p-6">
//         <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <button 
//             onClick={() => window.location.href = '/admin/products'}
//             className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gold hover:bg-gold/5 transition-colors flex flex-col items-center"
//           >
//             <Package className="h-8 w-8 text-gray-400 mb-2" />
//             <p className="text-sm font-medium text-gray-600">Manage Products</p>
//           </button>
//           <button 
//             onClick={() => window.location.href = '/admin/users'}
//             className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gold hover:bg-gold/5 transition-colors flex flex-col items-center"
//           >
//             <Users className="h-8 w-8 text-gray-400 mb-2" />
//             <p className="text-sm font-medium text-gray-600">Manage Users</p>
//           </button>
//           <button 
//             onClick={() => window.location.href = '/admin/orders'}
//             className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gold hover:bg-gold/5 transition-colors flex flex-col items-center"
//           >
//             <Eye className="h-8 w-8 text-gray-400 mb-2" />
//             <p className="text-sm font-medium text-gray-600">View Orders</p>
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminDashboard



import React, { useEffect, useState } from "react"
import {
  Package,
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Eye,
  Calendar,
  RefreshCw,
  AlertCircle,
  User,
  Clock,
  CreditCard,
  Truck,
} from "lucide-react"

const API_BASE = "http://localhost:5000/api"

interface Product {
  _id: string
  name: string
  price: number
  stock: number
}

interface User {
  _id: string
  firstName: string
  lastName: string
  email: string
  role: string
  status: string
}

interface OrderItem {
  productId: string
  productName: string
  productImage: string
  quantity: number
  price: number
  size: string
  tone: string
}

interface ShippingAddress {
  firstName: string
  lastName: string
  email: string
  phone: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

interface Order {
  id: string
  _id?: string
  userId: string
  items: OrderItem[]
  shippingAddress: ShippingAddress
  paymentMethod: string
  subtotal: number
  deliveryCharge: number
  tax: number
  totalAmount: number
  status: string
  orderDate: string
  createdAt?: string
  estimatedDelivery: string
  isPaid: boolean
  isDelivered: boolean
}

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  const getToken = () => {
    const token = localStorage.getItem('token') || 
                  localStorage.getItem('authToken') ||
                  localStorage.getItem('userToken') ||
                  sessionStorage.getItem('token')
    
    console.log("Token found in storage:", !!token)
    return token
  }

  const fetchDashboardData = async () => {
    setRefreshing(true)
    setError(null)
    
    try {
      const token = getToken()
      
      if (!token) {
        setError("Authentication required. Please login first.")
        setRefreshing(false)
        setLoading(false)
        return
      }

      console.log("Fetching dashboard data with token")

      // Prepare headers with authentication
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }

      // Fetch all data in parallel
      const [productsRes, usersRes, ordersRes] = await Promise.all([
        fetch(`${API_BASE}/products`, { headers }).catch(err => {
          console.error("Products fetch error:", err)
          return { ok: false, status: 500, statusText: "Network error" }
        }),
        fetch(`${API_BASE}/users`, { headers }).catch(err => {
          console.error("Users fetch error:", err)
          return { ok: false, status: 500, statusText: "Network error" }
        }),
        fetch(`${API_BASE}/orders/admin`, { headers }).catch(err => { // Changed to admin endpoint
          console.error("Orders fetch error:", err)
          return { ok: false, status: 500, statusText: "Network error" }
        }),
      ])

      // Log response statuses for debugging
      console.log("API Response Statuses:", {
        products: productsRes.status,
        users: usersRes.status,
        orders: ordersRes.status
      })

      // Handle products response
      let productsData = []
      if (productsRes.ok) {
        try {
          const data = await productsRes.json()
          console.log("Products raw data:", data)
          productsData = data
        } catch (err) {
          console.error("Products JSON parse error:", err)
        }
      }

      // Handle users response
      let usersData = []
      if (usersRes.ok) {
        try {
          const data = await usersRes.json()
          console.log("Users raw data:", data)
          usersData = data
        } catch (err) {
          console.error("Users JSON parse error:", err)
        }
      } else {
        console.error("Users API failed:", await usersRes.text())
      }

      // Handle orders response - NOTE: Changed to admin endpoint
      let ordersData = []
      if (ordersRes.ok) {
        try {
          const data = await ordersRes.json()
          console.log("Orders raw data:", data)
          ordersData = data
          // Debug: Log first order details
          if (data && data.length > 0) {
            console.log("First order details:", data[0])
            console.log("Order id:", data[0].id)
            console.log("Order keys:", Object.keys(data[0]))
          }
        } catch (err) {
          console.error("Orders JSON parse error:", err)
        }
      }

      // Extract data from API responses
      // For Products
      let productsArray: Product[] = []
      if (productsData.data && productsData.data.products && Array.isArray(productsData.data.products)) {
        productsArray = productsData.data.products
      } else if (productsData.data && Array.isArray(productsData.data)) {
        productsArray = productsData.data
      } else if (productsData.products && Array.isArray(productsData.products)) {
        productsArray = productsData.products
      } else if (Array.isArray(productsData)) {
        productsArray = productsData
      }

      // For Users
      let usersArray: User[] = []
      if (usersData.data && usersData.data.users && Array.isArray(usersData.data.users)) {
        usersArray = usersData.data.users
      } else if (usersData.data && Array.isArray(usersData.data)) {
        usersArray = usersData.data
      } else if (usersData.users && Array.isArray(usersData.users)) {
        usersArray = usersData.users
      } else if (Array.isArray(usersData)) {
        usersArray = usersData
      }

      // For Orders - IMPORTANT: Your orders have 'id' field, not '_id'
      let ordersArray: Order[] = []
      if (ordersData.data && ordersData.data.orders && Array.isArray(ordersData.data.orders)) {
        ordersArray = ordersData.data.orders
      } else if (ordersData.data && Array.isArray(ordersData.data)) {
        ordersArray = ordersData.data
      } else if (ordersData.orders && Array.isArray(ordersData.orders)) {
        ordersArray = ordersData.orders
      } else if (Array.isArray(ordersData)) {
        ordersArray = ordersData
      }

      console.log("Extracted Data Counts:", {
        products: productsArray.length,
        users: usersArray.length,
        orders: ordersArray.length
      })

      // Validate we got arrays
      if (!Array.isArray(productsArray) || !Array.isArray(usersArray) || !Array.isArray(ordersArray)) {
        console.error("Data extraction failed:", {
          productsIsArray: Array.isArray(productsArray),
          usersIsArray: Array.isArray(usersArray),
          ordersIsArray: Array.isArray(ordersArray)
        })
      }

      setProducts(productsArray || [])
      setUsers(usersArray || [])
      setOrders(ordersArray || [])

    } catch (error) {
      console.error("Dashboard fetch error:", error)
      setError(error instanceof Error ? error.message : "Failed to load dashboard data")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  // Debug: Log orders when they change
  useEffect(() => {
    if (orders.length > 0) {
      console.log("Current orders state:", orders)
      console.log("First order structure:", orders[0])
      console.log("First order ID:", orders[0].id || orders[0]._id)
      console.log("First order all keys:", Object.keys(orders[0]))
    }
  }, [orders])

  /* ===================== CALCULATIONS ===================== */

  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order?.totalAmount || 0),
    0
  )

  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.orderDate || b.createdAt || '').getTime() -
        new Date(a.orderDate || a.createdAt || '').getTime()
    )
    .slice(0, 5)

  const productSalesMap: Record<string, { sales: number; revenue: number }> = {}

  orders.forEach(order => {
    order?.items?.forEach(item => {
      if (!productSalesMap[item.productName]) {
        productSalesMap[item.productName] = { sales: 0, revenue: 0 }
      }
      productSalesMap[item.productName].sales += item.quantity
      productSalesMap[item.productName].revenue +=
        item.quantity * item.price
    })
  })

  const topProducts = Object.entries(productSalesMap)
    .map(([name, data]) => ({
      name,
      sales: data.sales,
      revenue: `$${(data.revenue || 0).toLocaleString()}`,
    }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5)

  const getStatusColor = (status: string) => {
    if (!status) return "bg-gray-100 text-gray-800"
    
    const statusLower = status.toLowerCase()
    switch (statusLower) {
      case "completed":
      case "delivered":
        return "bg-green-100 text-green-800"
      case "processing":
      case "paid":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method?.toLowerCase()) {
      case 'paypal':
      case 'card':
      case 'credit':
        return <CreditCard className="h-4 w-4" />
      case 'cod':
      case 'cash':
        return <DollarSign className="h-4 w-4" />
      default:
        return <CreditCard className="h-4 w-4" />
    }
  }

  const getRevenueGrowth = () => {
    const currentMonth = new Date().getMonth()
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1
    const currentYear = new Date().getFullYear()
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear

    const currentMonthRevenue = orders
      .filter(order => {
        const orderDate = new Date(order.orderDate || order.createdAt || '')
        return orderDate.getMonth() === currentMonth && 
               orderDate.getFullYear() === currentYear
      })
      .reduce((sum, order) => sum + (order.totalAmount || 0), 0)

    const lastMonthRevenue = orders
      .filter(order => {
        const orderDate = new Date(order.orderDate || order.createdAt || '')
        return orderDate.getMonth() === lastMonth && 
               orderDate.getFullYear() === lastMonthYear
      })
      .reduce((sum, order) => sum + (order.totalAmount || 0), 0)

    if (lastMonthRevenue === 0) return { percentage: 100, isPositive: true }
    
    const growth = ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
    return { 
      percentage: Math.abs(Math.round(growth)), 
      isPositive: growth >= 0 
    }
  }

  const revenueGrowth = getRevenueGrowth()
  const activeUsers = users.filter(user => user?.status === 'active').length

  const getOrderId = (order: Order) => {
    // Try multiple possible ID fields
    return order.id || 
           order._id || 
           'N/A'
  }

  const formatOrderId = (order: Order) => {
    const id = getOrderId(order)
    return id.length > 10 ? `${id.substring(0, 10)}...` : id
  }

  const getCustomerName = (order: Order) => {
    if (order.shippingAddress) {
      return `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`
    }
    return "Unknown Customer"
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "Invalid Date"
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return "Invalid Date"
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    } catch (error) {
      return "Invalid Date"
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
        <p className="text-gray-600">Loading dashboard data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-6 p-4">
        <div className="flex flex-col items-center space-y-3">
          <AlertCircle className="h-12 w-12 text-red-500" />
          <div className="text-center">
            <div className="text-lg font-medium text-gray-900">Error Loading Dashboard</div>
            <div className="text-sm text-gray-600 mt-1 max-w-md">
              {error}
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => window.location.href = '/login'}
            className="px-4 py-2 bg-gold text-white rounded-md hover:bg-gold/90 transition-colors"
          >
            Go to Login
          </button>
          <button
            onClick={fetchDashboardData}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </button>
        </div>
      </div>
    )
  }

  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: Package,
      color: "bg-blue-500",
      description: "All available products",
      change: "+2 this month"
    },
    {
      title: "Total Users",
      value: users.length,
      icon: Users,
      color: "bg-green-500",
      description: `${activeUsers} active users`,
      change: "+5 this week"
    },
    {
      title: "Total Orders",
      value: orders.length,
      icon: ShoppingCart,
      color: "bg-purple-500",
      description: `${orders.filter(o => o?.status?.toLowerCase() === "completed").length} completed`,
      change: "+12% from last month"
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-gold",
      description: (
        <div className="flex items-center">
          {revenueGrowth.isPositive ? (
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span className={revenueGrowth.isPositive ? "text-green-500" : "text-red-500"}>
            {revenueGrowth.percentage}% {revenueGrowth.isPositive ? "growth" : "decline"}
          </span>
        </div>
      ),
      change: "Revenue this month"
    },
  ]

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening with your store.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar size={16} />
            <span>{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          <button
            onClick={fetchDashboardData}
            disabled={refreshing}
            className="flex items-center px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
                <div className="mt-2 text-xs text-gray-500">
                  {stat.description}
                </div>
                {stat.change && (
                  <div className="mt-2 text-xs text-blue-600">
                    {stat.change}
                  </div>
                )}
              </div>
              <div className={`p-3 rounded-full ${stat.color} shadow-sm`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                <p className="text-sm text-gray-500 mt-1">Latest 5 orders</p>
              </div>
              <span className="text-xs font-medium px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                {orders.length} total
              </span>
            </div>
          </div>
          <div className="p-6">
            {recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div 
                    key={order.id || order._id} 
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="bg-white p-2 rounded-lg border border-gray-200">
                          <ShoppingCart className="h-5 w-5 text-gray-700" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-semibold text-gray-900">
                            Order #{formatOrderId(order)}
                          </p>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                            {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : "Unknown"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <User className="h-3 w-3 text-gray-400" />
                          <p className="text-sm text-gray-500">
                            {getCustomerName(order)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3 text-gray-400" />
                            <p className="text-xs text-gray-400">
                              {formatDate(order.orderDate || order.createdAt || '')}
                            </p>
                          </div>
                          <div className="flex items-center space-x-1">
                            {getPaymentMethodIcon(order.paymentMethod)}
                            <p className="text-xs text-gray-400">
                              {order.paymentMethod ? order.paymentMethod.toUpperCase() : 'N/A'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        ${(order.totalAmount || 0).toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {order.items?.length || 0} item{order.items?.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="flex justify-center mb-4">
                  <div className="bg-gray-100 p-4 rounded-full">
                    <ShoppingCart className="h-10 w-10 text-gray-400" />
                  </div>
                </div>
                <p className="text-gray-500 font-medium">No orders yet</p>
                <p className="text-sm text-gray-400 mt-1">
                  Orders will appear here once customers start purchasing
                </p>
              </div>
            )}
            
            {orders.length > 0 && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => window.location.href = '/admin/orders'}
                  className="text-sm text-gold hover:text-gold/80 font-medium"
                >
                  View all orders →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
                <p className="text-sm text-gray-500 mt-1">Best selling items</p>
              </div>
              <span className="text-xs font-medium px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                {topProducts.length} products
              </span>
            </div>
          </div>
          <div className="p-6">
            {topProducts.length > 0 ? (
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        index === 0 ? 'bg-yellow-100 text-yellow-800' :
                        index === 1 ? 'bg-gray-100 text-gray-800' :
                        index === 2 ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        <span className="text-xs font-bold">#{index + 1}</span>
                      </div>
                      <div className="max-w-[200px]">
                        <p className="font-medium text-gray-900 truncate">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.sales} sales</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{product.revenue}</p>
                      <p className="text-xs text-gray-500">revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="flex justify-center mb-4">
                  <div className="bg-gray-100 p-4 rounded-full">
                    <Package className="h-10 w-10 text-gray-400" />
                  </div>
                </div>
                <p className="text-gray-500 font-medium">No sales data yet</p>
                <p className="text-sm text-gray-400 mt-1">
                  Top products will appear here when sales are made
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => window.location.href = '/admin/products'}
            className="group p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-gold hover:bg-gold/5 transition-all duration-300 flex flex-col items-center justify-center text-center"
          >
            <div className="mb-4 p-3 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
              <Package className="h-8 w-8 text-blue-600 group-hover:text-blue-700" />
            </div>
            <p className="font-semibold text-gray-900 group-hover:text-gold">Manage Products</p>
            <p className="text-sm text-gray-500 mt-2">
              Add, edit or remove products
            </p>
          </button>
          
          <button 
            onClick={() => window.location.href = '/admin/users'}
            className="group p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50/5 transition-all duration-300 flex flex-col items-center justify-center text-center"
          >
            <div className="mb-4 p-3 bg-green-50 rounded-full group-hover:bg-green-100 transition-colors">
              <Users className="h-8 w-8 text-green-600 group-hover:text-green-700" />
            </div>
            <p className="font-semibold text-gray-900 group-hover:text-green-600">Manage Users</p>
            <p className="text-sm text-gray-500 mt-2">
              View and manage all users
            </p>
          </button>
          
          <button 
            onClick={() => window.location.href = '/admin/orders'}
            className="group p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50/5 transition-all duration-300 flex flex-col items-center justify-center text-center"
          >
            <div className="mb-4 p-3 bg-purple-50 rounded-full group-hover:bg-purple-100 transition-colors">
              <Eye className="h-8 w-8 text-purple-600 group-hover:text-purple-700" />
            </div>
            <p className="font-semibold text-gray-900 group-hover:text-purple-600">View Orders</p>
            <p className="text-sm text-gray-500 mt-2">
              See all customer orders
            </p>
          </button>
        </div>
      </div>

      {/* Summary Section */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800">Total Products Value</p>
              <p className="text-2xl font-bold text-blue-900 mt-1">
                ${products.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString()}
              </p>
            </div>
            <Package className="h-10 w-10 text-blue-600 opacity-50" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800">Active Users</p>
              <p className="text-2xl font-bold text-green-900 mt-1">
                {activeUsers} / {users.length}
              </p>
              <p className="text-xs text-green-700 mt-1">
                {users.length > 0 ? Math.round((activeUsers / users.length) * 100) : 0}% active
              </p>
            </div>
            <Users className="h-10 w-10 text-green-600 opacity-50" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-800">Avg Order Value</p>
              <p className="text-2xl font-bold text-purple-900 mt-1">
                ${orders.length > 0 ? (totalRevenue / orders.length).toFixed(2) : '0.00'}
              </p>
              <p className="text-xs text-purple-700 mt-1">
                Across {orders.length} orders
              </p>
            </div>
            <DollarSign className="h-10 w-10 text-purple-600 opacity-50" />
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default AdminDashboard