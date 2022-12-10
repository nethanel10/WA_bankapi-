import express,{json} from 'express' ;
import router from "./routes/routes.js";
const app=express();
const PORT=7000;
app.use(json());
app.use("/api/bankapi",router);
app.listen(PORT,()=>{
    console.log(`server is running on port ${ PORT}`);
});
