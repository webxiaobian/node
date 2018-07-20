let MongoClient = require('mongodb').MongoClient;
exports.ObjectID = require('mongodb').ObjectID;
// 依赖项

let Dburl = 'mongodb://localhost:27017/stuManager';

// 定义功能函数
 class connectDB{
        constructor(callback){
                MongoClient.connect(Dburl,(err,db)=>{
                    if(err){
                        console.log('数据库链接失败');
                        return;
                    }
                    callback(db);
                })
        }
        
  };
// 增
// 第一个参数是要操作的集合名称，第二个是对集合添加的数据 ，第三个是完成操作后的跳转
  exports.fnInsert = (collectionName,json,cb)=>{
    new  connectDB((db)=>{
        // 完成添加功能
        // 确定集合
        let collection = db.collection(collectionName);
        collection.insert(json,(err,data)=>{
            cb(err,data)  
            db.close();
        })
      })
  };

exports.fnFind = (collectionName,json,cb)=>{
    new connectDB((db)=>{
      // 完成查询功能
      // 确定集合
      let collection = db.collection(collectionName);
      collection.find(json).toArray((err,data)=>{
        cb(err,data);  
        db.close();

    })
    })
}

exports.fnRemove =(collectionName,json,cb)=>{
    new connectDB((db)=>{
      // 完成查询功能
      // 确定集合
      let collection = db.collection(collectionName);
      collection.remove(json,(err,data)=>{
            db.close();
            cb(err,data);
     });
    })
}
// 改 json1 表示修改的条件  json2 表示修改的字段
exports.fnupdate = (collectionName,json1,json2,cb)=>{
    new connectDB((db)=>{
      // 完成查询功能
      // 确定集合
      let collection = db.collection(collectionName);
      collection.update(json1,{$set:json2},(err,data)=>{
            db.close();
            cb(err,data);
     });
    })
}