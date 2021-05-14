import app from "./app";
const mongoose = require('mongoose')

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}...`)
});

  // To get rid of Mongoose deprecation warnings.
//   const options = {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useFindAndModify: false
//   }
  
//   // Connecting the database and then starting the app.
// //   mongoose.connect(DB_URL, options, () => {
// //     app.listen(PORT, () => console.log('Listening on http://localhost:${PORT}...'))
// //   })
  
//   .catch((err: any) => console.log(err))