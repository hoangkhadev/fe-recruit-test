export function BoxIcon({ children, className = "", onClick = null }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative p-[6px] rounded-full hover:bg-neutral-100 text-neutral-600 transition duration-200 ${className} `}
    >
      {children}
    </button>
  );
}
