const arrowStyles = {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    background: 'green',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '2px',
    background: '#ff6e29'
}

const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...arrowStyles
            }}
            onClick={onClick}
        />
    );
}

const SamplePrevArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...arrowStyles
            }}
            onClick={onClick}
        />
    );
}

export const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
}


export const detailsSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
}

export const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1200,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
        // {
        //     breakpoint: 1400,
        //     settings: {
        //         dots: true,
        //         infinite: true,
        //         slidesToShow: 2,
        //         slidesToScroll: 1,
        //     }
        // },
        {
            breakpoint: 900,
            settings: {
                dots: true,
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 680,
            settings: {
                dots: true,
                infinite: true,
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 480,
            settings: {
                dots: true,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        },

    ]
}

export const urls = [
    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/da/8b/9c/5-person-room-ensuite--v13541582.jpg?w=900&h=-1&s=1',
    'https://www.onetravel.com/going-places/wp-content/uploads/2020/09/hotel-travel-hacks-810x486.jpg',
    'https://www.fodors.com/wp-content/uploads/2017/10/mnt14.jpg',
    'https://cdn.lifestyleasia.com/wp-content/uploads/2019/02/12084046/ion-hotel-slider.jpg',
    'https://georgiastartshere.com/wp-content/uploads/2017/12/Hotel-Quadrum-Gudauri-min.jpg',
    'https://cf.bstatic.com/xdata/images/hotel/max1280x900/293983997.jpg?k=b965c30c3532500d325baa869cf6234b90f8bd648e3f463d9e0ca5d3bd8fa414&o=&hp=1',
    'https://img.traveltriangle.com/blog/wp-content/tr:w-700,h-400/uploads/2016/06/Wildflower-Resort-in-Shimla.jpg',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/207484121.jpg?k=7005aade3193ed6aa9b24107cd8c577d45e92fc6336f0093adba3c139bfbcce5&o=&hp=1',
    'https://media.architecturaldigest.com/photos/5d51c8f565bebb000996aff3/16:9/w_2560%2Cc_limit/Tout_20130618_exteriors-016.jpg',
    'https://www.planetware.com/wpimages/2020/05/montana-glacier-national-park-best-places-to-stay-lodging-inside-many-glacier-hotel.jpg'
]
