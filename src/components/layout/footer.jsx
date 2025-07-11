export function Footer() {
  return (
    <footer className="h-40 bg-[#212121] flex justify-center items-center">
      <p className="text-center text-white font-medium">
        &copy; {new Date(Date.now()).getFullYear()} hoangkhadev
      </p>
    </footer>
  );
}
