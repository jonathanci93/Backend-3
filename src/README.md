#  Proyecto Backend 3 - Adopción de Mascotas

Proyecto de Backend 3 entrega final
API rest con manejo de usuarios, mascotas, adoptiones. Utilizando Node.js, Express, Mongo DB y Docker


# Tecnologías Utilizadas
- Node.js + Express  
- MongoDB + Mongoose  
- Docker y Docker Compose  


#  Levantar con Docker Compose
(En terminal bash)

docker compose up -d


URL api: 

 http://localhost:8080



# Documentación Swagger

Una vez corriendo el contenedor, accedé a la documentación interactiva en:  

http://localhost:8080/docs


# Tests Funcionales

El proyecto incluye pruebas automáticas para el flujo de adopción:

Archivo: `src/test/adoption.test.js`

# Ejecutar los tests localmente:

npm test


O dentro del contenedor Docker:

docker compose exec api npm test


# Casos validados:
✅ `POST /api/adoption/:uid/:pid` → adopta una mascota  
✅ `GET /api/adoption` → lista todas las adopciones  
✅ `DELETE /api/adoption/:pid` → revierte la adopción  

---

# Docker Hub

La imagen del proyecto en Docker Hub:  
 [https://hub.docker.com/r/jonathanci93/backend3_jonathanci](https://hub.docker.com/r/jonathanci93/backend3_jonathanci)



## Ejecutar el contenedor

docker run -p 8080:8080 jonathanci93/backend3_jonathanci:1.0.0


Una vez ejecutado, podés acceder a: 
- API base: http://localhost:8080/api/users, /api/pets, /api/adoption
- Documentación Swagger: http://localhost:8080/docs




