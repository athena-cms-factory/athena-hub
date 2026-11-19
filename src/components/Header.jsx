import React, { useEffect, useState } from 'react';

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

function Header({ siteSettings = {}, headerData = {}, data }) {
  const settings = Array.isArray(siteSettings) ? (siteSettings[0] || {}) : (siteSettings || {});
  const header = Array.isArray(headerData) ? (headerData[0] || {}) : (headerData || {});
  const siteName = settings.site_name || 'athena-hub';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Navigatie: enkel secties die effectief data hebben (zelfde filter als Section.jsx/Footer)
  const navItems = (data.section_order || ['hero', 'showcase', 'proces', 'diensten', 'contact'])
    .filter(s => s !== 'site_settings')
    .filter(s => Array.isArray(data[s]) && data[s].length > 0)
    .map(s => ({ id: s, label: SECTION_LABELS[s] || s.replace(/_/g, ' ') }));

  const rawLogo = header.site_logo_image || settings.site_logo_image || 'athena-icon.svg';
  const displayLogo = (rawLogo || '').startsWith('http') || (rawLogo || '').startsWith('/')
    ? rawLogo
    : `${import.meta.env.BASE_URL}images/${rawLogo}`.replace(/\/+/g, '/');

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id) => (e) => {
    if (e.shiftKey) return;
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[1000] px-6 flex items-center transition-all duration-500"
      style={{
        display: header.header_visible === false ? 'none' : 'flex',
        height: `${header.header_height || 80}px`,
        backgroundColor: scrolled
          ? 'rgba(7, 11, 26, 0.92)'
          : 'rgba(7, 11, 26, 0.55)',
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(10px)',
        borderBottom: scrolled
          ? '1px solid rgba(168, 216, 240, 0.25)'
          : '1px solid rgba(168, 216, 240, 0.12)',
        boxShadow: scrolled ? '0 12px 40px -20px rgba(0,0,0,.8)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-8">
        {/* Logo & Brand */}
        <a href="#hero" onClick={scrollToTop} className="flex items-center gap-3 group shrink-0">
          {header.header_show_logo !== false && (
            <span className="w-10 h-10 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center p-1.5 group-hover:scale-105 transition-transform">
              <img
                src={displayLogo}
                alt=""
                className="w-full h-full object-contain"
                data-dock-type="media"
                data-dock-bind="header.0.site_logo_image"
              />
            </span>
          )}
          {(header.header_show_title !== false || header.header_show_tagline !== false) && (
            <span className="flex flex-col">
              {header.header_show_title !== false && (
                <span
                  className="text-xl font-semibold tracking-tight text-white leading-none"
                  style={displayFont}
                  data-dock-type="text"
                  data-dock-bind="header.0.logo_text"
                >
                  {header.logo_text || settings.logo_text || siteName}
                </span>
              )}
              {header.header_show_tagline !== false && (
                <span className="text-[8px] uppercase tracking-[0.25em] text-[#a8d8f0] leading-none mt-1.5" style={monoFont}>
                  {settings.tagline}
                </span>
              )}
            </span>
          )}
        </a>

        {/* Navigatie (desktop) — data-gedreven uit section_order */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.filter(i => i.id !== 'hero').map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={scrollTo(item.id)}
              className="relative text-[11px] uppercase tracking-[0.18em] text-slate-300 hover:text-[#a8d8f0] transition-colors py-2 group"
              style={monoFont}
            >
              {item.label}
              <span className="absolute left-0 bottom-0 w-0 h-px bg-[#a8d8f0] group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </div>

        {/* CTA */}
        {header.header_show_button !== false && (
          <button
            onClick={scrollTo('diensten')}
            className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-accent text-white text-[11px] uppercase tracking-[0.12em] font-bold hover:bg-[#a8d8f0] hover:text-slate-950 transition-all duration-300 hover:shadow-[0_0_30px_-8px_rgba(168,216,240,.6)] active:scale-95 shrink-0"
            style={monoFont}
            data-dock-type="link"
            data-dock-bind="header.0.cta_label"
          >
            {header.cta_label || 'Start Nu'}
            <i className="fa-solid fa-arrow-right text-[9px] transition-transform group-hover:translate-x-1"></i>
          </button>
        )}
      </div>
    </nav>
  );
}

export default Header;