const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("Connecting to", url);

mongoose
  .connect(url)
  .then(() => {
    console.log("Connectado a la BD");
  })
  .catch((error) => console.log(error));

const obraSocialSchema = new mongoose.Schema(
  {
    nombre: String,
    nroAfiliado: String,
    plan: String,
    dniUsuario: String,
  },
  { collection: "obras-sociales" }
);

obraSocialSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

const ObraSocial = mongoose.model("ObraSocial", obraSocialSchema);

module.exports = ObraSocial;
