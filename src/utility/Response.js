
const Send = (res, status, body = null) => res.status(status).send(body);
module.exports = {
    Send: {
        Raw: (res, status, body) => Send(res, status, body),
        Error: (res, status, message) => Send(res, status, { error: message })
    }
};
