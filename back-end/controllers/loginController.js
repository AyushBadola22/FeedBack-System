export const LoginController = async (req, res) => {
    const {uid , password} = req.body; 
    console.log(uid, password);
    if(uid != null && password != null){
        res.send(`Login data recived ${uid} , ${password}` ); 
    }
};