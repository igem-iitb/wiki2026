import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { dryLabNav } from '../pages/drylab/drylabPages';

type SubnavItem = {
  label: string;
  href: string;
  /** Section not built yet: render as a non-navigating, muted item. */
  disabled?: boolean;
  /** Nested sub-tabs, shown in a flyout when the item is hovered or focused. */
  children?: { label: string; href: string }[];
};

type NavItem = {
  label: string;
  href: string;
  subnav?: SubnavItem[];
};

const navigation: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Project',
    href: '/project',
    subnav: [
      { label: 'Description', href: '/project/description' },
      { label: 'Engineering', href: '/project/engineering' },
      { label: 'Design', href: '#', disabled: true },
      { label: 'Contribution', href: '#', disabled: true },
      { label: 'Cooling Measurement', href: '#', disabled: true },
      { label: 'News Headlines', href: '/project/news' },
      { label: 'Future Plans', href: '#', disabled: true },
    ],
  },
  {
    label: 'WetLab',
    href: '/wet-lab',
    subnav: [
      { label: 'Protocol', href: '/wet-lab/protocols' },
      { label: 'Notebook', href: '/wet-lab/notebook' },
      { label: 'Parts', href: '/wet-lab/parts' },
      { label: 'Safety', href: '/wet-lab/safety' },
      { label: 'Result', href: '#', disabled: true },
      { label: 'DBTL', href: '#', disabled: true },
    ],
  },
  {
    label: 'DryLab',
    href: '/dry-lab',
    subnav: dryLabNav.map((t) => ({
      label: t.label,
      href: t.path,
      children: t.children?.map((c) => ({ label: c.label, href: c.path })),
    })),
  },
  {
    label: 'HumanPractices',
    href: '/human-practices',
    subnav: [
      { label: 'Integrated Human Practices', href: '/human-practices/ihp' },
      { label: 'Education', href: '/education' },
      { label: 'Sustainability', href: '/sustainability' },
      { label: 'Entrepreneurship', href: '/human-practices/entrepreneurship' },
    ],
  },
  {
    label: 'Team',
    href: '/team',
    subnav: [
      { label: 'Know Your Team', href: '/team/kyt' },
      { label: 'Attributions', href: '/team/attribution' },
    ],
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileOpenTab, setMobileOpenTab] = useState<string | null>(null);
  const { pathname } = useLocation();
  const isIhpPage = pathname === '/human-practices/ihp';

  return (
    <header
      className={`${isIhpPage ? 'relative' : 'max-md:relative md:sticky md:top-0'} ${isIhpPage ? 'z-[1001]' : 'z-[999]'} w-full border-b border-black/10 bg-zinc-200 shadow-sm`}
    >
      <div className="mx-auto max-w-[1440px] w-full flex h-[72px] items-center justify-between px-8 sm:px-12 lg:px-16">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center mr-12"
          style={{ marginLeft: '-24px' }}
        >
          <img
            src="/igem-iitb-logo.png"
            alt="iGEM IITB Logo"
            width={68}
            height={68}
            className="object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:block"
          aria-label="Primary"
        >
          <ul className="flex items-center gap-5 xl:gap-7">
            {navigation.map((item) => (
              <li key={item.href} className="group relative">
                {item.subnav?.length ? (
                  <span className="flex items-center gap-1 rounded-md px-3 py-1.5 text-lg text-zinc-900 cursor-default montserrat-semibold select-none">
                    <span>{item.label}</span>
                    <span className="text-xs">▾</span>
                  </span>
                ) : (
                  <Link
                    to={item.href}
                    className="flex items-center gap-1 rounded-md px-3 py-1.5 text-lg text-zinc-900 transition hover:bg-zinc-300/60 hover:text-zinc-950 montserrat-semibold"
                  >
                    <span>{item.label}</span>
                  </Link>
                )}

                {item.subnav?.length ? (
                  <div className="invisible absolute left-1/2 top-full z-20 -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="min-w-72 rounded-xl border border-black/10 bg-white p-2 shadow-lg">
                      <ul className="space-y-1">
                        {item.subnav.map((subItem) => (
                          <li key={subItem.label}>
                            {subItem.disabled ? (
                              <span
                                aria-disabled="true"
                                title="Coming soon"
                                className="block rounded-lg py-2.5 text-base text-zinc-400 cursor-not-allowed select-none montserrat-semibold"
                                style={{ paddingLeft: '24px', paddingRight: '24px' }}
                              >
                                {subItem.label}
                              </span>
                            ) : subItem.children?.length ? (
                              <div className="group/sub relative">
                                <Link
                                  to={subItem.href}
                                  className="flex items-center justify-between rounded-lg py-2.5 text-base text-zinc-800 transition-all duration-200 hover:bg-zinc-50 hover:text-indigo-600 group-hover/sub:bg-zinc-50 group-hover/sub:text-indigo-600 montserrat-semibold"
                                  style={{ paddingLeft: '24px', paddingRight: '16px' }}
                                >
                                  <span>{subItem.label}</span>
                                  <span aria-hidden="true" className="ml-4 text-xs">▸</span>
                                </Link>
                                <div className="invisible absolute left-full top-0 z-30 pl-2 opacity-0 transition group-hover/sub:visible group-hover/sub:opacity-100 group-focus-within/sub:visible group-focus-within/sub:opacity-100">
                                  <ul className="min-w-60 space-y-1 rounded-xl border border-black/10 bg-white p-2 shadow-lg">
                                    {subItem.children.map((c) => (
                                      <li key={c.href}>
                                        <Link
                                          to={c.href}
                                          className="block rounded-lg py-2 text-base text-zinc-800 transition-all duration-200 hover:bg-zinc-50 hover:text-indigo-600 hover:translate-x-1 montserrat-semibold"
                                          style={{ paddingLeft: '20px', paddingRight: '20px' }}
                                        >
                                          {c.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            ) : (
                              <Link
                                to={subItem.href}
                                className="block rounded-lg py-2.5 text-base text-zinc-800 transition-all duration-200 hover:bg-zinc-50 hover:text-indigo-600 hover:translate-x-1 active:scale-[0.98] active:bg-zinc-100 montserrat-semibold"
                                style={{ paddingLeft: '24px', paddingRight: '24px' }}
                              >
                                {subItem.label}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          className="justify-self-end rounded-md p-2 text-zinc-900 hover:bg-zinc-300/50 lg:hidden"
          style={{ marginRight: '-24px' }}
        >
          <span className="sr-only">Open Menu</span>
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                mobileOpen
                  ? 'M6 18L18 6M6 6l12 12'
                  : 'M4 6h16M4 12h16M4 18h16'
              }
            />
          </svg>
        </button>

      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div id="mobile-menu" className="absolute top-full left-0 right-0 border-t border-black/5 bg-zinc-50 lg:hidden w-full transition-all duration-200 shadow-lg z-[999]">
          <nav className="px-8 py-4">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.href} className="border-b border-zinc-200 last:border-0 pb-2 last:pb-0">
                  <div className="flex items-center justify-between w-full">
                    {item.subnav?.length ? (
                      <button
                        onClick={() => setMobileOpenTab(mobileOpenTab === item.label ? null : item.label)}
                        className="w-full text-left flex items-center justify-between py-2 text-lg font-semibold text-zinc-800 hover:text-indigo-600 montserrat-semibold"
                      >
                        <span>{item.label}</span>
                        <span className="text-zinc-500 text-lg">
                          {mobileOpenTab === item.label ? '▴' : '▾'}
                        </span>
                      </button>
                    ) : (
                      <Link
                        to={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-2 text-lg font-semibold text-zinc-800 hover:text-indigo-600 montserrat-semibold"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                  {item.subnav?.length && mobileOpenTab === item.label ? (
                    <ul className="pl-4 mt-1 space-y-1 bg-white/60 rounded-lg p-2 border border-black/5">
                      {item.subnav.map((subItem) => (
                        <li key={subItem.label}>
                          {subItem.disabled ? (
                            <span
                              aria-disabled="true"
                              className="block py-2 text-base text-zinc-400 cursor-not-allowed select-none pl-3 border-l border-zinc-200 montserrat-semibold"
                            >
                              {subItem.label}
                            </span>
                          ) : (
                            <>
                              <Link
                                to={subItem.href}
                                onClick={() => setMobileOpen(false)}
                                className="block py-2 text-base text-zinc-600 hover:text-indigo-600 pl-3 border-l border-zinc-300 hover:border-indigo-500 transition-all duration-150 montserrat-semibold"
                              >
                                {subItem.label}
                              </Link>
                              {subItem.children?.length ? (
                                <ul className="ml-3 border-l border-zinc-200">
                                  {subItem.children.map((c) => (
                                    <li key={c.href}>
                                      <Link
                                        to={c.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="block py-1.5 pl-4 text-sm text-zinc-500 hover:text-indigo-600 montserrat-semibold"
                                      >
                                        {c.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              ) : null}
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
