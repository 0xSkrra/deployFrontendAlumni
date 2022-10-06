import Navbar from "./navbar"

interface baseLayoutProps{
  children: React.ReactNode | React.ReactNode[]
}

const Layout = ({children}: baseLayoutProps) => {

  return (   
  <div className="flex flex-row">
    <Navbar />
    <div className="flex row max-w-[75%] mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      {children}
    </div>
  </div>
)
}




  

export default Layout