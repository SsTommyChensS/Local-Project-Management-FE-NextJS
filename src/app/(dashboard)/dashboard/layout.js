import Footer from "@/components/Footer/Footer"
import DashboardNavbar from "@/components/Navbar/DashboardNavbar"
import DashboardSidebar from "@/components/Sidebar/DashboardSidebar"

export const metadata = {
  title: 'Dashboard',
  description: 'This is Dashboard Admin',
}

export default function AuthLayout({ children }) {
  return (
    <div className="dashboard__main min-w-max">
            <DashboardNavbar/>
              <div className="dashboard__content flex min-h-screen">
                <div className="dashboard__content__sidebar">
                    <DashboardSidebar/>
                </div>
                <div className="dashboard__content__body">
                    {children}
                </div>
              </div>
            <Footer/>
    </div>
  )
}