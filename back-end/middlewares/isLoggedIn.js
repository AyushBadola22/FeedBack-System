import jwt from 'jsonwebtoken';

function isLoggedIn(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        console.log("Not logged in");
        return res.status(400).json({ message: "You are not logged in." });
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = data; 
        next(); 
    } catch (err) {
        return res.status(401).json({ message: "Invalid token." });
    }
}

export default isLoggedIn;
