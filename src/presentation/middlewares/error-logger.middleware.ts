import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

export const errorLogger = (err: any, req: Request, res: Response, next: NextFunction) => {
  const logPath = path.resolve(__dirname, '../../../logs/error.log');  // Asegúrate de que la ruta sea correcta
  const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.url} - ${err.message}\n${err.stack}\n\n`;

  // Asegura que el directorio exista
  fs.mkdirSync(path.dirname(logPath), { recursive: true });

  // Guarda el error en un archivo
  fs.appendFileSync(logPath, logMessage, 'utf8');

  // También lo puedes mostrar en consola para desarrollo
  console.error(logMessage);

  next(err); // Pasa el error al handler final
};
