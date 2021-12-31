module.exports = (req, res, next) => {
    // check if user has any credit
    if (req.user.credits < 1) {
        return res.status(403).send({ error: 'You do not have enough credits!' });
    } 

    // let the users to continue their requests
    next();
};