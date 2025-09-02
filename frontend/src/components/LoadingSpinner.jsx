const LoadingSpinner = () => {
 return (
   <div className="min-h-screen bg-gray-950 relative overflow-hidden flex items-center justify-center">
     {/* Background Elements */}
     <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950">
       <div 
         className="absolute inset-0 opacity-30"
         style={{
           background: `
             radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3), transparent 50%),
             radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15), transparent 50%),
             radial-gradient(circle at 40% 40%, rgba(120, 219, 226, 0.15), transparent 50%)
           `
         }}
       />
       <div 
         className="absolute inset-0 opacity-20"
         style={{
           backgroundImage: `
             linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
             linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
           `,
           backgroundSize: '50px 50px'
         }}
       />
     </div>

     {/* Loading Spinner */}
     <div className="relative z-10">
       <div 
         className="w-16 h-16 border-4 border-t-4 border-t-indigo-500 border-purple-300 rounded-full"
         style={{
           animation: 'spin 1s linear infinite'
         }}
       />
     </div>

     <style jsx>{`
       @keyframes spin {
         0% { transform: rotate(0deg); }
         100% { transform: rotate(360deg); }
       }
     `}</style>
   </div>
 );
};

export default LoadingSpinner;