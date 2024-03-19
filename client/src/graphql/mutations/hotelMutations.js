import { gql } from "@apollo/client";

export const ADD_HOTEL = gql`
mutation($image: String, $name: String!, $description: String!, $totalRooms: Int!, $location: String!, $manager: ID!){
    addHotel(manager: $manager, image: $image, name: $name, description: $description, totalRooms: $totalRooms, location: $location){
      id
      name
      description
    }
  }
`


export const UPDATE_HOTEL = gql`
mutation($id: ID!, $image: String, $name: String!, $description: String!, $ratings: Int, $totalRooms: Int!, $location: String!){
    updateHotel(id: $id, image: $image, name: $name, description: $description, ratings: $ratings, totalRooms: $totalRooms, location: $location){
      id
      name
    }
  }
`