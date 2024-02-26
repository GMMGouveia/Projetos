const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
app.use(express.json());




///     CORS
/* app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
}) */



// Set up CORS
app.use(cors({
    origin: true, // "true" will copy the domain of the request back
                  // to the reply. If you need more control than this
                  // use a function.

    credentials: true, // This MUST be "true" if your endpoint is
                       // authenticated via either a session cookie
                       // or Authorization header. Otherwise the
                       // browser will block the response.

    methods: 'POST,GET,PUT,OPTIONS,DELETE' // Make sure you're not blocking
                                           // pre-flight OPTIONS requests
}));





const userRouter = require('./users/UserRouter');
app.use('/api/users',userRouter);

const tutorRouter = require('./Tutors/TutorRouter');
app.use('/api/tutors',tutorRouter);

const teacherRouter = require('./Teachers/TeacherRouter');
app.use('/api/teachers',teacherRouter);

const studentRouter = require('./Students/StudentRouter');
app.use('/api/students',studentRouter);

const classesRouter = require('./ClassesRoom/ClassesRouter');
app.use('/api/classes',classesRouter);


const conection = "mongodb+srv://goncalomGouveia:Gouveia12345@techof.00ekxg0.mongodb.net/Kindergarden?retryWrites=true&w=majority"

mongoose.connect(conection,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const port = 3000
//routes

app.listen(port);