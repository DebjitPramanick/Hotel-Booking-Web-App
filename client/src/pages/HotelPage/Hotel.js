import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router";
import { Image, PageContainer } from "../../components/GlobalStyles/PageStyles";
import { GET_HOTEL_BY_ID } from "../../graphql/queries/hotelQueries";
import HotelDetails from "./HotelDetails";


const Hotel = () => {
    const { id } = useParams();
    const { data, loading, error } = useQuery(GET_HOTEL_BY_ID, {
        variables: { id: id },
    });

    if (loading) return <p>Loading...</p>;

    const hotel = data.getHotelByID;
    console.log(hotel);

    return (
        <PageContainer style={{maxWidth: "1000px", marginLeft: "auto", marginRight: "auto"}}>
            <HotelDetails hotel={hotel}/>
        </PageContainer>
    );
};

export default Hotel;
