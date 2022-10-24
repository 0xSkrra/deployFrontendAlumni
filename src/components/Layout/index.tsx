import Navbar from "./navbar"

interface baseLayoutProps{
  children: React.ReactNode | React.ReactNode[]
}

const Layout = ({children}: baseLayoutProps) => {

  return (   
  <div className="flex row backgroundcolor3">
    <div className="h-screen fixed top-0">
      <Navbar />
    </div>
    <div className="lg:w-96 md:min-w-65 h-screen md:mr-24 lg:mr-10 bg-white"></div>
    <main className="h-screen w-screen">
      {children}
    </main>
  </div>
)
}




  

export default Layout