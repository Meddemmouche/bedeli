export default function Footer() {
  return (
    <footer className="w-full py-4 border-t border-gray-200 text-center text-sm text-gray-500">
      &copy; {new Date().getFullYear()} Beddeli. All rights reserved.
    </footer>
  );
}