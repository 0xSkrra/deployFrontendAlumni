import Navbar from "./navbar"

interface baseLayoutProps{
  children: React.ReactNode | React.ReactNode[]
}

const Layout = ({children}: baseLayoutProps) => {

  return (   
  <div className="flex">
    <div className="h-screen sticky top-0">
      <Navbar />
    </div>
    <main className="h-screen w-screen">
      {children}
    </main>
  </div>
)
}




  

export default Layout