import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body
    const hashedPassword = await bcryptjs.hash(password, 10)
    const newUser = new User({ username, email, password: hashedPassword })
    try {
        await newUser.save()
        res.status(201).json({ message: 'User created successfully' })
    } catch (error) {
        next(error)
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) return next(errorHandler(404, 'User not Found'))
        const validPassword = bcryptjs.compareSync(password, user.password)
        if (!validPassword) return next(errorHandler(401, 'Wrong Password'))
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        const { password: hashedPassword, ...rest } = user._doc
        const expiryDate = new Date(Date.now() + 3600000 * 10) // 10 hour
        res.cookie('access_token', token, {
            httpOnly: true,
            expires: expiryDate,
        })
            .status(200)
            .json(rest)
    } catch (e) {
        next(error)
    }
}
