const express = require('express')
const app = express()
const cors = require('cors')
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

const { MongoClient, ObjectId } = require('mongodb');
const uri = 'mongodb://127.0.0.1:27017';

// const connectDB = async() => {
//     try {
//         const client = new MongoClient(uri);
//         await client.connect();
//         console.log('MongoDB is now conneted.')

//     } catch (error) {
//         console.log(error);
//         process.exit(1);
//     }
// }

// connectDB();

app.get('/brainstroke', async (req, res) => {
    const client = new MongoClient(uri);
    await client.connect();
    // const objects = await client.db('mydb').collection('s_collection').find({}).sort({"GPA": -1}).limit(10).project({_id:0}).toArray();
    const objects = await client.db('mydb').collection('brainstroke').find({}).limit(20).toArray();
    await client.close();
    res.status(200).send(objects);
})

app.get('/brainstroke/range/:start-:end', async (req, res) => {
    const { params } = req;
    const start = parseInt(params.start)
    const temp_end = parseInt(params.end)
    const end = temp_end - start
    const client = new MongoClient(uri);
    await client.connect();
    // const objects = await client.db('mydb').collection('s_collection').find({}).sort({"GPA": -1}).limit(10).project({_id:0}).toArray();
    const objects = await client.db('mydb').collection('brainstroke').find({}).toArray();
    await client.db('mydb').collection('temp').deleteMany({});
    await client.db("mydb").collection("temp").insertOne({"temp":objects})
    const result = await client.db('mydb').collection('temp').find({}).project({"temp":1,"temp":{$slice:[start,end]}}).toArray()
    await client.close();
    console.log(result)
    res.status(200).send(result);
})

app.get('/brainstroke/page/:start', async (req, res) => {
    const { params } = req;
    const start = parseInt(params.start)
    const client = new MongoClient(uri);
    await client.connect();
    // const objects = await client.db('mydb').collection('s_collection').find({}).sort({"GPA": -1}).limit(10).project({_id:0}).toArray();
    const objects = await client.db('mydb').collection('brainstroke').find({}).toArray();
    const totaldoc = await client.db('mydb').collection('brainstroke').countDocuments();
    await client.db('mydb').collection('temp').deleteMany({});
    await client.db("mydb").collection("temp").insertOne({"temp":objects})
    const result = await client.db('mydb').collection('temp').find({}).project({"temp":{$slice:[start,50]}}).toArray()
    const obj = result[0].temp
    res.status(200).send({
        "objects":obj,
        "Counter":totaldoc
    });
})


app.get('/brainstroke/gender', async (req, res) => {
    const client = new MongoClient(uri);
    await client.connect();
    // const objects = await client.db('mydb').collection('s_collection').find({}).sort({"GPA": -1}).limit(10).project({_id:0}).toArray();
    const objects = await client.db('mydb').collection('brainstroke').find({}).toArray();
    await client.close();
    res.status(200).send({
        "status": "ok",
        "Complaint": objects
    });
})
app.get('/brainstroke/gender/:genderText', async (req, res) => {
    const { params } = req;
    const genderText = params.genderText
    //console.log(genderText)
    const client = new MongoClient(uri);
    await client.connect();
    if (genderText == "") {
        const objects = await client.db('mydb').collection('brainstroke').find({}).toArray();
        await client.close();
        res.status(200).send({
            "status": "ok",
            "genderText": genderText,
            "Complaint": objects
        });
    } else{
        const objects = await client.db('mydb').collection('brainstroke').find({ "gender": genderText }).toArray();
        await client.close();
        res.status(200).send({
            "status": "ok",
            "genderText": genderText,
            "Complaint": objects
        });
    }

})

app.post('/brainstroke/create', async (req, res) => {
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
        "stroke": object['stroke']
    });

    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Object is created"

    })
})

app.put('/brainstroke/update', async (req, res) => {
    const object = req.body;
    const id = object._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('mydb').collection('brainstroke').updateOne({ '_id': ObjectId(id) },
        {
            "$set": {
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
                "stroke": object['stroke']
            }
        });
    await client.close();
    res.status(200).send({
        'status': "ok",
        'message': "Object with ID " + id + " is updated.",
        'object': object
    });
})

app.delete('/brainstroke/delete', async (req, res) => {
    const id = req.body._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('mydb').collection('brainstroke').deleteOne({ "_id": ObjectId(id) });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Object with ID" + id + " is deleted."
    });
})

app.get('/brainstroke/clean', async (req, res) => {
    const client = new MongoClient(uri);
    await client.connect();
    const counter = client.db('mydb').collection('brainstorke').estimatedDocumentCount()
    await client.db('mydb').collection('brainstroke').deleteMany({})
    await client.close();
    res.status(200).send({
        "status": "ok",
    });
})

app.get('/brainstroke/search/:searchText', async (req, res) => {
    const { params } = req;
    const searchText = params.searchText
    const client = new MongoClient(uri);
    await client.connect();
    const objects = await client.db('mydb').collection('brainstroke').find({ $text: { $search: searchText } }).sort({ "Date received": -1 }).toArray();
    await client.close();
    res.status(200).send({
        "status": "ok",
        "searchText": searchText,
        "Complaint": objects
    });
})

app.get('/brainstroke/:id', async (req, res) => {
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