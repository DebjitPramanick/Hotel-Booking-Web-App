import {gql} from "@apollo/client";

export const REGISTER_USER = gql`
mutation($name: String!, $username: String!, $email: String!, $age: Int, $password: String!){
    createUser(name: $name, username: $username, email: $email, password: $password, age: $age){
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

export const GENERATE_TOKEN = gql`
mutation($refreshToken: String!){
  generateToken(refreshToken: $refreshToken){
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