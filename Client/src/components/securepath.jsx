// Makes sure users cannot bypass security by typing a page into the url
import { Children } from "react";
import { Navigate } from "react-router-dom";

const SecurePath = ({children, allowedType}) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        return <Navigate to="/" replace />;
    }
    if (user.type !== allowedType) {
        return user.type === 1 ? <Navigate to="/admin" /> : <Navigate to="/customer"/>;
    }
    return children;
};

export default SecurePath;