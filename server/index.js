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
import {register} from './controllers/auth.js'


// Configurations - middleware (different request 사이에서 실행되는 함수)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

// set directory of where we our assets, in this project images
app.use("/assets", express.static(path.join(__dirname, 'public/assets'))); 

// file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, "public/assets")
  },
  filename: function(req, file, cb){
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })

// routes with files
app.post("/auth/register", upload.single("picture"), register);

// routes 
app.use("/auth", authRoutes);
app.use("/users", userRoutes)

// Mongoose setup
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`))
}).catch((err) => console.log('fail to connect to the MongoDB'))
