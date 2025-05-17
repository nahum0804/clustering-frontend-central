const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      {...props}
      className={`bg-[#6860ff] hover:bg-[#584de6] text-white font-medium px-4 py-2 rounded-2xl shadow transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
