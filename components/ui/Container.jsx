export default function Container({ children, className = "" }) {
  return (
    <div className={`container-yfx ${className}`}>
      {children}
    </div>
  );
}
