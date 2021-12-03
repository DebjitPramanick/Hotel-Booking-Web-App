import { gql } from "@apollo/client";

export const ADD_HOTEL = gql`
mutation($hotel: ID!, $images: [String]!, $name: String!, $description: String!, $others: [String]!, $occupancy: Int!, $price: Int!, $roomNumbers: [Int]!){
    addHotel(hotel: $hotel, images: $images, name: $name, description: $description, others: $others, occupancy: $occupancy, price: $price, roomNumbers: $roomNumbers){
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