import mongoose from "mongoose"

const connectDb = async()=>{
   try {
     await mongoose.connect(process.env.MONGODB_URL)
        console.log("data base conncected successfully")
   } catch (error) {
      console.log("database conncection error", error)
   }
}

export default connectDb;