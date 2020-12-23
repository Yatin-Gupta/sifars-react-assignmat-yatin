import React from 'react';
import { Navbar, OverlayTrigger, Tooltip, Container } from "react-bootstrap";

/**
 * Component to render Layout
 * @param {*} props 
 */
export default function Layout(props) {
    return (
        <React.Fragment>
            <Navbar bg="light">
                <Navbar.Brand href="#home">
                    <OverlayTrigger placement="bottom" overlay={
                        // Tooltip added that will help screen reader to know what will happen
                        // if they click on hovered location[AODA]
                        <Tooltip id="site-logo-tooltip">
                            Click here to navigate to home page
                        </Tooltip>
                    }>
                        {/* For logo image SVG vector graphic image is used that will not break with resolution */}
                        <img
                            src="/images/logos/sifars-site-logo.svg"
                            width="130"
                            height="60"
                            className="d-inline-block align-top"
                            alt="Sifars site logo"
                        />
                    </OverlayTrigger>
                </Navbar.Brand>
            </Navbar>
            <Container>
                {props.children}
            </Container>
        </React.Fragment>
    );
}