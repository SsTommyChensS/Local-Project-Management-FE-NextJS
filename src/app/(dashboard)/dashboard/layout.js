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
    <html lang="en">
        <body>
            <DashboardNavbar/>
              <div className={style.main}>
                <div className={style.sidebar}>
                    <DashboardSidebar/>
                </div>
                <div className={style.content}>
                    {children}
                </div>
              </div>
            <Footer/>
        </body>
    </html>
  )
}