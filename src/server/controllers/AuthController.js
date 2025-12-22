const AuthService = require('../services/AuthService');
const { asyncErrorHandler } = require('../middleware/errorHandler');

class AuthController {
    static register = asyncErrorHandler(async (req, res) => {
        const { username, email, password } = req.body;

        const result = await AuthService.register({ username, email, password });

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: result
        });
    });

    static login = asyncErrorHandler(async (req, res) => {
        const { email, password } = req.body;

        const result = await AuthService.login({ email, password });

        res.json({
            success: true,
            message: 'Login successful',
            data: result
        });
    });

    static getCurrentUser = asyncErrorHandler(async (req, res) => {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }

        const user = await AuthService.getCurrentUser(token);

        res.json({
            success: true,
            data: { user }
        });
    });

    static changePassword = asyncErrorHandler(async (req, res) => {
        const { oldPassword, newPassword } = req.body;
        const userId = req.user.id;

        const result = await AuthService.changePassword(userId, oldPassword, newPassword);

        res.json({
            success: true,
            message: result.message
        });
    });

    static logout = asyncErrorHandler(async (req, res) => {
        // For stateless JWT, logout is handled client-side by removing the token
        res.json({
            success: true,
            message: 'Logged out successfully'
        });
    });
}

module.exports = AuthController;