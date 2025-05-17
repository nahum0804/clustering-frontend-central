const Input = ({ className = '', ...props }) => {
  return (
    <input
      {...props}
      className={`mx-5 border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6860ff] ${className}`}
    />
  );
};

export default Input;