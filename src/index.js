const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const routerStudent = require('./student/studentController.js')
const routerScore = require('./score/scoreController')
const app = express()
app.use(express.json())
app.use(cors())

dotenv.config()
const PORT = process.env.PORT


// app.use((req, res, next) => {
//     const error = new Error('Not Found');
//     error.status = 404;
//     next(error);
// });

// app.use((error, req, res, next) => {
//     res.status(error.status || 500);
//     res.json({
//         error: {
//             message: error.message
//         }
//     });
// });

app.use("/students", routerStudent);

app.use("/scores",routerScore)

app.listen(PORT, () => {    
    console.log(`Server Running on PORT: ${PORT}`)
})