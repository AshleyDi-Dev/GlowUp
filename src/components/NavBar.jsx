import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './NavBar.module.css'

// ── Tab config ────────────────────────────────────────────────────

const TABS = [
  {
    label: 'Home',
    to:    '/home',
    icon:  (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M3 9.5L11 3l8 6.5V19a1 1 0 0 1-1 1H14v-5h-4v5H4a1 1 0 0 1-1-1V9.5Z"
          stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Analyze',
    to:    '/analyze',
    icon:  (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.4" />
        <line x1="11" y1="3" x2="11" y2="8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="11" y1="14" x2="11" y2="19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="3" y1="11" x2="8" y2="11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="14" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Profile',
    to:    '/profile',
    icon:  (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="11" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M4 19c0-3.866 3.134-7 7-7h.5c3.866 0 7 3.134 7 7"
          stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Style',
    to:    '/style',
    icon:  (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.4" />
        <rect x="12" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.4" />
        <rect x="3" y="12" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.4" />
        <rect x="12" y="12" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    label:      'Saved',
    to:         '/saved',
    comingSoon: true,
    icon:  (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M5 3h12a1 1 0 0 1 1 1v15l-7-4-7 4V4a1 1 0 0 1 1-1Z"
          stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
]

// Paths where the nav should not appear
const HIDE_ON = ['/onboarding', '/choose-path']

// ── Component ─────────────────────────────────────────────────────

export default function NavBar() {
  const { logout }  = useAuth()
  const location    = useLocation()
  const navigate    = useNavigate()

  if (HIDE_ON.includes(location.pathname)) return null

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <>
      {/* ── Desktop top bar ── */}
      <header className={styles.topBar}>
        <nav className={styles.topNav} aria-label="Main navigation">
          {TABS.map(({ label, to, icon, comingSoon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                [styles.topTab, isActive ? styles.topTabActive : ''].filter(Boolean).join(' ')
              }
            >
              {icon}
              <span className={styles.topTabLabel}>{label}</span>
              {comingSoon && <span className={styles.dot} aria-hidden="true" />}
            </NavLink>
          ))}
        </nav>

        <button type="button" className={styles.topLogout} onClick={handleLogout}>
          Log out
        </button>
      </header>

      {/* ── Mobile bottom bar ── */}
      <nav className={styles.bottomBar} aria-label="Main navigation">
        {TABS.map(({ label, to, icon, comingSoon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              [styles.bottomTab, isActive ? styles.bottomTabActive : ''].filter(Boolean).join(' ')
            }
          >
            <span className={styles.iconWrap}>
              {icon}
              {comingSoon && <span className={styles.dot} aria-hidden="true" />}
            </span>
            <span className={styles.bottomTabLabel}>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* ── Mobile logout (top-right corner) ── */}
      <button type="button" className={styles.mobileLogout} onClick={handleLogout}>
        Log out
      </button>
    </>
  )
}
