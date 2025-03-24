const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const FileStorage = require('session-file-store')(session);
require('dotenv').config()

const app = express();
const PORT = process.env.NODE_PORT;

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(session({
    store: new FileStorage({ path: './sessions' }),
    secret: process.env.SECRET_KEY,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 3600000 }
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
app.use('/course', courseRouter);

app.listen(PORT, () => {
    console.log(`Server Listening on http://localhost:${PORT}`)
});