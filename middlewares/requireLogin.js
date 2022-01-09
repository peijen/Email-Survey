module.exports = (req, res, next) => {
    // check if user is logged in
    if (!req.user) {
        return res.status(401).send({ error: 'You are not logged in.' });
    } 

    // let the users to continue their requests
    next();
};