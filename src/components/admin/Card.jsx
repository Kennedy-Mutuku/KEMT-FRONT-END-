const Card = ({ title, value, children }) => {
  return (
    <div className="admin-card">
      {title && <h3>{title}</h3>}
      {value && <p className="admin-card-value">{value}</p>}
      {children}
    </div>
  );
};

export default Card;
