import express from "express";
import multer from "multer";
import moment from "moment";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import users from "./users.mjs";
import { v4 as uuidv4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const defaultData = {users: [], products: []};
const db = new Low(new JSONFile("./db.json") ,defaultData);
await db.read();

dotenv.config();
const secretKey = process.env.SECRET_KEY_LOGIN;
const upload = multer();

const whiteList = ["http://localhost:5500", "http://127.0.0.1:5500"];
const corsOptions = {
  credentials: true,
  origin(origin, callback){
    if(!origin || whiteList.includes(origin)){
      callback(null, true);
    }else{
      callback(new Error("不允許傳遞資料"))
    }
  }
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/api/products", (req, res) => {
  res.status(200).json({message: "得到所有產品"});
});

app.post("/api/products", upload.none(), (req, res) => {
  res.status(200).json({message: "新增一個產品"});
});

app.get("/api/products/1", (req, res) => {
  const id = req.params.id;
  res.status(200).json({message: "得到產品 ID 為 1 的檔案"});
});

app.put("/api/products/1", upload.none(), (req, res) => {
  const id = req.params.id;
  res.status(200).json({message: "更新 ID 為 1 的產品"});
});

app.delete("/api/products/1", (req, res) => {
  const id = req.params.id;
  res.status(200).json({message: "刪除 ID 為 1 的產品"});
});

app.get("/api/products/search", (req, res) => {
  const id = req.query.id
  res.status(200).json({message: `使用 ID 作為搜尋條件來搜尋產品 ${id}`});
});

app.listen(3000, () => {
  console.log("running at http://localhost:3000");
})