const asynchandler = (asyncrequest) => {
    return async (req, res, next) => {
        try {
            await asyncrequest(req, res, next);
        } catch (err) {
            if (typeof next === "function") {
                return next(err);
            }

            throw err;
        }
    };
};

export {asynchandler};
