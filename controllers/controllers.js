import uniqId from "uniqid";
import {writeFileSync,readFileSync} from "fs";
const Addnewuser=(userData)=>{
    const users = loadUsers();
    const newUser={
        id:uniqId(),
        ...userData
    }
    if(newUser.cash === undefined) newUser = {...newUser, cash: 0}
    users.push(newUser)
    saveUsers(users)
    return newUser;
}

const Readuser=(id)=>{
    const users=loadUsers();
    const findUser=users.find((u)=>u.id===id);
    if(!findUser){
        throw new Error("The user does not exist!");
    }
    return findUser;
}

const loadUsers=()=>{
    try{
const readdata=readFileSync("./db/users.json")
const datajson=readdata.toString();
return JSON.parse(datajson)
    }
    catch(err){
        return [];
    }
}
const saveUsers=(users)=>{
    const datajson=JSON.stringify(users);
    writeFileSync("./db/users.json",datajson);

};

const deposit = (id, amount) => {
    const users = loadUsers()
    const updatedUsers = users.map(user => {
        if(user.id === id) return {...user, cash: user.cash + amount}
        return user
    })
    saveUsers(updatedUsers)
    return "cash deposited successfuly."
}

const transfer = (from, to, amount) => {
    const users = loadUsers()
    const updatedUsers = users.map(user => {
        if(user.id === from && (user.cash + user.credit) >= amount) return {...user, cash: user.cash - amount}
        if(user.id === to) return {...user, cash: user.cash + amount}
        return user
    })
    saveUsers(updatedUsers)
    return "cash transfered successfuly."
}

const updateCredit = (id, newCredit) => {
        const users = loadUsers()
        const updatedUsers = users.map(user => {
            if(user.id === id) return {...user, credit: newCredit}
            return user
        })
        saveUsers(updatedUsers)
        return "credit updated successfuly."
}

export {Addnewuser,Readuser,deposit, updateCredit, transfer, loadUsers};
