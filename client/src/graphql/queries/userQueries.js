import {gql} from "@apollo/client";

export const LOGIN_USER = gql`
query($email: String!, $password: String!){
  login(email: $email, password: $password){
    id
    name
    username
    dob
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
query($id: ID!){
  getUser(id: $id){
    id
    name
    username
    dob
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

