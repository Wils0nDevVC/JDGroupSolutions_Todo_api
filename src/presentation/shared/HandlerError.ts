import { errorLogger } from './../middlewares/error-logger.middleware';
import { Response,Request } from "express";
import { CustomError } from "../../domain";

export const handlerError = (error: unknown, res: Response, req: Request) => {
  // Registra el error en el archivo de log
  if (error instanceof CustomError) {
    errorLogger(error, req, res, () => {}); // Llama al logger para registrar el error
    return res.status(error.statusCode).json({ error: error.message });
  }

  // Si no es un CustomError, manejamos otro tipo de error
  errorLogger(error, req, res, () => {}); // También lo registramos si es otro tipo de error
  res.status(500).json({ error: 'Error interno del servidor.' });
};
