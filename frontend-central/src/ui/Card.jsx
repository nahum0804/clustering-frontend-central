const Card = ({ children, className = '' }) => {
  return (
    <div className={`grid bg-[#121212] text-white rounded-2xl shadow-md p-6 w-md w-md ${className}`}>
      {children}
    </div>
  );
};

export default Card;