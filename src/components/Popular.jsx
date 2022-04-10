import { Splide, SplideSlide } from '@splidejs/react-splide';
// eslint-disable-next-line import/no-unresolved
import '@splidejs/react-splide/css';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

function Popular() {
    const [popular, setPopular] = useState([]);

    const getPopular = async () => {
        const check = localStorage.getItem('popular');
        if (check) {
            setPopular(JSON.parse(check));
        } else {
            const api = await fetch(
                `https://api.spoonacular.com/recipes/random?number=10&apiKey=${process.env.REACT_APP_API_KEY}`
            );
            const data = await api.json();
            localStorage.setItem('popular', JSON.stringify(data.recipes));
            setPopular(data.recipes);
        }
    };

    useEffect(() => {
        getPopular();
    }, []);
    return (
        <div>
            <Wrapper>
                <h3>Popular Picks</h3>
                <Splide
                    options={{
                        perPage: 3,
                        arrows: false,
                        pagination: false,
                        drag: 'free',
                        gap: '2rem',
                    }}
                >
                    {popular.map((recipe) => (
                        <SplideSlide key={recipe.id}>
                            <Card>
                                <p>{recipe.title}</p>
                                <img src={recipe.image} alt={recipe.title} />
                                <Gradient />
                            </Card>
                        </SplideSlide>
                    ))}
                </Splide>
            </Wrapper>
        </div>
    );
}

const Wrapper = styled.div`
    margin: 4rem 0;
`;
const Card = styled.div`
    min-height: 15rem;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;

    img {
        border-radius: 2rem;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    p {
        position: absolute;
        z-index: 10;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 0%);
        color: white;
        text-align: center;
        font-weight: 600;
        font-size: 0.8rem;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Popular;