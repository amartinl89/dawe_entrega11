
const Cliente = require('../models/cliente');


async function subirUsuario(nombre, apellido, email) {
  console.log('Subiendo usuario:', nombre, apellido, email);
  try{
    //return await Cliente.create({ nombre, apellido, email });
    const newCliente = new Cliente({ nombre, apellido, email });
    return await newCliente.save();
  }catch(error){
    console.error('Error al subir usuario:', error);
    return null;
  }
}

async function eliminarCliente(id){
  console.log('Eliminando cliente:', id);
  try{
    await Cliente.findByIdAndDelete(id);
  }catch(error){
    console.error('Error al eliminar cliente:', error);
    //return null;
  }
}
async function editarCliente(nombre, apellido, email, id){
  console.log('Editando cliente:', id);
  try{
    await Cliente.findByIdAndUpdate(id,{$set:{'nombre':nombre, 'apellido':apellido, 'email':email}});
  }catch(error){
    console.error('Error al editar cliente:', error);
    //return null;
  }
}

async function seleccionarCliente(id){
  console.log('Seleccionando cliente:', id);
  try{
    return await Cliente.findById(id);
  }catch(error){
    console.error('Error al seleccionar cliente:', error);
    return null;
  }
}


  //Exportar funciones
  module.exports = {
    subirUsuario,
    eliminarCliente,
    editarCliente,
    seleccionarCliente
  };