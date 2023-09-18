const mongoose = require('mongoose');

// const mongoURI = "mongodb+srv://localhost:27017/inotebook"
const mongoURI = "mongodb+srv://demo:demo@atlascluster.xmypo6s.mongodb.net/?retryWrites=true&w=majority"

mongoose.set("strictQuery", false);

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;