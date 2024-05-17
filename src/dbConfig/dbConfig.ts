import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!); // the " ! "  is used for ensuring there will come string,otherwise it give typescript error also we can do by if and typof to check etc..

    const connection = mongoose.connection;

    //by the mongoose.connection give us obj that we can fire like below methods to ensirity

    connection.on("connected", () => {
      //for successfull connection
      console.log("Connection is established!!");
    });

    connection.on("error", (err) => {
      console.log("MongoDB Connection failed !!",err);
      process.exit(); //this is for exit the process
    });

    
  } catch (error) {
    console.log("Error in connection with mongodb!!", error);
  }
}
