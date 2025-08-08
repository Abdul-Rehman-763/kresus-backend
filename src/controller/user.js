const User = require("../module/user");

const Auth=require("../services/Auth")
const Response = require("../utility/Response");
exports.userVerify = async (req, res) => {
    try {
      Auth.userVerify(req).then((resp) => {
        return Response.Send.Raw(res, resp.code, resp.body);
      })
    } catch (error) {
        // console.error('Error updating user code:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
exports.userCode = async (req, res) => {
  try {
    Auth.userCode(req).then((resp) => {
      return Response.Send.Raw(res, resp.code, resp.body);
    })
    
  } catch (error) {
    console.log('Error verifying user code:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}