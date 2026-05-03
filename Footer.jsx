const Footer = () => (
  <footer className="mt-14 border-t border-red-100 bg-white py-8 text-center dark:border-slate-800 dark:bg-slate-950">
    <p className="text-sm text-slate-600 dark:text-slate-300">
      Blood Donor Finder - Save lives together.
    </p>
    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
      Developed by Devender Bidikar
    </p>
    <div className="mt-2 flex justify-center gap-5 text-sm text-primary">
      <a href="mailto:support@bloodfinder.com">Email</a>
      <a href="tel:+911234567890">Call</a>
      <a href="https://devenderbidikar.dev" target="_blank" rel="noreferrer">Website</a>
    </div>
  </footer>
);

export default Footer;
