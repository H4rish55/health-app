const Input = ({ icon: Icon, className = "", ...props }) => {
  return (
    <div className="space-y-2">
      <div className="relative">
        {Icon && (
          <Icon
            className="w-5 h-5 text-indigo-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
          />
        )}
        <input
          {...props}
          className={`w-full px-4 py-3 ${Icon ? "pl-12" : ""}
            bg-white/5 border border-white/10 rounded-xl
            text-white placeholder-gray-500 outline-none text-lg
            transition-all duration-300 transform
            focus:bg-white/8 focus:border-indigo-500
            focus:shadow-lg focus:shadow-indigo-500/10 focus:-translate-y-0.5
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}`}
        />
      </div>
    </div>
  );
};

export default Input;