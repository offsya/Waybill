import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {publicRoutes} from "../router";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate replace to="/home" />}/>
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            <Route path="*" element={<Navigate replace to="/home" />}/>
        </Routes>
    );
}

export default AppRouter;