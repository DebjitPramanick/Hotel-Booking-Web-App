import {gql} from "@apollo/client";

export const LOGIN_USER = gql`
query($email: String!, $password: String!){
  login(email: $email, password: $password){
    userID
    username
    age
    email
    accessToken
    refreshToken
    accessTokenExp
    refreshTokenExp
  }
}
`

export const GET_USER = gql`
query($id: ID){
  getUser(id: $id){
    userID
    username
    age
    email
    accessToken
    refreshToken
    accessTokenExp
    refreshTokenExp
  }
}
`