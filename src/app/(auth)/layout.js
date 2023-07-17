import Footer from "@/components/Footer/Footer"
import DefaultNavbar from "@/components/Navbar/DefaultNavbar"

export const metadata = {
  title: 'Local Project Management',
  description: 'This is Local Project Management',
}

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
        <body>
            <div className="homepage-layout-section min-w-min overflow-hidden">
              <DefaultNavbar/>
                {children}
              <Footer/>   
            </div>
        </body>
    </html>
  )
}