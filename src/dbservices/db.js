import * as Realm from "realm-web";

 
const app = new Realm.App({ id: 'application-0-vhypf' });



export const {
    BSON :{objectid},

} = Realm
const config = {
    realm :{
     client : 'mongodb-atlas',
     appId : 'application-0-vhypf',
     db: 'emotion',
  }  
}



export const getDBInstance = (appInstance) => {
    return appInstance.currentUser 
      .mongoClient(config.realm.client)
      .db(config.realm.db)
}

export const getData = async () => {
  console.log("current user",app.currentUser)
    return await getDBInstance(app).collection('collection')
     .find({})
}
export const getNewData = async () => {
  console.log("current user",app.currentUser)
    return await getDBInstance(app).collection('employee')
     .find({})
}

export const getAggregate = async(startdate, enddate) => {
  const query = [];
  // if(s){
  //   query.push({
  //     $
  //   })
  // }
  query.push({
    $group: {
      "_id": "$Average_emotion",
      "count": {
        "$sum": 1
      }
    }
  })
  return await getDBInstance(app).collection('collection')
  .aggregate(query)
}

export const insertDB = async ({values,imageFile}) => {
 return await getDBInstance(app).collection('employee')
     .insertOne({
      firstname:values.firstName,
      lastname:values.lastName,
      email:values.email,
      phoneNumber:Number(values.phone),
      jobTitle:values.jobtitle,
      Image : imageFile

    })
}

export const deletDB = async ({deletid}) => {
  return await getDBInstance(app).collection('employee')
      .deleteOne ({_id:deletid})
 }

 export const updateDB = async ({values,mongoid}) => {
  console.log("mongoid",values)
  return await getDBInstance(app).collection('employee')
      .updateOne({_id: Realm.BSON.ObjectId(mongoid)},{$set:{
        firstname:values.firstName,
        lastname:values.lastName,
        email:values.email,
        phoneNumber:Number(values.phone),
        jobTitle:values.jobtitle
      }})
 }
 export const getupdateData = async (mongoid) => {
  console.log("current user",mongoid)
    return await getDBInstance(app).collection('employee')
     .findOne({_id:Realm.BSON.ObjectId(mongoid)})
}



