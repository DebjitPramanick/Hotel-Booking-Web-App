import { gql } from "@apollo/client";

export const ADD_ROOM = gql`
mutation($hotel: ID!, $images: [image]!, $name: String!, $description: String!, $others: [String]!, $occupancy: Int!, $price: Int!, $roomNumbers: [Int]!){
    addRoom(hotel: $hotel, images: $images, name: $name, description: $description, others: $others, occupancy: $occupancy, price: $price, roomNumbers: $roomNumbers){
      id
      name
      description
      images{
        url
        uuid
      }
      price
      others
      occupancy
    }
  }
`

export const UPDATE_ROOM = gql`
mutation($id: ID!, $images: [image]!, $name: String!, $description: String!, $others: [String]!, $occupancy: Int!, $price: Int!, $roomNumbers: [Int]!){
    updateRoom(id: $id, images: $images, name: $name, description: $description, others: $others, occupancy: $occupancy, price: $price, roomNumbers: $roomNumbers){
      id
      name
      description
      images{
        url
        uuid
      }
      price
      others
      occupancy
    }
  }
`

export const DELETE_ROOM = gql`
mutation($id: ID!){
    deleteRoom(id: $id){
      id
      name
      description
      images{
        url
        uuid
      }
      price
      others
      occupancy
    }
  }
`