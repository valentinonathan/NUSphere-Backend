

export function loginInputValidation(req, res, next) {
    try {
        const body = req.body;
        const username = body?.username;
        const password = body?.password;

        if (username == undefined || password == undefined) {
            return res.status(400).send("Either username or password is missing!");
        }

        if (username.length > 30) return res.status(400).send("Username length should not be > 30");

        next();
    } catch (error) {
        res.status(500).send(error.message);
    }
}