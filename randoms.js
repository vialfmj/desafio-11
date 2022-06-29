//generar numeros aleatorios
const getRandom = async() => {
  return  Math.floor(Math.random() * 1000);
}

//cargar los numeros generados en un array
const setArray = async (cant) => {
  console.log("setArray ->",cant)
  let arrayNumbers = []
  for(let i = 0; i < cant; i++){
    arrayNumbers = [...arrayNumbers, await getRandom()]
  }
  return arrayNumbers
}
//buscar repeticiones
const getCoincidencesCant = async (array) => {
  let cant = 0
  let obj = {}
  for (let index = 0; index < 1000; index++) {
    let newArray = array.filter(element => element === index)
    cant = await getArrayLength(newArray)
    obj = await addProperty(obj,index,cant)
  }
  return obj
}
//medir string 
const getArrayLength = async (array)=> {
  let cant = array.length
  return cant
}
//guardar la cantidad de repeticiones en un objeto
const addProperty = async (newObject, index, cant ) => {
  Object.defineProperty(newObject, `${index}`, {
    value: cant,
    writable: true,
    enumerable: true,
    configurable: true
  });
  return newObject
}
//mostrar objeto
const showObj = async (obj) => {
  console.log(obj)
  return
}

//iniciar programa
const startProgram = async(cant) => {
  let arrayNumbers = await setArray(cant)
  let obj = await getCoincidencesCant(arrayNumbers)
  return obj
}
process.on("message",async msg => {
  console.log(msg)
  if(msg.msg === "empezar"){
    obj = await startProgram(Number(msg.cant))
    process.send({obj: obj})

  }
})