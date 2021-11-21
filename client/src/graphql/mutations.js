import {gql} from "@apollo/client";

export const REGISTER_USER = gql`
mutation($email: String!, $age: Int, $password: String!){
    createUser(email: $email, password: $password, age: $age){
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

export const GENERATE_TOKEN = gql`
mutation($refreshToken: String!){
  generateToken(refreshToken: $refreshToken){
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