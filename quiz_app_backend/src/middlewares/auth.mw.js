const jwt = require("jsonwebtoken");

const authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"] || req.headers["X-API-KEY"]
        if (!token) {
            return res.status(401).send({ status: false, message: "token must be present" })
        }
        let decodedtoken = jwt.verify(token, 'sun');
        if (!decodedtoken) {
            return res.status(400).send({ status: false, message: "Invalid authentication token in request headers." })
        }
        req.loggedInOrgId = decodedtoken.orgId
        next();
    }
    catch (err) { 
         if (err.message == "jwt expired") return res.status(401).send({ status: false, message: "Session expired! Please login again."})
        return res.status(500).send({ status: false, message: err.message }); 
    }
}

module.exports = {authentication};