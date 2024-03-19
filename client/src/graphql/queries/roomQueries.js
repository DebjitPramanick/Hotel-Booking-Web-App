import {gql} from "@apollo/client";

export const GET_ROOM = gql`
query($id: ID!){
  getRoom(id: $id){
    id
    images{
      url
      uuid
    }
    name
    description
    occupancy
    others
    price
    addedOn
    ratings
    hotel{
      id
      name
      location
      manager{
        id
        name
        email
      }
    }
  }
}
`

export const GET_AVAILABLE_ROOMS = gql`
query($hotelId: ID!, $from: Date!, $to: Date!, $occupancy: Int!){
  getAvailableRooms(hotelId: $hotelId, from: $from, to: $to, occupancy: $occupancy){
    room{
      id
      images{
        url
        uuid
      }
      name
      description
      occupancy
      others
      price
      addedOn
      ratings
      hotel{
        id
        name
        location
        manager{
          id
          name
          email
        }
      }
    }
    roomNumbers
  }
}
`