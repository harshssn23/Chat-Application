const express=require("express");
const app=express();
const mongoose = require('mongoose');
const Chat=require("./models/chat.js")
const methodOverride=require("method-override");

const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main()
    .then(() => {
        console.log("Connection successful");
    })
    .catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// let chat1=new Chat({
//     from:"Priya",
//     to:"Rahul",
//     msg:"Hello",
//     created_at: new Date() //UTC
// });

// chat1.save()
// .then((res)=>{console.log(res)})
// .catch((err)=>{console.log(err)});

app.get("/",(req,res) => {
    res.send("Hello World!");
})

//Index Route
app.get("/chats",async (req,res) => {
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs",{chats});
})

//New Route
app.get("/chats/new",(req,res) => {
    res.render("new.ejs");
})

//Create Route
app.post("/chats",(req,res) => {
    let {from,to,msg}=req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg:msg,
        created_at: new Date()
    });
    // console.log(newChat);
    newChat.save()
    .then((res)=>{console.log("Chat was saved")})
    .catch((err)=>{console.log(err)});
    res.redirect("/chats");
})

//Edit Route
app.get("/chats/:id/edit", async (req,res) => {
    // res.send("ok");
    let {id}=req.params;
    let chat = await Chat.findById(id)
    res.render("edit.ejs",{chat});
})

//Update Route
app.put("/chats/:id", async (req,res)=> {
    let {id}=req.params;
    let {msg: newMsg}=req.body;
    // console.log(newMsg);
    let updateChat = await Chat.findByIdAndUpdate(
        id,
        {msg: newMsg},
        {runValidators: true, new:true}
    );
    console.log(updateChat);
    res.redirect("/chats");
} )

//Destroy Route
app.delete("/chats/:id", async (req,res) => {
    let {id}=req.params;
    let chat = await Chat.findByIdAndDelete(id);
    console.log(chat);
    // res.send("Ok..")
    res.redirect("/chats");
})

app.listen(8080, ()=>{
    console.log("Server is listening on port 8080");
})