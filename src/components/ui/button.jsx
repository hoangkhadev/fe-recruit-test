export function Button({
  onClick = null,
  type = "button",
  className = "",
  isPrimary = true,
  children,
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`h-[40px] text-sm rounded px-[20px] border border-primary font-medium transition-all duration-300 ${
        isPrimary
          ? "bg-primary text-white hover:opacity-90"
          : "bg-transparent text-primary hover:bg-primary hover:text-white"
      } ${className}`}
    >
      {children}
    </button>
  );
}
