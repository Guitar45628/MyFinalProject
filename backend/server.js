const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    // res.send('Hello Welcome to brainstroke system')
    res.redirect('/brainstroke');
})

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`)
})

const {MongoClient, ObjectId} = require('mongodb');
const uri = 'mongodb://127.0.0.1:27017';

const connectDB = async() => {
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

app.get('/brainstroke', async(req, res) => {
    const client = new MongoClient(uri);
    await client.connect();
    // const objects = await client.db('mydb').collection('s_collection').find({}).sort({"GPA": -1}).limit(10).project({_id:0}).toArray();
    const objects = await client.db('mydb').collection('brainstroke').find({}).limit(20).toArray();
    await client.close();
    res.status(200).send(objects);

})

app.post('/brainstroke/create', async(req, res) => {
    const object = req.body;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('mydb').collection('brainstroke').insertOne({
        "gender": object['gender'],
        "age": object['age'],
        "hypertension": object['hypertension'],
        "heart_disease": object['heart_disease'],
        "ever_married": object['ever_married'],
        "work_type": object['work_type'],
        "Residence_type": object['Residence_type'],
        "avg_glucose_level": object['avg_glucose_level'],
        "bmi": object['bmi'],
        "smoking_status": object['smoking_status'],
        "stroke":object['stroke']
    });

    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Object is created"
        
    })
})

app.put('/brainstroke/update', async(req, res) => {
    const object = req.body;
    const id = object._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('mydb').collection('brainstroke').updateOne({'_id': ObjectId(id)}, 
    {"$set": {
        "gender": object['gender'],
        "age": object['age'],
        "hypertension": object['hypertension'],
        "heart_disease": object['heart_disease'],
        "ever_married": object['ever_married'],
        "work_type": object['work_type'],
        "Residence_type": object['Residence_type'],
        "avg_glucose_level": object['avg_glucose_level'],
        "bmi": object['bmi'],
        "smoking_status": object['smoking_status'],
        "stroke":object['stroke']
    }});
    await client.close();
    res.status(200).send({
        'status': "ok",
        'message': "Object with ID "+id+" is updated.",
        'object': object
    });
})

app.delete('/brainstroke/delete', async(req, res) => {
    const id = req.body._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('mydb').collection('brainstroke').deleteOne({"_id": ObjectId(id)});
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Object with ID"+ id + " is deleted."
    });
})


app.get('/brainstroke/search/:searchText', async(req, res) => {
        const { params } = req;
        const searchText = params.searchText
        const client = new MongoClient(uri);
        await client.connect();
        const objects = await client.db('mydb').collection('brainstroke').find({ $text: {$search: searchText } }).sort({ "Date received": -1 }).toArray();
        await client.close();
        res.status(200).send({
          "status": "ok",
          "searchText": searchText,
          "Complaint": objects
        });
      })

app.get('/brainstroke/:id', async(req, res) => {
        const id = req.params.id;
        const client = new MongoClient(uri);
        await client.connect();
        const object = await client.db('mydb').collection('brainstroke').findOne({ "_id": ObjectId(id) });
        await client.close();
        res.status(200).send({
            "status": "ok",
            "ID": id,
            "Complaint": object
        });
    })