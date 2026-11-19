import React from 'react';

// Labels voor de navigatie (data-gedreven: volgt section_order uit de sheet)
const SECTION_LABELS = {
  hero: 'Home',
  intro: 'Over ons',
  voordelen: 'Voordelen',
  showcase: 'Showcase',
  proces: 'Proces',
  diensten: 'Diensten',
  contact: 'Contact',
  innovatie: 'Innovatie',
  basisgegevens: 'Home',
};

const Footer = ({ siteSettings = {}, footerData = {}, data }) => {
  const settings = Array.isArray(siteSettings) ? (siteSettings[0] || {}) : (siteSettings || {});
  const footer = Array.isArray(footerData) ? (footerData[0] || {}) : (footerData || {});
  const siteName = settings.site_name || 'Athena Hub';

  // Navigatie: enkel secties die effectief data hebben (zelfde filter als Section.jsx)
  const navItems = (data.section_order || ['hero', 'showcase', 'proces', 'diensten', 'contact'])
    .filter(s => s !== 'site_settings')
    .filter(s => Array.isArray(data[s]) && data[s].length > 0)
    .map(s => ({ id: s, label: SECTION_LABELS[s] || s.replace(/_/g, ' ') }));

  const socials = [
    { icon: 'fa-facebook-f', url: footer.facebook_url, label: 'Facebook' },
    { icon: 'fa-linkedin-in', url: footer.linkedin_url, label: 'LinkedIn' },
    { icon: 'fa-instagram', url: footer.instagram_url, label: 'Instagram' },
  ].filter(s => s.url && s.url !== '#' && s.url !== '');

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-primary text-white overflow-hidden relative" data-dock-section="footer">
      {/* Accent lijn bovenaan */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-accent to-transparent opacity-40"></div>

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Merk */}
          <div className="lg:col-span-5 space-y-6">
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="inline-flex items-center gap-3 group">
              <span className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                <img
                  src={`${import.meta.env.BASE_URL}images/logo-athena-owl-tsnpbg-1770371802255.webp`}
                  alt=""
                  className="w-full h-full object-contain"
                  data-dock-type="media"
                  data-dock-bind="header.0.site_logo_image"
                />
              </span>
              <span className="text-2xl font-black tracking-tighter" data-dock-type="text" data-dock-bind="site_settings.0.site_name">
                {siteName}
              </span>
            </a>
            <p className="text-slate-300 leading-relaxed font-light max-w-sm" data-dock-type="text" data-dock-bind="footer.0.tagline">
              {footer.tagline || settings.tagline}
            </p>
            {socials.length > 0 && (
              <div className="flex gap-3">
                {socials.map(s => (
                  <a
                    key={s.icon}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-slate-300 hover:bg-accent hover:border-accent hover:text-white transition-all duration-300"
                  >
                    <i className={`fa-brands ${s.icon} text-sm`}></i>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigatie */}
          <nav className="lg:col-span-3" aria-label="Footer navigatie">
            <h4 className="text-xs font-black uppercase tracking-widest text-accent mb-6">Navigatie</h4>
            <ul className="space-y-3 text-sm font-medium">
              {navItems.map(item => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-slate-300 hover:text-white transition-colors flex items-center gap-3 group"
                  >
                    <span className="w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-accent mb-6">Contact</h4>
            <ul className="space-y-5 text-sm">
              {footer.email && (
                <li className="flex items-start gap-4">
                  <i className="fa-solid fa-envelope text-accent mt-1 w-4"></i>
                  <a
                    href={`mailto:${footer.email}`}
                    className="text-slate-200 hover:text-white transition-colors break-all"
                    data-dock-type="text"
                    data-dock-bind="footer.0.email"
                  >
                    {footer.email}
                  </a>
                </li>
              )}
              {footer.telefoon && (
                <li className="flex items-start gap-4">
                  <i className="fa-solid fa-phone text-accent mt-1 w-4"></i>
                  <a
                    href={`tel:${footer.telefoon.replace(/[^+\d]/g, '')}`}
                    className="text-slate-200 hover:text-white transition-colors"
                    data-dock-type="text"
                    data-dock-bind="footer.0.telefoon"
                  >
                    {footer.telefoon}
                  </a>
                </li>
              )}
              {footer.adres && (
                <li className="flex items-start gap-4">
                  <i className="fa-solid fa-location-dot text-accent mt-1 w-4"></i>
                  <span className="text-slate-300" data-dock-type="text" data-dock-bind="footer.0.adres">
                    {footer.adres}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 text-center md:text-left" data-dock-type="text" data-dock-bind="footer.0.footer_text">
            {footer.footer_text || `© ${new Date().getFullYear()} ${siteName}. All Rights Reserved.`}
          </p>
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <img
                src={`${import.meta.env.BASE_URL}athena-icon.svg`}
                className="h-5 opacity-50"
                alt=""
              />
              Built with Athena CMS
            </span>
            <button
              onClick={scrollToTop}
              aria-label="Terug naar boven"
              className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-slate-300 hover:bg-accent hover:border-accent hover:text-white transition-all duration-300"
            >
              <i className="fa-solid fa-arrow-up text-xs"></i>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;