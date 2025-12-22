const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { ValidationError, AuthenticationError } = require('../middleware/errorHandler');

class AuthService {
    static async hashPassword(password) {
        const saltRounds = 12;
        return await bcrypt.hash(password, saltRounds);
    }

    static async verifyPassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }

    static generateToken(user) {
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        };

        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || '24h'
        });
    }

    static verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            throw new AuthenticationError('Invalid or expired token');
        }
    }

    static async register(userData) {
        try {
            // Check if user already exists
            const existingUser = await User.findByEmail(userData.email) ||
                                await User.findByUsername(userData.username);

            if (existingUser) {
                throw new ValidationError('User with this email or username already exists');
            }

            // Hash password
            const hashedPassword = await this.hashPassword(userData.password);

            // Create new user
            const newUser = new User({
                ...userData,
                password: hashedPassword
            });

            await newUser.save();

            // Generate token
            const token = this.generateToken(newUser);

            return {
                user: newUser.toJSON(),
                token
            };
        } catch (error) {
            if (error instanceof ValidationError) {
                throw error;
            }
            throw new Error('Registration failed');
        }
    }

    static async login(credentials) {
        try {
            // Find user by email or username
            const user = await User.findByEmail(credentials.email) ||
                        await User.findByUsername(credentials.email);

            if (!user) {
                throw new AuthenticationError('Invalid credentials');
            }

            // Verify password
            const isValidPassword = await this.verifyPassword(credentials.password, user.password);
            if (!isValidPassword) {
                throw new AuthenticationError('Invalid credentials');
            }

            // Generate token
            const token = this.generateToken(user);

            return {
                user: user.toJSON(),
                token
            };
        } catch (error) {
            if (error instanceof AuthenticationError) {
                throw error;
            }
            throw new AuthenticationError('Login failed');
        }
    }

    static async getCurrentUser(token) {
        try {
            const decoded = this.verifyToken(token);
            const user = await User.findById(decoded.id);

            if (!user) {
                throw new AuthenticationError('User not found');
            }

            return user.toJSON();
        } catch (error) {
            throw new AuthenticationError('Invalid token');
        }
    }

    static async changePassword(userId, oldPassword, newPassword) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new ValidationError('User not found');
            }

            // Verify old password
            const isValidPassword = await this.verifyPassword(oldPassword, user.password);
            if (!isValidPassword) {
                throw new ValidationError('Current password is incorrect');
            }

            // Hash new password
            const hashedNewPassword = await this.hashPassword(newPassword);

            // Update user
            user.password = hashedNewPassword;
            user.updatedAt = new Date().toISOString();

            await user.save();

            return { message: 'Password changed successfully' };
        } catch (error) {
            if (error instanceof ValidationError) {
                throw error;
            }
            throw new Error('Password change failed');
        }
    }
}

module.exports = AuthService;