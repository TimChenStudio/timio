import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              Your Name
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              首頁
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              關於我
            </Link>
            <Link
              href="/projects"
              className="text-gray-600 hover:text-gray-900"
            >
              專案
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-gray-900">
              部落格
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
