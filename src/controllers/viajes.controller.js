import Viaje from "../models/Viaje.js";

/**
 * Obtiene todos los viajes
 * @param {Object} req proviene de Express
 * @param {Object} res proviene de Express
 */
export const getViajes = async (req, res) => {
  try {
    const { page, limit, search } = req.query;

    const options = {
      page: page || 1,
      limit: limit || 10,
    };

    const viajes = await Viaje.paginate({}, options);

    res.json(viajes);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });

    console.error(error);
  }
};

export const createViaje = async (req, res) => {
  try {
    const viaje = new Viaje({
      fechaInicio: req.body.fechaInicio,
      fechaFinViaje: req.body.fechaFinViaje,
      fechaRecepcion: req.body.fechaRecepcion,
      fechaFacturacion: req.body.fechaFacturacion,
      diasParaPago: req.body.diasParaPago,
      mic: req.body.mic,
      crt: req.body.crt,
    });
    await viaje.save();
    res.status(201).json(viaje);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.error(error);
  }
};

export const getViajeById = async (req, res) => {
  try {
    const { id } = req.params;
    const viaje = await Viaje.findById(id);
    if (viaje) {
      res.json(viaje);
    } else {
      res.status(404).json({ message: "Viaje no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.error(error);
  }
};

export const updateViaje = async (req, res) => {
  try {
    const { id } = req.params;
    // actualizar el viaje con los datos del cuerpo de la solicitud parcialmente
    const updatedViaje = await Viaje.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (updatedViaje) {
      res.json(updatedViaje);
    } else {
      res.status(404).json({ message: "Viaje no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.error(error);
  }
};

export const deleteViaje = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedViaje = await Viaje.findByIdAndDelete(id);

    if (deletedViaje) {
      res.json({ message: "Viaje eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Viaje no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.error(error);
  }
};
