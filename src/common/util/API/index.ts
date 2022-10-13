import axios from "./api"
import { UserProfile } from "../../interface/UserProfile"
import { IGroup, ITopic } from "../../interface/Endpoints"
import keycloak from "../../../keycloak"
import { Axios } from "axios"

export const getUserProfile = async (): Promise<UserProfile> => {
    const user: UserProfile =  (await axios.get('/api/users/1')).data
    return user
}



// alumni api requests
//const alApi = process.env.REACT_APP_ALUMNI_URL + "/Topics"
const alApi = "https://alumniwebapi.azurewebsites.net/api"
//const alApi = "http://localhost:7067/api/Groups"
export const getUserTopics = async (): Promise<ITopic[]> => {
    return (await axios.get(`${alApi}/Topics`)).data
}

export const getUserGroups = async (): Promise<IGroup[]> => {
    return (await axios.get(`${alApi}/Groups`)).data
}