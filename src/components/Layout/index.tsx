import Navbar from "./navbar"

interface baseLayoutProps {
  children: React.ReactNode | React.ReactNode[]
}

const Layout = ({ children }: baseLayoutProps) => {
  return (
    <div className="flex ">
      <div className="h-screen fixed top-0 flex flex-col backgroundcolorMain ">
        <Navbar />
      </div>
      <main className="h-screen md:ml-96 w-full">{children}</main>
    </div>
  )
}

export default Layout
