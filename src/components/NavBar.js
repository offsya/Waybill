import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {HOME_ROUTE, DRIVER_ROUTE, ROUTES_ROUTE, WAYBILL_ROUTE, COMPANY_ROUTE, CARS_ROUTE} from "../utils/consts";

const NavBar = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Nav className="navbr me-auto">
                        <Nav.Link href={HOME_ROUTE}>Лист</Nav.Link>
                        <Nav.Link href={DRIVER_ROUTE}>Водители</Nav.Link>
                        <Nav.Link href={ROUTES_ROUTE}>Маршруты</Nav.Link>
                        <Nav.Link href={WAYBILL_ROUTE}>Накладные</Nav.Link>
                        <Nav.Link href={COMPANY_ROUTE}>Компании</Nav.Link>
                        <Nav.Link href={CARS_ROUTE}>Машины</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default NavBar;