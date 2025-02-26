function status(request, response){
  response.status(200).json({nome: "johny", idade: 29, profissao: "programador"});  
}

export default status;
