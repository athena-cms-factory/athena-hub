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

const displayFont = { fontFamily: 'Fraunces, Georgia, serif' };
const monoFont = { fontFamily: '"Space Mono", ui-monospace, monospace' };

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

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className="relative overflow-hidden text-slate-200"
      data-dock-section="footer"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(7,11,26,.86) 0%, rgba(9,14,34,.94) 45%, #050814 100%), url(${import.meta.env.BASE_URL}images/footer-blueprint.webp)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
      }}
    >
      {/* Gloeiende accent-lijn bovenaan */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-70"></div>

      {/* Groot watermerk */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-2 select-none text-[16vw] leading-none font-black tracking-tighter text-white/[0.035]"
        style={displayFont}
      >
        ATHENA
      </span>

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-8">

        {/* --- CTA-bloc --- */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 pb-14 border-b border-white/10">
          <div className="max-w-3xl">
            <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-300 mb-6 flex items-center gap-3" style={monoFont}>
              <span className="inline-block w-8 h-px bg-cyan-300/70"></span>
                04 / Samen bouwen
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] text-white" style={displayFont}>
              Uw idee.<br />
              <em className="text-amber-300 not-italic">Onze bouwstenen.</em>
            </h2>
            <p className="mt-6 text-base md:text-lg text-slate-400 max-w-xl leading-relaxed">
              Van een Google Sheet tot een live site. Vertel ons wat u voor ogen heeft — wij zetten het om in iets dat werkt.
            </p>
          </div>
          <a
            href="#contact"
            onClick={scrollTo('contact')}
            className="group inline-flex items-center gap-4 self-start lg:self-auto px-8 py-4 rounded-full bg-cyan-300 text-slate-950 font-bold text-sm transition-all duration-300 hover:bg-amber-300 hover:shadow-[0_0_40px_-8px_rgba(253,224,71,.6)]"
          >
            Start uw project
            <i className="fa-solid fa-arrow-up-right-from-square text-xs transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"></i>
          </a>
        </div>

        {/* --- Kolommen --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 py-14">

          {/* Merk */}
          <div className="lg:col-span-5 space-y-6">
            <a href="#hero" onClick={scrollTo('hero')} className="inline-flex items-center gap-3 group">
              <span className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                <img
                  src={`${import.meta.env.BASE_URL}images/logo-athena-owl-tsnpbg-1770371802255.webp`}
                  alt=""
                  className="w-full h-full object-contain"
                  data-dock-type="media"
                  data-dock-bind="header.0.site_logo_image"
                />
              </span>
              <span className="text-2xl font-black tracking-tight text-white" data-dock-type="text" data-dock-bind="site_settings.0.site_name">
                {siteName}
              </span>
            </a>
            <p className="text-slate-400 leading-relaxed font-light max-w-sm" data-dock-type="text" data-dock-bind="footer.0.tagline">
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
                    className="w-10 h-10 rounded-lg border border-white/15 flex items-center justify-center text-slate-400 hover:bg-cyan-300 hover:border-cyan-300 hover:text-slate-950 transition-all duration-300"
                  >
                    <i className={`fa-brands ${s.icon} text-sm`}></i>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigatie */}
          <nav className="lg:col-span-3" aria-label="Footer navigatie">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-cyan-300 mb-7" style={monoFont}>
              01 / Navigator
            </h3>
            <ul className="space-y-3 text-sm font-medium">
              {navItems.map(item => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={scrollTo(item.id)}
                    className="text-slate-300 hover:text-cyan-200 transition-colors flex items-center gap-3 group"
                  >
                    <span className="w-1 h-1 bg-amber-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-cyan-300 mb-7" style={monoFont}>
              02 / Contact
            </h3>
            <ul className="space-y-5 text-sm">
              {footer.email && (
                <li className="flex items-start gap-4">
                  <i className="fa-solid fa-envelope text-cyan-300 mt-1 w-4"></i>
                  <a
                    href={`mailto:${footer.email}`}
                    className="text-slate-200 hover:text-cyan-200 transition-colors break-all"
                    data-dock-type="text"
                    data-dock-bind="footer.0.email"
                  >
                    {footer.email}
                  </a>
                </li>
              )}
              {footer.telefoon && (
                <li className="flex items-start gap-4">
                  <i className="fa-solid fa-phone text-cyan-300 mt-1 w-4"></i>
                  <a
                    href={`tel:${footer.telefoon.replace(/[^+\d]/g, '')}`}
                    className="text-slate-200 hover:text-cyan-200 transition-colors"
                    data-dock-type="text"
                    data-dock-bind="footer.0.telefoon"
                  >
                    {footer.telefoon}
                  </a>
                </li>
              )}
              {footer.adres && (
                <li className="flex items-start gap-4">
                  <i className="fa-solid fa-location-dot text-cyan-300 mt-1 w-4"></i>
                  <span className="text-slate-300" data-dock-type="text" data-dock-bind="footer.0.adres">
                    {footer.adres}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* --- Bottom bar --- */}
        <div className="pt-7 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 text-center md:text-left" style={monoFont} data-dock-type="text" data-dock-bind="footer.0.footer_text">
            {footer.footer_text || `© ${new Date().getFullYear()} ${siteName}. All Rights Reserved.`}
          </p>
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-slate-500" style={monoFont}>
              <img
                src={`${import.meta.env.BASE_URL}athena-icon.svg`}
                className="h-5 opacity-40"
                alt=""
              />
              Built with Athena CMS
            </span>
            <button
              onClick={scrollToTop}
              aria-label="Terug naar boven"
              className="w-9 h-9 rounded-lg border border-white/15 flex items-center justify-center text-slate-400 hover:bg-cyan-300 hover:border-cyan-300 hover:text-slate-950 transition-all duration-300"
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