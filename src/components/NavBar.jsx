import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const tabs = [
  { label: 'Home',    to: '/home' },
  { label: 'Analyze', to: '/analyze' },
  { label: 'Profile', to: '/profile' },
  { label: 'Style',   to: '/style' },
  { label: 'Saved',   to: '/saved' },
]

const navStyle = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  borderTop: '1px solid #e5e5e5',
  background: '#fff',
  height: '60px',
  zIndex: 100,
}

const tabStyle = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '13px',
  color: '#888',
  textDecoration: 'none',
}

const activeStyle = {
  ...tabStyle,
  color: '#000',
  fontWeight: '600',
}

export default function NavBar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <nav style={navStyle}>
      {tabs.map(({ label, to }) => (
        <NavLink
          key={to}
          to={to}
          style={({ isActive }) => isActive ? activeStyle : tabStyle}
        >
          {label}
        </NavLink>
      ))}
      {user && (
        <button onClick={handleLogout} style={tabStyle}>
          Log out
        </button>
      )}
    </nav>
  )
}
