import React from 'react';

import BackgroundImg from '../commons/images/background.png';

import {Container, Jumbotron} from 'reactstrap';

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "1920px",
    backgroundImage: `url(${BackgroundImg})`
};
const textStyle = {color: 'white', };

class Home extends React.Component {


    render() {

        return (

            <div>
                <Jumbotron fluid style={backgroundStyle}>
                    <Container fluid>
                        <h1 className="display-3" style={textStyle}>Medical Monitoring Platform for care assistance</h1>
                        <hr className="my-2"/>
                    </Container>
                </Jumbotron>

            </div>
        )
    };
}

export default Home
