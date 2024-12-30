const Footer = () => {
  return (
    <footer className=" py-10">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Logo & About */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold">Counselling-App</h1>
            <p className="text-sm mt-2 max-w-sm">
              Your trusted platform for connecting with medical specialists. Simplify your healthcare journey with us.
            </p>
          </div>

          {/* Newsletter Subscription */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-center md:text-left">Subscribe to Our Newsletter</h2>
            <form className="flex flex-col sm:flex-row items-center mt-4 gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-auto px-4 py-2  rounded-full text-gray-900 focus:outline"
              />
              <button
                type="submit"
                className="bg-blue-500 px-6 py-2 rounded-full text-white hover:bg-blue-600 transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Quick Links */}
          <nav className="flex-1">
            <h2 className="text-lg font-semibold text-center md:text-left">Quick Links</h2>
            <ul className="mt-4 flex flex-col gap-2 text-center md:text-left">
              <li>
                <a href="#about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:underline">
                  Services
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:underline">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-gray-700"></div>

        {/* Bottom Section */}
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
          {/* Social Media Links */}
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500"
            >
              <i className="fab fa-facebook-f text-xl"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500"
            >
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:text-pink-500"
            >
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700"
            >
              <i className="fab fa-linkedin-in text-xl"></i>
            </a>
          </div>

          {/* Copyright */}
          <p className="mt-4 md:mt-0 text-center text-sm">
            © {new Date().getFullYear()} counselling-Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
