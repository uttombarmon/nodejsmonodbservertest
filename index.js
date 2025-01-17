const express = require('express');
const app = express()
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = 3000

app.use(express.json());
const uri = process.env.URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);
async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        app.get('/all', async (req, res) => {
            try {
                const data = await client.db("collegeproject").collection("staffdata").find().toArray();
                res.send(data);
            } catch (error) {
                console.log(error);

            }
        })
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
        // console.log("closed");

    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log("Server Console...!");

})