import Vehiculo from "../models/Vehiculo.js";

/**
 * Obtiene todos los vehiculos
 * @param {Object} req proviene de Express
 * @param {Object} res proviene de Express
 */

export const getVehiculos = async (req, res) => {
  try {
    const { page, limit, search } = req.query;

    const options = {
      page: page || 1,
      limit: limit || 10,
    };

    const vehiculos = await Vehiculo.paginate({}, options);

    res.json(vehiculos);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });

    console.error(error);
  }
};

/**
 * Obtiene un vehiculo por id
 * @param {Object} req proviene de Express
 * @param {Object} res proviene de Express
 */
export const getVehiculo = async (req, res) => {
  try {
    const { id } = req.params;

    const vehiculo = await Vehiculo.findById(id);

    if (vehiculo) {
      res.json(vehiculo);
    } else {
      res.status(404).json({
        message: "No existe este vehiculo",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

/**
 * Crea un vehiculo
 * @param {Object} req proviene de Express
 * @param {Object} res proviene de Express
 */
export const createVehiculo = async (req, res) => {
  const { marca, modelo, patente, empresaId } = req.body;
  try {
    const existVehiculo = await Vehiculo.findOne({ patente });
    if (existVehiculo)
      return res.status(404).json({
        message: "El vehiculo ya existe",
      });

    const newVehiculo = new Vehiculo({
      marca,
      modelo,
      patente,
      empresa: empresaId,
    });

    const vehiculo = await newVehiculo.save();

    res.json({
      message: "Nuevo vehiculo agregado",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "internal server error",
    });
  }
};
