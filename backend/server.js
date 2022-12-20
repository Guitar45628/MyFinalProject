const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const { MongoClient, ObjectId } = require('mongodb');
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);
app.use(cors())
app.use(express.json());

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`)
})

app.get('/', (req, res) => {
    // res.send('Hello Welcome to brainstroke system')
    res.redirect('/brainstroke');
})

app.get('/brainstroke', async (req, res) => {
    await client.connect();
    const objects = await client.db('mydb').collection('brainstroke').find({}).limit(200).toArray();
    await client.close();
    res.status(200).send(objects);
})

//นับจำนวนเอกสารเพื่อสร้างจำนวนหน้า
app.get('/brainstroke/createpage', async (req, res) => {
    await client.connect();
    const results = await client.db('mydb').collection('brainstroke').estimatedDocumentCount();
    await client.close();
    res.status(200).send({results});
})

//ใช้เพื่อดึงข้อมูลมาแสดงในหน้านั้นๆ
app.get('/brainstroke/p/:page/:list_item', async (req, res) => {
    const { params } = req;
    let page = parseInt(params.page)
    let skipy = parseInt(params.list_item)
    page = page*skipy
    await client.connect();
    const results = await client.db('mydb').collection('brainstroke').estimatedDocumentCount();
    const objects = await client.db('mydb').collection('brainstroke').find({}).skip(page).limit(skipy).toArray();
    await client.close();
    res.status(200).send({
        "objects":objects,
        "documentCount": results});
})

//ใช้สำหรับ
app.get('/brainstroke/gender', async (req, res) => {
    const client = new MongoClient(uri);
    await client.connect();
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

app.get('/brainstroke/search/:searchText', async (req, res) => {
    const { params } = req;
    const searchText = params.searchText
    const client = new MongoClient(uri);
    await client.connect();
    const objects = await client.db('mydb').collection('brainstroke').find({ $text: { $search: searchText } }).toArray();
    const totaldoc = await client.db('mydb').collection('brainstroke').countDocuments();
    await client.close();
    res.status(200).send({
        "status": "ok",
        "searchText": searchText,
        "Complaint": objects,
        "Counter":totaldoc
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

/*---Experiment---*/

//Clean all data in brainstroke collection
app.delete('/experiment/clean', async (req, res) => {
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('mydb').collection('brainstroke').deleteMany({})
    await client.close();
    res.status(200).send({
        "status": "ok",
    });
})

//Restore all data from backup to brainstroke
app.get('/experiment/restore', async (req, res) => {
    const client = new MongoClient(uri);
    await client.connect();
    const dataSource = await client.db('mydb').collection('backup').find({}).toArray();
    await client.db('mydb').collection('brainstroke').deleteMany({})
    await client.db('mydb').collection('brainstroke').insertMany(dataSource)
    await client.close();
    res.status(200).send(dataSource);
})

//Duplicate data
app.get('/experiment/duplicate/:round', async (req, res) => {
    const { params } = req;
    const round = parseInt(params.round)
    const client = new MongoClient(uri);
    await client.connect();
    for (let i=1; i<= round;i++){
        console.log(i)
        const dataSource = await client.db('mydb').collection('brainstroke').find({}).project({"_id":0}).toArray();
        //await client.db('mydb').collection('brainstroke').deleteMany({})
        await client.db('mydb').collection('brainstroke').insertMany(dataSource)
    }
    await client.close();
    res.status(200).send();
})
/*---THE END---*/