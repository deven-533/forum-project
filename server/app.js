require('dotenv').config()
const express = require('express')
const app = express()
require('express-async-errors')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path')
const helmet = require('helmet');
const xss = require('xss-clean');

// const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const userRouter = require('./routes/userRoutes')
const questionRouter = require('./routes/questionRoutes')
const answerRouter = require('./routes/answerRoutes')
const connectDB = require('./db/connect')
const authRouter = require('./routes/authRoutes')
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const {
    authenticateUser,
    authorizePermissions,
} = require('./middleware/authentication');
// const { authMiddleware } = require('./middleware/authMiddleware')


app.use(helmet());
app.use(cors({
    credentials : true,
    origin : 'http://localhost:3000'
}));
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(morgan('tiny'));
app.use(cookieParser(process.env.JWT_SECRET));

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter);
// app.use('/api/v1/answers', answerRouter);
app.use('/api/v1/questions',authenticateUser, questionRouter);
// app.use('/api/v1/answers',)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000

mongoose.set("strictQuery", true);
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () =>
            console.log(`Server is listening on port ${PORT}...`)
        );
    } catch (error) {
        console.log(error);
    }
};


start()


