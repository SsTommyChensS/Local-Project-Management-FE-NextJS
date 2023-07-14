import Footer from "@/components/Footer/Footer"
import DashboardNavbar from "@/components/Navbar/DashboardNavbar"
import DashboardSidebar from "@/components/Sidebar/DashboardSidebar"

import style from './maindashboard.module.css'

export const metadata = {
  title: 'Dashboard',
  description: 'This is Dashboard Admin',
}

export default function AuthLayout({ children }) {
  return (
    <div className="dashboard__main min-w-max">
            <DashboardNavbar/>
              <div className="dashboard__content flex min-h-screen">
                <div className={style.sidebar}>
                    <DashboardSidebar/>
                </div>
                <div className={style.content}>
                    {children}
                </div>
              </div>
            <Footer/>
    </div>
  )
}