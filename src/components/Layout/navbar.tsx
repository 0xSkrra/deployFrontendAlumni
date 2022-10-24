import { useCallback} from "react"
import {  NavLink } from "react-router-dom"
import { defaultUserProfile } from "../../common/interface/UserProfile"
import { useUserStore } from "../../common/util/Store/userStore"
import keycloak from "../../keycloak"

const Navbar = () => {
    const userState = useUserStore((state) => state)
    const logout = useCallback( async () => {
    keycloak?.logout()
    userState.setUser(defaultUserProfile)
    }, [userState])

    if (!keycloak.authenticated) return <></>
return (

  <aside className="lg:w-96 flex-col md:min-w-65 hidden md:flex h-screen px-4 py-8 bg-white sm:border-t md:border-r">
    <g transform="translate(141.94 152.429)"><svg viewBox="0 0 356.121 95.142" height="95.142" width="356.121"><svg viewBox="0 0 356.121 95.142" height="95.142" width="356.121"><svg viewBox="0 0 356.121 95.142" height="95.142" width="356.121"><path d="M0 95.142V0h356.121v95.142z" fill="#4b97b3" data-fill-palette-color="tertiary"/><path d="M3.283 91.859V3.283h349.554v88.576z" fill="#fff" data-fill-palette-color="quaternary"/><path d="M9.85 85.293V9.85h336.421v75.443z" fill="#4b97b3" data-fill-palette-color="tertiary"/><g transform="translate(19.7 19.7)"><svg viewBox="0 0 316.721 55.743" height="55.743" width="316.721"><svg viewBox="0 0 316.721 55.743" height="55.743" width="316.721"><svg width="316.721" viewBox="0.15 -35.65 206.24 36.3" height="55.743" data-palette-color="#ffffff"><path d="M3.95 0H.15l12.2-31.95q.75-1.95 1.93-2.82 1.17-.88 2.77-.88 1.65 0 2.85.85 1.2.85 1.9 2.8L34.1 0h-3.95l-3.5-9.2H7.45L3.95 0Zm11.5-30.75L8.55-12.4h17l-6.8-18.35q-.3-.8-.68-1.25-.37-.45-.97-.45-.65 0-.97.45-.33.45-.68 1.25ZM55.35 0h-9.5q-2.65 0-4.6-1.13-1.95-1.12-3-3.12T37.2-8.8v-26.15h3.6V-8.3q0 2.2 1.37 3.65 1.38 1.45 3.78 1.45h9.4V0ZM74.5.65q-3.95 0-7-1.72-3.05-1.73-4.8-4.88t-1.75-7.5V-35h3.6v22.05q0 2.85 1.22 5.17Q67-5.45 69.22-4.03 71.45-2.6 74.5-2.6q3.09 0 5.32-1.43 2.23-1.42 3.43-3.75 1.2-2.32 1.2-5.17V-35h3.6v21.55q0 4.35-1.75 7.5-1.75 3.15-4.8 4.88-3.05 1.72-7 1.72ZM119.19.6q-2.55 0-4.6-1.18-2.05-1.17-3.22-3.3-1.18-2.12-1.18-4.87V-26.8q0-1.6-.75-2.88-.75-1.27-1.97-2-1.23-.72-2.73-.72t-2.75.72q-1.25.73-2 2-.75 1.28-.75 2.88V0h-3.6v-26.25q0-2.75 1.15-4.85 1.15-2.1 3.2-3.33 2.05-1.22 4.75-1.22 2.65 0 4.7 1.22 2.05 1.23 3.23 3.33 1.17 2.1 1.17 4.85V-8.2q0 1.6.75 2.87.75 1.28 1.95 2 1.2.73 2.65.73t2.65-.73q1.2-.72 1.93-2 .72-1.27.72-2.87v-18.05q0-2.75 1.15-4.85 1.15-2.1 3.23-3.33 2.07-1.22 4.72-1.22 2.7 0 4.73 1.22 2.02 1.23 3.17 3.33t1.15 4.85V0h-3.6v-26.8q0-1.6-.72-2.88-.73-1.27-1.95-2-1.23-.72-2.78-.72-1.5 0-2.77.72-1.28.73-2 2-.73 1.28-.73 2.88v18.05q0 2.75-1.15 4.87-1.15 2.13-3.15 3.3-2 1.18-4.6 1.18Zm54.5.05q-2.6 0-4.65-1.23-2.05-1.22-3.2-3.35-1.15-2.12-1.15-4.82V-26.8q0-1.6-.75-2.88-.75-1.27-1.97-2-1.23-.72-2.73-.72t-2.75.72q-1.25.73-2 2-.75 1.28-.75 2.88V0h-3.6v-26.25q0-2.75 1.15-4.85 1.15-2.1 3.2-3.33 2.05-1.22 4.75-1.22 2.65 0 4.7 1.22 2.05 1.23 3.23 3.33 1.17 2.1 1.17 4.85V-8.2q0 1.65.75 2.9t1.95 1.97q1.2.73 2.65.73t2.65-.73q1.2-.72 1.9-1.97t.7-2.9V-35h3.6v26.25q0 2.7-1.1 4.82-1.1 2.13-3.1 3.35-2 1.23-4.65 1.23Zm32.7-.65h-17.5v-3.2h6.95v-28.6h-6.95V-35h17.5v3.2h-6.95v28.6h6.95V0Z" fill="#fff" className="undefined-text-0" data-fill-palette-color="quaternary"/></svg></svg></svg></g></svg></svg></svg></g>

    <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
            <NavLink to={'timeline'}
                className={({ isActive }) => {
                return isActive ? 'active-nav-item' : ''
            }}>
            <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h11l5 5v11q0 .825-.587 1.413Q19.825 21 19 21Zm0-2h14V9h-4V5H5v14Zm2-2h10v-2H7Zm0-8h5V7H7Zm0 4h10v-2H7ZM5 5v4-4 14V5Z"/></svg>
                <span className="mx-4 font-medium">Timeline</span>
            </button>
            </NavLink>

            <NavLink to={'topics'}
            className={({ isActive }) => {
            return isActive ? 'active-nav-item' : ''
            }}>
                <button className={`flex items-center w-full px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md hover:bg-gray-200 hover:text-gray-700"`}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M6 12h12v-2H6Zm0 4h8v-2H6Zm-2 4q-.825 0-1.412-.587Q2 18.825 2 18V6q0-.825.588-1.412Q3.175 4 4 4h6l2 2h8q.825 0 1.413.588Q22 7.175 22 8v10q0 .825-.587 1.413Q20.825 20 20 20ZM4 6v12h16V8h-8.825l-2-2H4Zm0 0v12Z"/></svg>
                <span className="mx-4 font-medium">Topics</span>
                </button>
            </NavLink>

            <NavLink to={'groups'}
            className={({ isActive }) => {
            return isActive ? 'active-nav-item' : ''
            }}>
            <button className="flex items-center w-full px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md hover:bg-gray-200 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M0 18v-1.575q0-1.1 1.113-1.763Q2.225 14 4 14q.325 0 .625.012.3.013.575.063-.35.5-.525 1.075-.175.575-.175 1.225V18Zm6 0v-1.625q0-1.625 1.663-2.625 1.662-1 4.337-1 2.7 0 4.35 1 1.65 1 1.65 2.625V18Zm13.5 0v-1.625q0-.65-.163-1.225-.162-.575-.487-1.075.275-.05.563-.063Q19.7 14 20 14q1.8 0 2.9.662 1.1.663 1.1 1.763V18ZM12 14.75q-1.425 0-2.55.375-1.125.375-1.325.875H15.9q-.225-.5-1.338-.875Q13.45 14.75 12 14.75ZM4 13q-.825 0-1.412-.588Q2 11.825 2 11q0-.85.588-1.425Q3.175 9 4 9q.85 0 1.425.575Q6 10.15 6 11q0 .825-.575 1.412Q4.85 13 4 13Zm16 0q-.825 0-1.413-.588Q18 11.825 18 11q0-.85.587-1.425Q19.175 9 20 9q.85 0 1.425.575Q22 10.15 22 11q0 .825-.575 1.412Q20.85 13 20 13Zm-8-1q-1.25 0-2.125-.875T9 9q0-1.275.875-2.138Q10.75 6 12 6q1.275 0 2.137.862Q15 7.725 15 9q0 1.25-.863 2.125Q13.275 12 12 12Zm0-4q-.425 0-.712.287Q11 8.575 11 9t.288.712Q11.575 10 12 10t.713-.288Q13 9.425 13 9t-.287-.713Q12.425 8 12 8Zm0 8Zm0-7Z"/></svg>
                <span className="mx-4 font-medium">Groups</span>
            </button>
            </NavLink>

            <NavLink to={'events'}
            className={({ isActive }) => {
            return isActive ? 'active-nav-item' : ''
            }}>
            <button className="flex items-center w-full px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md hover:bg-gray-200 hover:text-gray-700" >
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M5 22q-.825 0-1.413-.587Q3 20.825 3 20V6q0-.825.587-1.412Q4.175 4 5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588Q21 5.175 21 6v14q0 .825-.587 1.413Q19.825 22 19 22Zm0-2h14V10H5v10ZM5 8h14V6H5Zm0 0V6v2Zm7 6q-.425 0-.712-.288Q11 13.425 11 13t.288-.713Q11.575 12 12 12t.713.287Q13 12.575 13 13t-.287.712Q12.425 14 12 14Zm-4 0q-.425 0-.713-.288Q7 13.425 7 13t.287-.713Q7.575 12 8 12t.713.287Q9 12.575 9 13t-.287.712Q8.425 14 8 14Zm8 0q-.425 0-.712-.288Q15 13.425 15 13t.288-.713Q15.575 12 16 12t.712.287Q17 12.575 17 13t-.288.712Q16.425 14 16 14Zm-4 4q-.425 0-.712-.288Q11 17.425 11 17t.288-.712Q11.575 16 12 16t.713.288Q13 16.575 13 17t-.287.712Q12.425 18 12 18Zm-4 0q-.425 0-.713-.288Q7 17.425 7 17t.287-.712Q7.575 16 8 16t.713.288Q9 16.575 9 17t-.287.712Q8.425 18 8 18Zm8 0q-.425 0-.712-.288Q15 17.425 15 17t.288-.712Q15.575 16 16 16t.712.288Q17 16.575 17 17t-.288.712Q16.425 18 16 18Z"/></svg>
                <span className="mx-4 font-medium">Events</span>
            </button>
            </NavLink>

            <hr className="my-6 border-gray-200 " />

            <NavLink to={'/profile-settings/'}
            className={({ isActive }) => {
            return isActive ? 'active-nav-item' : ''
            }}>
            <button className="flex items-center w-full px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md hover:bg-gray-200 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m9.25 22-.4-3.2q-.325-.125-.612-.3-.288-.175-.563-.375L4.7 19.375l-2.75-4.75 2.575-1.95Q4.5 12.5 4.5 12.337v-.675q0-.162.025-.337L1.95 9.375l2.75-4.75 2.975 1.25q.275-.2.575-.375.3-.175.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3.287.175.562.375l2.975-1.25 2.75 4.75-2.575 1.95q.025.175.025.337v.675q0 .163-.05.338l2.575 1.95-2.75 4.75-2.95-1.25q-.275.2-.575.375-.3.175-.6.3l-.4 3.2Zm2.8-6.5q1.45 0 2.475-1.025Q15.55 13.45 15.55 12q0-1.45-1.025-2.475Q13.5 8.5 12.05 8.5q-1.475 0-2.488 1.025Q8.55 10.55 8.55 12q0 1.45 1.012 2.475Q10.575 15.5 12.05 15.5Zm0-2q-.625 0-1.062-.438-.438-.437-.438-1.062t.438-1.062q.437-.438 1.062-.438t1.063.438q.437.437.437 1.062t-.437 1.062q-.438.438-1.063.438ZM12 12Zm-1 8h1.975l.35-2.65q.775-.2 1.438-.588.662-.387 1.212-.937l2.475 1.025.975-1.7-2.15-1.625q.125-.35.175-.738.05-.387.05-.787t-.05-.788q-.05-.387-.175-.737l2.15-1.625-.975-1.7-2.475 1.05q-.55-.575-1.212-.963-.663-.387-1.438-.587L13 4h-1.975l-.35 2.65q-.775.2-1.437.587-.663.388-1.213.938L5.55 7.15l-.975 1.7 2.15 1.6q-.125.375-.175.75-.05.375-.05.8 0 .4.05.775t.175.75l-2.15 1.625.975 1.7 2.475-1.05q.55.575 1.213.962.662.388 1.437.588Z"/></svg>
                <span className="mx-4 font-medium">Account Settings</span>
            </button>
            </NavLink>

            <button className="flex items-center w-full px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md hover:bg-gray-200 hover:text-gray-700" onClick={logout}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h7v2H5v14h7v2Zm11-4-1.375-1.45 2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5Z"/></svg>
                <span className="mx-4 font-medium">Logout</span>
            </button>
        </nav>

        <NavLink to={'/account'}
            className={({ isActive }) => {
            return isActive ? 'active-nav-item' : ''
        }}>
        <div id="profileNavItem" className="flex items-center px-4 py-2 transition-colors duration-300 transform rounded-md hover:bg-gray-200 hover:cursor-pointer">
            <img onError={({currentTarget}) => {
                                currentTarget.src ="\\assets\\default_profile_img.jpg"
                                currentTarget.onerror = null }}
                                src={userState.User ? userState.User.picture !== null ? userState.User.picture : '#ERROR' : '#ERROR'}
            className="object-cover mx-2 rounded-full h-9 w-9"  alt="avatar" />
            <h4 className="mx-2 font-medium text-gray-800 hover:underline ">{keycloak.tokenParsed?.name}</h4>
        </div>
        </NavLink>
    </div>
</aside>



  )
}

export default Navbar