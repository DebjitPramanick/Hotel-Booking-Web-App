import { gql } from "@apollo/client";

export const GET_USER_BOOKINGS = gql`
query($id: ID!){
    getUserBookings(id: $id){
        id
        from
        to
        paid
        amount
        bookedOn
        bookedBy{
            name
            email
            username
            id
        }
        hotel{
            name
        }
        room{
            name
        }
    }
}
`

export const GET_HOTEL_BOOKINGS = gql`
query($id: ID!){
    getHotelBookings(id: $id){
        id
        from
        to
        paid
        amount
        bookedOn
        bookedBy{
            name
            email
            username
            id
        }
        hotel{
            name
        }
        room{
            name
        }
    }
}
`