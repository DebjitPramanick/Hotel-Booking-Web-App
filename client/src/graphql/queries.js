import {gql} from "@apollo/client";

export const LOGIN_USER = gql`
query($email: String!, $password: String!){
  login(email: $email, password: $password){
    id
    name
    username
    age
    email
    accessToken
    refreshToken
    accessTokenExp
    refreshTokenExp
    isAdmin
    isManager
    isBlocked
    joined
  }
}
`

export const GET_USER = gql`
query($id: ID){
  getUser(id: $id){
    id
    name
    username
    age
    email
    accessToken
    refreshToken
    accessTokenExp
    refreshTokenExp
    isAdmin
    isManager
    isBlocked
    joined
  }
}
`

export const GET_HOTEL = gql`
query($id: ID!){
  getHotel(id: $id){
    image
    name
    description
    manager{
      name
      email
      age
      username
    }
    rooms{
      id
      images
      name
      description
      occupancy
      price
      addedOn
      ratings
    }
    addedOn
    location
    ratings
    totalRooms
    roomsMap
  }
}
`