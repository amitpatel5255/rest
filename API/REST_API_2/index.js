const libexpress = require("express");
const app = libexpress();
const users = require ('./MOCK_DATA.json')
const PORT = 5000;
// ------ all routes--------

//------------show all users
app.get('/api/users',(req,res)=>{
    return( res.json(users))
})



// -----------show pertucular id
app.get('/api/users/:id',(req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=>user.id === id)
    return( res.json(user))
})

//-------post method--------------

app.post('/api/users',(req,res)=>{
    const id = Number(req.params.id);
    
    const newMember = {
        "id": users.length +1,
        "first_name": "AMIT",
        "last_name": "PATEL",
        "email": "AMIT@GMAIL.COM",
        "gender": "Male",
        "Job_title": "Computer Systems Analyst II"
    };
    users.push(newMember);
    res.status(200).json({ user: newMember });
})

// PUT method
app.put('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex !== -1) {
        const updatedUser = { ...users[userIndex], ...req.body };
        users[userIndex] = updatedUser;
        return res.json(updatedUser);
    } else {
        return res.status(404).json({ error: 'User not found' });
    }
});

// PATCH method 

app.patch('/api/users/:id',(req,res)=>{
    const id = Number(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex !== -1) {
        const updatedUser = { ...users[userIndex], ...req.body };
        users[userIndex] = updatedUser;
        return res.json(updatedUser);
    } else {
        return res.status(404).json({ error: 'User not found' });
    }
    
})
//---------delet method-----------

app.delete('/api/users/:id',(req,res)=>{
    const id = Number(req.params.id);
    //     find id-------
    const userIndex = users.findIndex(user=>user.id === id);
    if(userIndex !== -1){
        const userdelete = users.splice(userIndex,1)[0];
        return res.json(userdelete)
    } else {
        // If the user is not found, return a 404 status with an error message
        return res.status(404).json({ error: 'User not found' });
    }
    
})
//-------------server---------------
app.listen(PORT,()=>{
    console.log('server listen at port 5000');
})