import Product from "../models/Product.js"
import ProductStat from "../models/ProductStat.js"
import User from "../models/User.js"
import Transaction from "../models/Transaction.js"
import countryIso2To3 from "country-iso-2-to-3"



/* Retrieving Products From our API */

// We could also do the same with an Aggregate Call. 
export const getProducts = async (req, res) => {
    try {
        // Gives us the product we requested
        const products = await Product.find()
        const productsWithStats = await Promise.all(
            products.map(async (product) => {
                // Finds the products stats using their unique productId
                const stat = await ProductStat.find({
                    productId: product._id,
                })
                // returning an array of a product info and associated stats
                return {
                    ...product._doc,
                    stat,
                }
            })
        );
        res.status(200).json(productsWithStats);
    }
    catch (error) {
        res.status(404).json({message: error});
    }
}

/* Retrieving Customers From our API */
export const getCustomers = async (req, res) => {
    try {
        const customers = await User.find({role: "user"}).select("-password"); //Keeps password from being added
        res.status(200).json(customers)
    }
    catch (error) {
        res.status(404).json({message: error});
    }

}

/* Get Transactions And Pass In Params */
export const getTransactions = async (req, res) => {
    try {
        // sort should look like this: { "field": "userId", "sort": "desc"}
        // Our default option
        const {page = 1, pageSize = 20, sort = null, search = ""} = req.query;

        // formatted sort should look like { userId: -1 }
        const generateSort = () => {
            const sortParsed = JSON.parse(sort);
            const sortFormatted = {
                [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
            };

            return sortFormatted;
        };
        const sortFormatted = Boolean(sort) ? generateSort() : {};
        // finds documents that costs or UserId equals our search value
        const transactions = await Transaction.find({
            $or: [
                {cost: {$regex: new RegExp(search, "i")}},
                {userId: {$regex: new RegExp(search, "i")}},
            ],
        })
            .sort(sortFormatted)
            .skip(page * pageSize)
            .limit(pageSize);

        const total = await Transaction.countDocuments({
            // counts how many documents in which the costs or userId equals our search value
            $or: [
                {cost: {$regex: new RegExp(search, "i")}},
                {userId: {$regex: new RegExp(search, "i")}},
            ],
        });

        res.status(200).json({
            transactions,
            total,
        });
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

// Gets the user country from user data
export const getGeography = async (req, res) => {
    try {
        const users = await User.find()

        // We are coverting the country in each user's account to the correct string
        const mappedLocations = users.reduce((acc, {country}) => {
            const countryISO3 = countryIso2To3(country);


            if (!acc[countryISO3]) { // acc is set to an empty object
                acc[countryISO3] = 0;
            }
            acc[countryISO3]++ //adds 1 to the country we will add up all the totals later
            return acc; //returns all the accounts with updated information 
        }, {});

        // MappedLocations =  {USA: 1, MEX: 3}

        const formattedLocations = Object.entries(mappedLocations).map(([country, count]) => {
            return {id: country, value: count}
        });

        res.status(200).json(formattedLocations)
    }
    catch (error) {
        res.status(404).json({message: error.message})
    }
}