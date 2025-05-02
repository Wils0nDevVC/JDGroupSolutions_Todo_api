import rateLimit from 'express-rate-limit';

// Rate limiter para login: permite 3 intentos por IP en un intervalo de 15 minutos
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutos
  max: 3,  // Permitir solo 3 intentos
  message: 'Demasiados intentos de login. Inténtalo de nuevo más tarde.',
});
