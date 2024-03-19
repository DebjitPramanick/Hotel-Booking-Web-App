import {gql} from "@apollo/client";

export const REGISTER_USER = gql`
mutation($name: String!, $username: String!, $email: String!, $dob: Date!, $password: String!){
    createUser(name: $name, username: $username, email: $email, password: $password, dob: $dob){
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

export const GENERATE_TOKEN = gql`
mutation($refreshToken: String!){
  generateToken(refreshToken: $refreshToken){
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

export const UPDATE_USER = gql`
mutation($id: ID!, $name: String!, $email: String!, $dob: Date!){
  updateProfile(id: $id, name: $name, email: $email, dob: $dob){
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

export const MAKE_MANAGER = gql`
mutation($id: ID!){
  makeManager(id: $id){
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