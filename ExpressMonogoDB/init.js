const mongoose = require('mongoose');
const Chat=require("./models/chat.js")

main()
    .then(() => {
        console.log("Connection successful");
    })
    .catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats=[
    {
        from:"Priya",
        to:"Rahul",
        msg:"Hello 1",
        created_at: new Date() 
    },
    {
        from:"Ram",
        to:"Mono",
        msg:"Hello 2",
        created_at: new Date() 
    },
    {
        from:"Priyanka",
        to:"KL Rahul",
        msg:"Hello 3",
        created_at: new Date() 
    },
    {
        from:"Sripriya",
        to:"Rakul",
        msg:"Hello 4",
        created_at: new Date() 
    },
    {
        from:"Priti",
        to:"Ramu",
        msg:"Hello 5",
        created_at: new Date() 
    },
    {
        from:"Prachi",
        to:"Ranu",
        msg:"Hello 6",
        created_at: new Date() 
    },
    {
        from:"Pinki",
        to:"Bob",
        msg:"Hello 7",
        created_at: new Date() 
    },
    {
        from:"Priyam",
        to:"Allu",
        msg:"Hello 8",
        created_at: new Date() 
    },
    {
        from:"Aish",
        to:"Salman",
        msg:"Hello 9",
        created_at: new Date() 
    },
    {
        from:"Rashi",
        to:"Khanna",
        msg:"Hello 10",
        created_at: new Date() 
    },
];

Chat.insertMany(allChats);