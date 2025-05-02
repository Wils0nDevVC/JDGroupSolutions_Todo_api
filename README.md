
### Backend

## Base Datos
   - MongoDB

## Rest Project + TypeScript

Este proyecto previamente inicializado tiene todo lo necesario para trabajar con TypeScript, Express y Rest.

## Patrones
  - Adaptador
  - Dtos
  - Inyección de dependencias
  - Repository



## Instalación

1. Clonar repositorio ```https://github.com/Wils0nDevVC/JDGroupSolutions_Todo_api.git```
1. Ejecutar `npm install` para instalar las dependencias
2. En caso de necesitar base de datos, configurar el docker-compose.yml y ejecutar `docker-compose up -d` para levantar los servicios deseados.
3. Ejecutar `npm run dev` para levantar el proyecto en modo desarrollo


### Endpoint 

## LOGIN - REGISTER 
- http://localhost:3200/api/auth/login
- http://localhost:3200/api/auth/register
## TASK - LISTAR - CREAR - ACTUALIZAR - ELIMINAR
- GET -  http://localhost:3200/api/task/
- GET -  http://localhost:3200/api/task/id
- POST - http://localhost:3200/api/task/
- PUT - http://localhost:3200/api/task/id
- DELETE - http://localhost:3200/api/task/id

