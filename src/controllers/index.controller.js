import uniqid from "uniqid";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs/promises";
import generatePDF from "../helpers/generatepdf.js";
// import Empresa from "../models/Empresa.js";
// import Viaje from "../models/Viaje.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

String.prototype.toCamelCase = function () {
  return this.trim()
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(" ");
};

/**
 * obtiene el contrate de flete segun el id del viaje
 * @param {Object} req proviene de Express
 * @param {Object} res proviene de Express
 */
export const getContratoFlete = async (req, res) => {
  // const { id } = req.params;

  const id = uniqid.time("AMG-").toUpperCase();
  // const id = "AMG-M0R1R217";

  // const viaje = await Viaje.findById(id);

  generatePDF({
    id,
    // date: "6 de Septiembre de 2024",
    datos_tafico: {
      origen: "Buenos Aires, Argentina",
      destino: "Santiago, Chile",
      mercaderia: "Cosmeticos",
      crt: "001AR.318.006159",
      // remito: "-",
    },
    emp_contratada: {
      // empresa: "",
      // id_tributaria: "",
      // empresa: "ADRIAN MARTIN SILIONI",
      // id_tributaria: "20311067355",
      // empresa: "BARRERA JUAN NUNCIO",
      // id_tributaria: "20106041238",
      // empresa: "GABRIEL ROLANDO VERCESI",
      // id_tributaria: "20-23141665-0",
      // empresa: "RAMOS RAMON RICARDO",
      // id_tributaria: "20-10038819-8",
      // empresa: "CCOTRANS SRL",
      // id_tributaria: "30-71007609-6",
      // empresa: "PONCE FRANCO HUMBERTO",
      // id_tributaria: "20-32728521-2",
      // empresa: "MARENGO HERMANOS S.A.",
      // id_tributaria: "30-71039140-4",
      // empresa: "GARCIA, JORGE MARCELO",
      // id_tributaria: "20-26919825-8",
      // empresa: "GONZALEZ LUCIO",
      // id_tributaria: "20-18521256-5",
      // empresa: "MANSUR ELIAS",
      // id_tributaria: "20-32651967-8",
      // empresa: "LEMOS MATIAS EDUARDO",
      // id_tributaria: "23-33966927-9",
      // empresa: "DON GIL S.A.",
      // id_tributaria: "30-70968347-7",
      // empresa: "MANOJO S.A.",
      // id_tributaria: "30-70848357-1",
      empresa: "GUERRERO ROBERTO OSVALDO...",
      id_tributaria: "30-63483048-7",
      // empresa: "GABRIEL FERRER S.A.",
      // id_tributaria: "30-71279930-3",
      // empresa: "TRANSPORTES ZAMARIAN S.R.L.",
      // id_tributaria: "30-70799197-2",
      // empresa: "APPUGLIESE PATRICIA FANNY",
      // id_tributaria: "27-17553716-9",
      // empresa: "SANCHEZ CRISTIAN",
      // id_tributaria: "20-32133475-0",
      // empresa: "EDUARDO ALBERTO BIZZOTTO",
      // id_tributaria: "20-13085704-4",
      // empresa: "LOGISTICA INTERNACIONAL FB SPA",
      // id_tributaria: "76.560.088-K",
    },
    datos_unidad: {
      placa_tractor: "AE472NM",
      placa_semi: "AE472NL",
      chofer: "EMILIO MONTARDIT",
      dni: "26664021",
    },
    contratacion: {
      valor: "1,800.00",
      moneda: "USD",
      condicion_pago: "VTO DE PAGO A 45 DIAS UNA VEZ LLEGUEN LOS ORIGINALES",
      // condicion_pago: "VTO DE PAGO A 30 DIAS UNA VEZ LLEGUEN LOS ORIGINALES",
    },
    datos_facturacion: {
      // razon_facturacion: "-",
      // cuit_rut_facturacion: "-",
      // razon_facturacion: "AMG SIN FRONTERAS S.A.S.",
      // cuit_rut_facturacion: "30-71846247-5",
      // razon_facturacion: "M.I.L.M.A.R. S.A.",
      // cuit_rut_facturacion: "30-71118581-6",
      razon_facturacion: "TRANSPORTE AMG LIMITADA",
      cuit_rut_facturacion: "77-698245-8",
      // razon_facturacion: "PANTONE BLANCA NIEVES",
      // cuit_rut_facturacion: "27-16330921-7",
    },

    recordatorios:
      "A LA HORA DE ENTREGA DE DOCUMENTACION, ADJUNTAR CONTRATO DE FLETE Y FACTURA",
    // "TENER EN CUENTA QUE AL MOMENTO EN QUE SE GENERA EL CONTRATO NO SE TOMA EN CUENTA INCIDENTE, EL VIAJE ESTA EN OBSERVACION HASTA VER QUE ESTE CORRECTO",
    // "A LA HORA DE ENTREGA DE DOCUMENTACION, ADJUNTAR CONTRATO DE FLETE Y FACTURA,  TENER EN CUENTA QUE AL MOMENTO DEL PAGO SE RESTA EL 7% DE RETENCION POR FACTURACION EN TUCUMAN",
    // "A LA HORA DE ENTREGA DE DOCUMENTACION, ADJUNTAR CONTRATO DE FLETE Y FACTURA, TOMAR EN CUENTA QUE LOS 40 USD POR CLIENTE ES APARTIR DEL SEGUNDO CLIENTE, NO TOMAR EL PRIMER CLIENTE",
    // "A LA HORA DE ENTREGA DE DOCUMENTACION, ADJUNTAR CONTRATO DE FLETE",
  });

  res.sendFile(path.join(__dirname, `../public/${id}.pdf`));

  setTimeout(async () => {
    await fs.unlink(path.join(__dirname, `../public/${id}.pdf`));
  }, 2);
};

export const getContratoFleteIndex = async (req, res) => {
  const id = req.body.id || uniqid.time("AMG-").toUpperCase();
  const date = req.body.date;

  generatePDF({
    id,
    date,
    datos_tafico: {
      origen: req.body.origen?.toCamelCase(),
      destino: req.body.destino?.toCamelCase(),
      mercaderia: req.body.mercaderia?.trim(),
      crt: req.body.crt?.trim(),
      remito: req.body.remito?.trim(),
    },
    emp_contratada: {
      empresa: req.body.razon_social?.trim().toUpperCase(),
      id_tributaria: req.body.cuit?.trim(),
    },
    datos_unidad: {
      placa_tractor: req.body.patente_tractor?.trim().toUpperCase(),
      placa_semi: req.body.patente_semi?.trim().toUpperCase(),
      chofer: req.body.chofer?.trim().toUpperCase(),
      dni: req.body.dni?.trim(),
    },
    contratacion: {
      valor: req.body.valor
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        .concat(".00"),
      moneda: req.body.moneda?.trim() || "USD",
      condicion_pago:
        req.body.condicion_pago?.trim().toUpperCase() ||
        "VTO DE PAGO A 45 DIAS UNA VEZ LLEGUEN LOS ORIGINALES",
    },
    datos_facturacion: {
      razon_facturacion: req.body.razon_social_facturacion
        ?.trim()
        .toUpperCase(),
      cuit_rut_facturacion: req.body.cuit_facturacion?.trim(),
    },

    recordatorios:
      req.body.descripcion_contrato?.trim().slice(0, 250) ||
      "A LA HORA DE ENTREGA DE DOCUMENTACION, ADJUNTAR CONTRATO DE FLETE Y FACTURA",
  });

  res.sendFile(path.join(__dirname, `../public/${id}.pdf`));

  setTimeout(async () => {
    await fs.unlink(path.join(__dirname, `../public/${id}.pdf`));
  }, 2);
};
