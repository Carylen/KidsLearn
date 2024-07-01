const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const routerStudent = require('./api/student/studentController.js')
const routerAdmin = require('./api/admin/adminController.js')
const { logging, authUser } = require('./api/middleware/auth.js')
// const { authorizeRole } = require('./middleware/auth.js')

const app = express()
app.use(express.json())
app.use(cors())

dotenv.config()
const PORT = process.env.PORT

// app.use((error, req, res, next) => {
//     res.status(error.status || 500);
//     res.json({
//         error: {
//             message: error.message
//         }
//     });
// });

app.use("/students", logging, routerStudent);
app.use("/admin", logging, authUser, routerAdmin)

app.use((req, res, next) => {
    res.status(404).json({ error: `404 Not Found` });
});


app.listen(PORT, () => {    
    console.log(`Server Running on PORT: ${PORT}`)
})