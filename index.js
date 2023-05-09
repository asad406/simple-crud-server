const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 5000;
const app = express();

//middleware
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://asad406:80HLkYLUtKqh7E2Y@cluster0.n1ha416.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const usersCollection = client.db('usersDB').collection('users');

    //Data read form database
    app.get('/users', async(req,res) => {
      const cursor = usersCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })
//Data receive from client and data insert to database from server.
    app.post('/users', async (req, res) => {
      const user = req.body;
      console.log(user)
      const result = await usersCollection.insertOne(user);
      console.log(result)
      res.send(result)

    })
receive 

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.log);

app.get('/', (req, res) => {
  res.send('Server is onLine')
})

app.listen(port, () => {
  console.log('server is running at port', port)
})















/* const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000

//Middleware
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://asad406:80HLkYLUtKqh7E2Y@cluster0.n1ha416.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("usersDB");
    const usersCollection = database.collection("users");

    app.post('/users', async(req, res) =>{
      const newUser = req.body;
      console.log('new user',newUser);
      const result = await usersCollection.insertOne(newUser)
      res.send(result)
    });


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.log);




app.get('/', (req, res) => {
  res.send('Message from server');
})

app.listen(port,()=>{
  console.log('server is running from port', port)
})  */