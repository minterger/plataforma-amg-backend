import Chofer from "../models/Chofer.js";
import Empresa from "../models/Empresa.js";

export const createChofer = async (req, res) => {
  const { nombre, apellido, dni, empresaId } = req.body;
  try {
    const existChofer = await Chofer.findOne({ dni });
    if (existChofer)
      return res.status(404).json({
        message: "El chofer ya existe",
      });

    const empresa = await Empresa.findById(empresaId);

    if (!empresa)
      return res.status(404).json({
        message: "La Empresa no existe",
      });

    const newChofer = new Chofer({
      nombre,
      apellido,
      dni,
      empresa: empresaId,
    });

    const chofer = await newChofer.save();

    empresa.choferes.push(chofer.id);

    await empresa.save();

    res.json({
      message: "Nuevo chofer agregado",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

export const updateChofer = async (req, res) => {
  const { idBody, nombre, apellido, dni, oldEmpresa, newEmpresa } = req.body;
  const idQuery = req.query.id;

  try {
    const id = idBody ? idBody : idQuery;

    let chofer = {};

    if (id) {
      chofer = await Chofer.findById(id);
    } else if (dni) {
      chofer = await Chofer.findOne({ dni });
    } else {
      return res
        .status(404)
        .json({ message: "No se ingreso valor de busqueda" });
    }

    if (!chofer)
      return res.status(404).json({ message: "No se encontro el Chofer" });

    chofer.nombre = nombre || chofer.nombre;
    chofer.apellido = apellido || chofer.apellido;
    chofer.dni = dni || chofer.dni;
    chofer.empresa = newEmpresa || oldEmpresa;

    if (newEmpresa) {
      /*

      FALTA CODIGO
      RELLENAR

      */
    }

    /*
    
    falta resultado y guardar nuevo usuario

    */
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "internal server error",
    });
  }
};
