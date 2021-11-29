import {gql} from "@apollo/client";

export const GET_HOTEL = gql`
query($id: ID!){
  getHotel(id: $id){
    id
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

export const GET_HOTEL_BY_ID = gql`
query($id: ID!){
  getHotelByID(id: $id){
    id
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

export const SEARCH_HOTELS = gql`
query($location: String!, $from: Date!, $to: Date!, $occupancy: Int!){
  searchHotels(location: $location, from: $from, to: $to, occupancy: $occupancy){
    hotel{
      id
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
    rooms
  }
}
`