import Empresa from "../models/Empresa.js";

/**
 * controlador que retorna array paginada con empresas
 * @param {Object} req proviene de Express
 * @param {Object} res proviene de Express
 * @returns retorna todas las empresas
 */
export const getEmpresas = async (req, res) => {
  const { page, limit, filter, search, type } = req.query;
  try {
    const options = {
      page: page || 1,
      limit: limit || 10,
    };

    let empresas;

    if (filter && search) {
      empresas = await Empresa.paginate({
        type,
        // buscar por empresa usando un regex que busca en cualquier parte de la cadena dentro de filter sin importar mayusculas o minusculas
        [filter]: { $regex: `.*${search}.*`, $options: "i" },
      });
    } else {
      empresas = await Empresa.paginate({ type }, options);
    }
    return res.json(empresas);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.error(error);
  }
};

/**
 * controlador que retorna una empresa por id_tributaria
 * @param {Object} req proviene de Express
 * @param {Object} res proviene de Express
 * @returns retorna una empresa
 */

export const getEmpresa = async (req, res) => {
  try {
    const { id, type } = req.params;

    const empresa = await Empresa.findOne({ _id: id, type }).populate("viajes");

    if (empresa) {
      res.json(empresa);
    } else {
      res.status(404).json({
        message: "No existe esta empresa",
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
 * controlador para crear una Empresa requiere dato "empresa" y "id_tributaria" en el body
 * @param {Object} req proviene de Express
 * @param {Object} res proviene de Express
 * @returns retorna si la empresa fue creada con exito
 */
export const createEmpresa = async (req, res) => {
  try {
    const { empresa, id_tributaria, type } = req.body;

    const format1 = /^(\d{2})(\d{3})(\d{3})(\d{1})?$/;
    const format2 = /^(\d{2})(\d{8})?(\d{1})?$/;

    // Devolver true si concuerda con alguno de los formatos
    if (format1.test(id_tributaria) || format2.test(id_tributaria)) {
      return res.json(404, {
        message: "Id tributaria incorrecta",
      });
    }

    if (!["transporte", "cliente"].includes(type)) {
      return res.json({ message: "Tipo de empresa incorrecto" });
    }

    const ifEmpresa = await Empresa.findOne({ id_tributaria });

    if (ifEmpresa) {
      if (!ifEmpresa.type.includes(type)) {
        ifEmpresa.type.push(type);

        await ifEmpresa.save();
        res.status(200).json({
          message: "La empresa se actualizo y se añadio como " + type,
        });
        return;
      }

      res.status(404).json({
        message: "La empresa ya existe: " + ifEmpresa.type,
      });
      return;
    }

    const newEmpresa = new Empresa({
      empresa,
      id_tributaria,
      type: [type],
    });

    await newEmpresa.save();

    res.json({
      message: "La empresa se guardo correctamente",
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.error(error);
  }
};

/**
 * Elimina una empresa por id que viene como un parametro id_tributaria
 * @param {Object} req proviene de Express
 * @param {Object} res proviene de Express
 * @returns retorna si la empresa fue eliminada o no
 */
export const deleteEmpresa = async (req, res) => {
  try {
    const { id, type } = req.params;

    const ifEmpresa = await Empresa.findById(id);

    if (!ifEmpresa)
      return res.status(404).json({
        message: "La empresa no existe",
      });

    if (!ifEmpresa.type.includes(type)) {
      return res.status(404).json({
        message: "La empresa se elimino correctamente",
      });
    } else {
      ifEmpresa.type = ifEmpresa.type.filter((t) => t !== type);
    }

    if (!!ifEmpresa.type.length) {
      await ifEmpresa.save();
    } else {
      await ifEmpresa.deleteOne();
    }

    return res.json({
      message: "La empresa se elimino correctamente",
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.error(error);
  }
};

/**
 * controlador para actualizar datos de empresa
 * @param {Object} req proviene de Express
 * @param {Object} res proviene de Express
 * @returns retorna respuesta a update Empresa
 */
export const updateEmpresa = async (req, res) => {
  try {
    const { id } = req.params;
    const { empresa, id_tributaria } = req.body;

    const searchEmpresa = await Empresa.findById({ id });

    if (!searchEmpresa)
      return res.status(404).json({
        message: "No se encontro ninguna empresa",
      });

    searchEmpresa.empresa = empresa || searchEmpresa.empresa;
    searchEmpresa.id_tributaria = id_tributaria || searchEmpresa.id_tributaria;

    await searchEmpresa.save();

    res.json({
      message: "La empresa fue actualizada",
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.error(error);
  }
};
