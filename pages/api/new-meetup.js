// /api/new-meetup
// POST /api/new-meetup
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    // const uri =
    // "mongodb+srv://tterki:ncVVaUTXHXgjnWYQ@cluster0.xwjatjb.mongodb.net/meetups?retryWrites=true&w=majority";
    const client = await MongoClient.connect(
      "mongodb+srv://tterki:ncVVaUTXHXgjnWYQ@cluster0.xwjatjb.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: "Meetup Inserted!" }); //201: code to indicate that something was inserted succesfully
  }
}

export default handler;
