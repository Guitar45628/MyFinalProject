const express = require('express')
const cors = require('cors')
const { MongoClient, ObjectId } = require('mongodb');
const app = express()
const port = 3000

app.use(cors())
app.use(express.json());



// const uri = 'mongodb://localhost:27017';
const uri = "mongodb://127.0.0.1:27017/";

const connectDB = async () => {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log('MongoDB is now conneted.')

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

connectDB();


app.get('/', (req, res) => {
    res.send('Hello World! Let\'s Working with NoSQL Databases')
})

app.get('/slist', async (req, res) => {
    const client = new MongoClient(uri);
    await client.connect();
    const objects = await client.db('mydb').collection('s_collection').find({}).toArray();
    await client.close();
    res.status(200).send(objects);
})

app.get('/secret', async (req, res) => {
    const client = new MongoClient(uri);
    await client.connect();
    //project ป้องกันข้อมูลบางตัวไม่ให้แสดงผลออกมา
    const objects = await client.db('mydb').collection('s_collection').find({}).project({ _id: 0, Savings: 0, GPA: 0, Salary: 0 }).toArray();
    await client.close();
    res.status(200).send(objects);
})

app.post('/slist/create', async (req, res) => {
    const object = req.body;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('mydb').collection('s_collection').insertOne({
        "StudentID": object['StudentID'],
        "Title": object['Title'],
        "Name": object['Name'],
        "Surname": object['Surname'],
        "Field": object['Field'],
        "Project": object['Project'],
        "Savings": object['Savings'],
        "GPA": object['GPA'],
        "Salary": object['Salary']

    });
    await client.close();
    res.status(200).send({
        'status': 'ok',
        'message': 'Object is created.',
        'Object': object['StudentID']
    });
})

app.put('/slist/update', async (req, res) => {
    const object = req.body;
    const id = object._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('mydb').collection('s_collection').updateOne({ '_id': ObjectId(id) },
        {
            "$set": {
                "_id": ObjectId(id),
                "StudentID": object['StudentID'],
                "Title": object['Title'],
                "Name": object['Name'],
                "Surname": object['Surname'],
                "Field": object['Field'],
                "Project": object['Project'],
                "Savings": object['Savings'],
                "GPA": object['GPA'],
                "Salary": object['Salary']

            }
        });

    await client.close();
    res.status(200).send({
        'status': 'ok',
        'message': 'Object is updated.',
        'Object ID': id
    });
})



app.delete('/slist/delete', async (req, res) => {
    const id = req.body._id;
    const client = new MongoClient(uri);
    await client.connect();

    await client.db('mydb').collection('s_collection').deleteOne({ '_id': ObjectId(id) });

    await client.close();
    res.status(200).send({
        'status': 'ok',
        'message': "Object is deleted",
        'Object ID': id

    })
})

app.get('/slist/find/:searchText', async (req, res) => {
    const { params } = req;
    const searchText = params.searchText
    const client = new MongoClient(uri);
    await client.connect();
    const objects = await client.db('mydb').collection('s_collection').find({ $text: { $search: searchText } }).toArray();
    await client.close();
    res.status(200).send({
        "status": "ok",
        "searchText": searchText,
        "Complaint": objects
    });
})

// Read by id API
app.get('/slist/:id', async (req, res) => {
    const { params } = req;
    const id = params.id
    const client = new MongoClient(uri);
    await client.connect();
    const object = await client.db('mydb').collection('s_collection').findOne({ "_id": ObjectId(id) });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "ID": id,
        "object": object
    });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})