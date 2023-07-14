import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import multer from 'multer'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import { verifyToken } from './middleware/auth.js'
import {createPost} from './controllers/posts.js'


// Configurations - middleware (different request 사이에서 실행되는 함수)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

dotenv.config();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(express.urlencoded({extended: false}));
app.use(cors());

// set directory of where we our assets, in this project images
app.use("/assets", express.static(path.join(__dirname, 'public/assets'))); 

// file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(__dirname, "public/assets")
  },
  filename: function(req, file, cb){
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })

// routes with files
app.post("/posts", verifyToken, upload.single("picture"), createPost);

// routes 
app.use("/api/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`포트 ${port}에서 서버 운영 중`))

const connectDB = async () => {
  try{
    const connext = await mongoose.connect(process.env.MONGO_URL,
      { useNewUrlParser: true, useUnifiedTopology:true }
      )
      console.log(`데이터 베이스에 연결 되었습니다. 포트는 ${port}`)
  }catch(err){
    console.log(err)
  }
}
connectDB();