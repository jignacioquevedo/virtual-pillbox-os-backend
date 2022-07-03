require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const PORT = process.env.PORT || 3001;
const ObraSocial = require("./models/ObraSocial");

const app = express();

app.use(express.json());
app.use(cors());

morgan.token("data", (req, res) => {
  const body = JSON.stringify(req.body);
  return body;
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

app.post("/api/os", (req, res, next) => {
  const { nombre, nroAfiliado, plan, dniUsuario } = req.body;

  if (!nombre || !nroAfiliado || !plan || !dniUsuario) {
    return res.status(400).json({
      error:
        "Falta información. El nombre, número de afiliado, dni de usuario y el plan son requeridos.",
    });
  }

  const nuevaObraSocial = new ObraSocial({
    nombre,
    nroAfiliado,
    plan,
    dniUsuario,
  });

  nuevaObraSocial
    .save()
    .then((savedOs) => res.json(savedOs))
    .catch(next);
});

app.get("/api/os/:dniUsuario", (req, res, next) => {
  const { dniUsuario } = req.params;

  ObraSocial.find({ dniUsuario: dniUsuario })
    .then((data) => res.json(data))
    .catch(next);
});

app.delete("/api/os/:id", (req, res, next) => {
  const { id } = req.params;

  ObraSocial.findByIdAndRemove(id)
    .then(() => res.status(204).end())
    .catch(next);
});

app.put("/api/os/:id", (req, res, next) => {
  ObraSocial.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((updatedOs) => {
        res.json(updatedOs);
    })
    .catch(next)
});

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  console.error(error.name)

  if (error.name === 'CastError') {
    res.status(400).json({error: 'malformatted id'})
  }

  next(error)
}

app.use(errorHandler)

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto", PORT);
});
