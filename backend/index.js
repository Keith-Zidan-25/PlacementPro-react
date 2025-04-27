const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { connectDB } = require('./mongoose');

require('dotenv').config()
connectDB()

const app = express();
const PORT = process.env.NODE_PORT;

app.use(bodyParser.json());
app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            'https://p1sjwjx5-5173.inc1.devtunnels.ms',
            'http://localhost:5173'
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}))
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions',
        ttl: 3600,
    }),
    secret: process.env.SECRET_KEY,
    saveUninitialized: false,
    resave: false,
    cookie: { 
        maxAge: 360000,
        // sameSite: 'none',
        // secure: true
    }
}));
app.use((req, res, next) => {
    next();
});

const authRouter = require('./routes/api/AuthenticationRouter');
const fileRouter = require('./routes/api/FileRouter');
const quizRouter = require('./routes/api/QuizRouter');
const userRouter = require('./routes/UserRouter');
const courseRouter = require('./routes/CourseRouter');

app.use('/api/auth', authRouter);
app.use('/api/file', fileRouter);
app.use('/api/quiz', quizRouter)
app.use('/user', userRouter);
app.use('/api/courses', courseRouter);

app.listen(PORT, () => {
    console.log(`Server Listening on http://localhost:${PORT}`)
});