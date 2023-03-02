import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import User from "./models/User.js";
import Product from "./models/Product.js"
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStats.js";
import {dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat, dataAffiliateStat} from "./data/index.js";



// Data Function
const insertData = async (dataModel, data) => {
    try {
        const existingData = await dataModel.find({});
        if (existingData.length === 0) {
            await dataModel.insertMany(data);
        }
    } catch (error) {
        console.log(error);
    }
};



/* Configuration */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(cors());

/* Client Routes */
// These Represent the different routes for the different pages in the application
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* Mongoose Connection */
const PORT = process.env.PORT || 5000;
console.log(PORT)
mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${ PORT }`))

        /* Only Inserting Data Once */
        // insertData(User, dataUser);
        // insertData(Product, dataProduct);
        // insertData(ProductStat, dataProductStat)
        // insertData(Transaction, dataTransaction)
        // insertData(OverallStat, dataOverallStat)
        // insertData(AffiliateStat, dataAffiliateStat)

    })
    .catch((error) => console.log(error.message));
