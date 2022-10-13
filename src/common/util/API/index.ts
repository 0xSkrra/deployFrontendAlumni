import axios from "./api"
import { IGroup, ITopic } from "../../interface/Endpoints"
import keycloak from "../../../keycloak"
import { UserProfile, UserProfilePatch } from "../../interface/UserProfile"


export const getOrCreateUserProfile = async (): Promise<UserProfile> => {
    const userData: UserProfile = (await axios.get(`/api/users`)
    .then(res => res)
    .catch(async err => 
        (await axios.post("/api/users"))
        ))
        .data

    return userData
}

export const updateUserProfile = async (user: UserProfile): Promise<number> => {
    const userToPatch: UserProfilePatch = {
        id: user.id,
        status: user.status,
        bio: user.bio,
        funFact: user.funFact,
        picture: user.picture
    }
    console.log(userToPatch)
    const status = (await axios.patch(`/api/users/${user.id}`, userToPatch)).status
    return status
}

export const getUserById = async (id: number): Promise<UserProfile> => {
    const user: UserProfile = (await axios.get(`/api/users/${id}`)).data
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