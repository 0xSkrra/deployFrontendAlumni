import { useCallback } from "react"
import { NavLink } from "react-router-dom"
import { defaultUserProfile } from "../../common/interface/UserProfile"
import { useUserStore } from "../../common/util/Store/userStore"
import keycloak from "../../keycloak"

const Navbar = () => {
  const userState = useUserStore((state) => state)
  const logout = useCallback(async () => {
    keycloak?.logout()
    userState.setUser(defaultUserProfile)
  }, [userState])

  if (!keycloak.authenticated) return <></>
  return (
     
    <aside className="lg:w-96 flex-col md:min-w-65 hidden md:flex h-screen  py-1 bg-white sm:border-t md:border-r">
     
     <g id="tight-bounds" transform="matrix(1,0,0,1,122.24000000000001,160.80589347417234)"><svg viewBox="0 0 395.52 78.38821305165533" height="58.38821305165533" width="395.52"><g><svg viewBox="0 0 531.4095592673476 105.32020062079063" height="78.38821305165533" width="395.52"><g transform="matrix(1,0,0,1,0,14.555830910688144)"><svg viewBox="0 0 395.5199999999999 76.20853879941434" height="76.20853879941434" width="395.5199999999999"><g><svg viewBox="0 0 395.5199999999999 76.20853879941434" height="76.20853879941434" width="395.5199999999999"><g><svg viewBox="0 0 395.5199999999999 76.20853879941434" height="76.20853879941434" width="395.5199999999999"><g transform="matrix(1,0,0,1,0,0)"><svg width="395.5199999999999" viewBox="0.30000001192092896 -32.400001525878906 170.739990234375 32.900001525878906" height="76.20853879941434" data-palette-color="#000000"><path d="M20.45-32.25L29.9 0 21.65 0 20.8-4.65 20.35-6.5 14.55-6.6 9.55-6.45 9.15-5.15 8.25 0 0.3 0 10.7-32.25 20.45-32.25ZM15.1-12.5L18.8-12.6 15.65-24.85 15.15-24.85 11.4-12.6 15.1-12.5ZM52.05-6.65L52.55-6.05 52 0 33.85 0 34.3-9.55 33.85-32.25 42.1-32.25 41.65-10.35 41.8-6.65 52.05-6.65ZM81.44-32.25L81.15-15.9 81.09-11.25Q81.15-5.6 77.62-2.55 74.09 0.5 67.59 0.5L67.59 0.5Q61.3 0.5 57.97-2.5 54.65-5.5 54.8-11.1L54.8-11.1 54.9-16 54.7-32.25 62.8-32.25 62.45-12.2Q62.4-9 63.75-7.5 65.09-6 67.94-6L67.94-6Q70.84-6 72.22-7.48 73.59-8.95 73.55-12L73.55-12 73.19-32.25 81.44-32.25ZM119.34-32.25L122.09 0 114.94 0 114.54-9.8 113.64-20.4 113.14-20.4 106.74-3.25 100.54-3.25 94.94-20.4 94.39-20.4 93.39-10.55 92.74 0 85.99 0 89.19-32.25 98.54-32.25 99.69-27.55 103.84-13.75 104.34-13.75 108.84-27.4 110.14-32.25 119.34-32.25ZM155.74-32.4L155.29-10.2 155.59 0 146.79 0 135.34-19.95 134.84-19.95 134.79-11.35 135.09 0 127.74 0 128.14-9.5 127.74-32.25 136.49-32.25 147.99-12.3 148.49-12.3 148.29-31.95 155.74-32.4ZM171.04-32.25L170.59-10.35 170.89 0 162.74 0 163.19-9.55 162.74-32.25 171.04-32.25Z" opacity="1" transform="matrix(1,0,0,1,0,0)" fill="#000000" className="undefined-text-0" data-fill-palette-color="primary" id="text-0"></path></svg></g></svg></g></svg></g></svg></g><g transform="matrix(1,0,0,1,413.51100700561045,0)"><svg viewBox="0 0 117.89855226173715 105.32020062079063" height="105.32020062079063" width="117.89855226173715"><g><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0" y="0" viewBox="5.000076770782471 9.801164627075195 89.99971771240234 80.39783477783203" enable-background="new 0 0 100 100" xmlSpace="preserve" height="105.32020062079063" width="117.89855226173715" className="icon-icon-0" data-fill-palette-color="accent" id="icon-0"><path d="M89.775 65.452c-3.494-1.483-7.417-0.465-9.789 2.24l-7.409-3.144c2.287-8.935-0.977-18.57-8.546-24.214l7.823-13.57c3.524 0.73 7.268-0.821 9.163-4.109 2.364-4.101 0.956-9.343-3.145-11.707-4.101-2.364-9.343-0.956-11.707 3.145-1.895 3.288-1.361 7.305 1.036 9.989l-7.815 13.556c-4.998-2.172-10.433-2.44-15.412-1.045l-2.851-6.843c2.721-2.355 3.764-6.271 2.304-9.775-1.821-4.37-6.839-6.436-11.209-4.616s-6.436 6.839-4.616 11.209c1.46 3.503 4.975 5.52 8.563 5.247l2.846 6.83c-3.554 1.966-6.647 4.871-8.824 8.647-2.773 4.81-3.617 10.201-2.78 15.282l-6.647 1.747c-1.959-3.019-5.695-4.589-9.366-3.624C6.816 61.9 4.08 66.588 5.284 71.166s5.891 7.314 10.469 6.111c3.67-0.965 6.151-4.17 6.372-7.762l6.782-1.783c1.884 4.518 5.189 8.485 9.758 11.119 0.813 0.468 1.646 0.865 2.487 1.225-0.284 1.157-0.745 2.398-1.494 3.59-2.502 3.978-6.191 6.533-6.191 6.533s13.829-0.408 17.386-8.292c7.753-0.225 15.214-4.322 19.371-11.534 0.154-0.267 0.274-0.543 0.415-0.813l7.248 3.076c-0.297 3.586 1.697 7.115 5.19 8.597 4.358 1.849 9.39-0.184 11.239-4.542C96.166 72.334 94.133 67.302 89.775 65.452z" fill="#020202" data-fill-palette-color="accent"></path></svg></g></svg></g></svg></g></svg><rect width="395.52" height="78.38821305165533" fill="none" stroke="none" visibility="hidden"></rect></g>
     
      <div className="flex flex-col justify-between flex-1 mt-6 px-4" >
        <nav>
          <NavLink
            to={"timeline"}
            className={({ isActive }) => {
              return isActive ? "active-nav-item" : ""
            }}
          >
            <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
              >
                <path d="M5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h11l5 5v11q0 .825-.587 1.413Q19.825 21 19 21Zm0-2h14V9h-4V5H5v14Zm2-2h10v-2H7Zm0-8h5V7H7Zm0 4h10v-2H7ZM5 5v4-4 14V5Z" />
              </svg>
              <span className="mx-4 font-medium">Timeline</span>
            </button>
          </NavLink>

          <NavLink
            to={"topics"}
            className={({ isActive }) => {
              return isActive ? "active-nav-item" : ""
            }}
          >
            <button
              className={`flex items-center w-full px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md hover:bg-gray-200 hover:text-gray-700"`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
              >
                <path d="M6 12h12v-2H6Zm0 4h8v-2H6Zm-2 4q-.825 0-1.412-.587Q2 18.825 2 18V6q0-.825.588-1.412Q3.175 4 4 4h6l2 2h8q.825 0 1.413.588Q22 7.175 22 8v10q0 .825-.587 1.413Q20.825 20 20 20ZM4 6v12h16V8h-8.825l-2-2H4Zm0 0v12Z" />
              </svg>
              <span className="mx-4 font-medium">Topics</span>
            </button>
          </NavLink>

          <NavLink
            to={"groups"}
            className={({ isActive }) => {
              return isActive ? "active-nav-item" : ""
            }}
          >
            <button className="flex items-center w-full px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md hover:bg-gray-200 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
              >
                <path d="M0 18v-1.575q0-1.1 1.113-1.763Q2.225 14 4 14q.325 0 .625.012.3.013.575.063-.35.5-.525 1.075-.175.575-.175 1.225V18Zm6 0v-1.625q0-1.625 1.663-2.625 1.662-1 4.337-1 2.7 0 4.35 1 1.65 1 1.65 2.625V18Zm13.5 0v-1.625q0-.65-.163-1.225-.162-.575-.487-1.075.275-.05.563-.063Q19.7 14 20 14q1.8 0 2.9.662 1.1.663 1.1 1.763V18ZM12 14.75q-1.425 0-2.55.375-1.125.375-1.325.875H15.9q-.225-.5-1.338-.875Q13.45 14.75 12 14.75ZM4 13q-.825 0-1.412-.588Q2 11.825 2 11q0-.85.588-1.425Q3.175 9 4 9q.85 0 1.425.575Q6 10.15 6 11q0 .825-.575 1.412Q4.85 13 4 13Zm16 0q-.825 0-1.413-.588Q18 11.825 18 11q0-.85.587-1.425Q19.175 9 20 9q.85 0 1.425.575Q22 10.15 22 11q0 .825-.575 1.412Q20.85 13 20 13Zm-8-1q-1.25 0-2.125-.875T9 9q0-1.275.875-2.138Q10.75 6 12 6q1.275 0 2.137.862Q15 7.725 15 9q0 1.25-.863 2.125Q13.275 12 12 12Zm0-4q-.425 0-.712.287Q11 8.575 11 9t.288.712Q11.575 10 12 10t.713-.288Q13 9.425 13 9t-.287-.713Q12.425 8 12 8Zm0 8Zm0-7Z" />
              </svg>
              <span className="mx-4 font-medium">Groups</span>
            </button>
          </NavLink>

          <NavLink
            to={"events"}
            className={({ isActive }) => {
              return isActive ? "active-nav-item" : ""
            }}
          >
            <button className="flex items-center w-full px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md hover:bg-gray-200 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
              >
                <path d="M5 22q-.825 0-1.413-.587Q3 20.825 3 20V6q0-.825.587-1.412Q4.175 4 5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588Q21 5.175 21 6v14q0 .825-.587 1.413Q19.825 22 19 22Zm0-2h14V10H5v10ZM5 8h14V6H5Zm0 0V6v2Zm7 6q-.425 0-.712-.288Q11 13.425 11 13t.288-.713Q11.575 12 12 12t.713.287Q13 12.575 13 13t-.287.712Q12.425 14 12 14Zm-4 0q-.425 0-.713-.288Q7 13.425 7 13t.287-.713Q7.575 12 8 12t.713.287Q9 12.575 9 13t-.287.712Q8.425 14 8 14Zm8 0q-.425 0-.712-.288Q15 13.425 15 13t.288-.713Q15.575 12 16 12t.712.287Q17 12.575 17 13t-.288.712Q16.425 14 16 14Zm-4 4q-.425 0-.712-.288Q11 17.425 11 17t.288-.712Q11.575 16 12 16t.713.288Q13 16.575 13 17t-.287.712Q12.425 18 12 18Zm-4 0q-.425 0-.713-.288Q7 17.425 7 17t.287-.712Q7.575 16 8 16t.713.288Q9 16.575 9 17t-.287.712Q8.425 18 8 18Zm8 0q-.425 0-.712-.288Q15 17.425 15 17t.288-.712Q15.575 16 16 16t.712.288Q17 16.575 17 17t-.288.712Q16.425 18 16 18Z" />
              </svg>
              <span className="mx-4 font-medium">Events</span>
            </button>
          </NavLink>

          <hr className="my-6 border-gray-200 " />

          <NavLink
            to={"/profile-settings/"}
            className={({ isActive }) => {
              return isActive ? "active-nav-item" : ""
            }}
          >
            <button className="flex items-center w-full px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md hover:bg-gray-200 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
              >
                <path d="m9.25 22-.4-3.2q-.325-.125-.612-.3-.288-.175-.563-.375L4.7 19.375l-2.75-4.75 2.575-1.95Q4.5 12.5 4.5 12.337v-.675q0-.162.025-.337L1.95 9.375l2.75-4.75 2.975 1.25q.275-.2.575-.375.3-.175.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3.287.175.562.375l2.975-1.25 2.75 4.75-2.575 1.95q.025.175.025.337v.675q0 .163-.05.338l2.575 1.95-2.75 4.75-2.95-1.25q-.275.2-.575.375-.3.175-.6.3l-.4 3.2Zm2.8-6.5q1.45 0 2.475-1.025Q15.55 13.45 15.55 12q0-1.45-1.025-2.475Q13.5 8.5 12.05 8.5q-1.475 0-2.488 1.025Q8.55 10.55 8.55 12q0 1.45 1.012 2.475Q10.575 15.5 12.05 15.5Zm0-2q-.625 0-1.062-.438-.438-.437-.438-1.062t.438-1.062q.437-.438 1.062-.438t1.063.438q.437.437.437 1.062t-.437 1.062q-.438.438-1.063.438ZM12 12Zm-1 8h1.975l.35-2.65q.775-.2 1.438-.588.662-.387 1.212-.937l2.475 1.025.975-1.7-2.15-1.625q.125-.35.175-.738.05-.387.05-.787t-.05-.788q-.05-.387-.175-.737l2.15-1.625-.975-1.7-2.475 1.05q-.55-.575-1.212-.963-.663-.387-1.438-.587L13 4h-1.975l-.35 2.65q-.775.2-1.437.587-.663.388-1.213.938L5.55 7.15l-.975 1.7 2.15 1.6q-.125.375-.175.75-.05.375-.05.8 0 .4.05.775t.175.75l-2.15 1.625.975 1.7 2.475-1.05q.55.575 1.213.962.662.388 1.437.588Z" />
              </svg>
              <span className="mx-4 font-medium">
                Account Settings
              </span>
            </button>
          </NavLink>

          <button
            className="flex items-center w-full px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md hover:bg-gray-200 hover:text-gray-700"
            onClick={logout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              width="24"
            >
              <path d="M5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h7v2H5v14h7v2Zm11-4-1.375-1.45 2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5Z" />
            </svg>
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </nav>

        <NavLink
          to={"/account"}
          className={({ isActive }) => {
            return isActive ? "active-nav-item" : ""
          }}
        >
          <div
            id="profileNavItem"
            className="flex items-center px-4 py-2 transition-colors duration-300 transform rounded-md hover:bg-gray-200 hover:cursor-pointer"
          >
            <img
              onError={({ currentTarget }) => {
                currentTarget.src =
                  "\\assets\\default_profile_img.jpg"
                currentTarget.onerror = null
              }}
              src={
                userState.User
                  ? userState.User.picture !== null
                    ? userState.User.picture
                    : "#ERROR"
                  : "#ERROR"
              }
              className="object-cover mx-2 rounded-full h-9 w-9"
              alt="avatar"
            />
            <h4 className="mx-2 font-medium text-gray-800 hover:underline ">
              {keycloak.tokenParsed?.name}
            </h4>
          </div>
        </NavLink>
      </div>
    </aside>
  )
}

export default Navbar
