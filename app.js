import express,{json} from 'express' ;
import router from "./routes/routes.js";
const app=express();
const PORT=process.env.PORT || '7000';
console.log(PORT)
app.use(json());
app.use("/api/bankapi",router);
app.listen(PORT,()=>{
    console.log(`server is running on port ${ PORT}`);
});

