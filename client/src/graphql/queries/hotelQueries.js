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