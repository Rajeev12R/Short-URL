const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
    try {
        const userUid = req.cookies.uid;

        if (!userUid) {
            return res.redirect("/login");
        }

        const user = await getUser(userUid);

        if (!user) {
            return res.redirect("/login");
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in authentication middleware:", error);
        return res.redirect("/login");
    }
}

async function checkAuth(req, res, next){
     try {
        const userUid = req.cookies.uid;

        const user = await getUser(userUid);

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in authentication middleware:", error);

    }
}

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth,
};
