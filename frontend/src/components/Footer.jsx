const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-black py-10 sm:py-12 px-4 sm:px-6 lg:px-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-pitchsap-purple to-pitchsap-violet bg-clip-text text-transparent mb-3 sm:mb-4">
            Pitchsap
          </h3>
          <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6">
            Empowering founders to validate ideas before building products.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
            <a href="#" className="text-gray-400 hover:text-pitchsap-purple transition-colors">About</a>
            <a href="#" className="text-gray-400 hover:text-pitchsap-purple transition-colors">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-pitchsap-purple transition-colors">Terms</a>
            <a href="#" className="text-gray-400 hover:text-pitchsap-purple transition-colors">Contact</a>
          </div>
          <p className="text-gray-500 text-xs sm:text-sm">
            © 2026 Pitchsap. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;