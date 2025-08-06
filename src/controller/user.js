const User = require("../module/user");
const {createToken} = require("../utility/jwt");
exports.userVerify = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(email);
        if (!email) {
            return res.status(400).json({ message: 'Email are required' });
        }

        const user = await User.findOne({ email });
        token = await createToken(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.save();
        return res.status(200).json({ message: 'User verified successfully', token });
    } catch (error) {
        console.error('Error updating user code:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
exports.userCode = async (req, res) => {
    try {
        const { code } = req.body;
        const { user } = req.user;
        if (!code) {
            return res.status(400).json({ message: 'code are required' });
        }
        const userfound = await User.findOne({ email: user.email });
        if (!userfound) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (userfound.code === code) {
            return res.status(400).json({ message: 'verify code' });
        }

        return res.status(200).json({ message: 'Code updated successfully' });
    } catch (error) {
        console.error('Error updating user code:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}