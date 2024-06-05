require('dotenv').config();

const app = require('./app');
const mongoDb = require("./db/mongodb");

const init = async () => {
    try {
      const mongoDbClient = mongoDb();
      await mongoDbClient.connectToMongoDb();
  
      const handleClose = async () => {
        await mongoDbClient.closeMongoDbConnection();
        process.exit(0);
      }
      process.on('SIGINT', handleClose);
      process.on('SIGTERM', handleClose);
  
      app.listen(process.env.PORT_NUMBER, () => {
        console.log("Connection Started on PORT", process.env.PORT_NUMBER);
      });
    } catch (error) {
      console.error("Initialization error:", error);
      process.exit(1);
    }
  };
  
  init();
