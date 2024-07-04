const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const routerStudent = require('../src/student/studentController.js')
const routerAdmin = require('../src/admin/adminController.js')
const { logging, authUser, authorizeRole } = require('../src/middleware/auth.js')
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
// app.use(authUser)
app.use("/admin", authUser, authorizeRole('ADMIN'), routerAdmin)
// app.use("/admin", routerAdmin)

app.use((req, res, next) => {
    res.status(404).json({ error: `404  - Page Not Found` });
});


app.listen(PORT, () => {    
    console.log(`Server Running on PORT: ${PORT}`)
})