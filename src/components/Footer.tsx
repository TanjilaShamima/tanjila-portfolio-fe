const Footer = () => (
  <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white py-8 text-center mt-16">
    <div className="container mx-auto px-4">
      <p className="font-semibold">
        © {new Date().getFullYear()} Tanjila Akter Shamima. All rights reserved.
      </p>
      <p className="mt-2 text-sm">Made with ❤️ using Next.js</p>
    </div>
  </footer>
);

export default Footer;
