import React from "react"
import { ChevronRight,LogOut ,User, Bookmark, CreditCard } from "lucide-react"
import './_sidebar.scss'
import { Button } from "@components/ui"
import { useNavigate } from "react-router-dom"

export default function AccountSidebar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const navigate = useNavigate()

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="sidebar-trigger" onClick={() => setIsOpen(!isOpen)}>
        <span className="sr-only">Toggle Sidebar</span>
        <ChevronRight />
      </button>
      <div className="sidebar-content">
        <header className="sidebar-header">
          <h2>Account Settings</h2>
        </header>
        <nav className="sidebar-nav">
          <div className="nav-section">
            <h3 className="nav-section-title">Personal Info</h3>
            <ul>
              <li>
                <a onClick={()=> navigate('/profile')}>
                  <User />
                  <span>Edit Account Info</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="nav-section">
            <h3 className="nav-section-title">General</h3>
            <ul>
              <li>
                <a onClick={()=> navigate('/profile/bookmarks')}>
                  <Bookmark />
                  <span>Bookmarks</span>
                  <ChevronRight className="chevron" />
                </a>
              </li>
              <li>
                <a onClick={()=> navigate('/profile/subscription')}>
                  <CreditCard />
                  <span>My Subscription</span>
                  <ChevronRight className="chevron" />
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <footer className="sidebar-footer">
          
            
            <Button className="sign-out-button"> <LogOut/>Sign Out</Button>
          
        </footer>
      </div>
    </div>
  )
}