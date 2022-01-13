import { gql } from "@apollo/client";

export const GET_USER_BOOKINGS = gql`
query($id: ID!){
    getUserBookings(id: $id){
        id
        from
        to
        days
        paid
        amount
        bookedOn
        people{
            children
            adults
        }
        roomNumbers
        numOfPeople
        location
        bookedBy{
            name
            email
            username
            id
        }
        hotel{
            id
            name
            location
        }
        room{
            id
            name
            price
            others
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
        days
        paid
        amount
        bookedOn
        people{
            children
            adults
        }
        roomNumbers
        numOfPeople
        location
        bookedBy{
            name
            email
            username
            id
        }
        hotel{
            id
            name
            location
        }
        room{
            id
            name
            price
            others
        }
    }
}
`

export const GET_BOOKING = gql`
    query($id: ID!){
        getBooking(id: id){
            id
        from
        to
        days
        paid
        amount
        bookedOn
        people{
            children
            adults
        }
        roomNumbers
        numOfPeople
        location
        bookedBy{
            name
            email
            username
            id
        }
        hotel{
            id
            name
            location
        }
        room{
            id
            name
            price
            others
        }
        }
    }
`