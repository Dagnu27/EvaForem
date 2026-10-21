function register(req,res) {
  res.send("registered")
}

function login(req,res) {
  res.send("login")
}

function checkUser(req,res) {
  res.send("checkUser")
}

module.exports={register,login,checkUser}