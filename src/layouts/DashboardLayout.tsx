import type { ReactNode } from 'react'
import { useState, memo } from 'react'
import Sidebar from '@components/Sidebar'
import Header from '@components/Header'
import { useScreenSize } from '@hooks/useScreenSize'

interface DashboardLayoutProps {
  children: ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { isLaptop, isTablet } = useScreenSize()

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} isTablet={isLaptop} />
      <div className="dashboard-layout__main">
        <Header onMenuClick={toggleSidebar} isTablet={isTablet} showHamburger={isLaptop} />
        <main className="dashboard-layout__content">{children}</main>
      </div>
    </div>
  )
}

export default memo(DashboardLayout)

