import { Schema, model } from "mongoose";
import MongoosePaginate from "mongoose-paginate-v2";
import uniqid from "uniqid";

const ObjectId = Schema.ObjectId;

const ViajeSchema = new Schema(
  {
    id: { type: ObjectId, default: uniqid.time("AMG-").toUpperCase() },
    fechaInicio: { type: Date },
    fechaFinViaje: { type: Date },
    fechaRecepcion: { type: Date },
    fechaFacturacion: { type: Date },
    diasParaPago: { type: Number },
    mic: { type: String },
    crt: { type: String },
    datos_tafico: {
      origen: { type: String, required: true },
      destino: { type: String, required: true },
      mercaderia: { type: String, required: true },
    },
    emp_contratada: { type: ObjectId, required: true, ref: "Empresa" },
    datos_unidad: {
      placa_tractor: { type: String, required: true },
      cambio_tractor: { type: String },
      placa_semi: { type: String, required: true },
      chofer: {
        nombre: { type: String, required: true },
        dni: { type: String, required: true },
      },
      cambio_chofer: {
        nombre: { type: String },
        dni: { type: String },
      },
    },
    contratacion: {
      valor: { type: Number, required: true },
      moneda: { type: String, required: true },
      condicion_pago: { type: String, required: true },
    },
    recordatorios: String,
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

ViajeSchema.plugin(MongoosePaginate);

export default model("Viaje", ViajeSchema);
