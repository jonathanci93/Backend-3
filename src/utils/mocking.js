import { fakerES as faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const PASSWORD_TEXT = "coder123";
const PASSWORD_HASH_READY = bcrypt.hash(PASSWORD_TEXT, 10); //* se calcula una vez

//* Genera un usuario falso
export const makeMockUser = async () => {
  const passwordHash = await PASSWORD_HASH_READY;
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email().toLowerCase(),
    password: passwordHash, 
    role: faker.helpers.arrayElement(["user", "admin"]),
    pets: []
  };
};

//* Genera una mascota falsa
export const makeMockPet = () => {
  const specieChoice = faker.helpers.arrayElement(["dog", "cat", "bird", "other"]);
  return {
    name: faker.animal.petName(),
    specie: specieChoice,
    birthDate: faker.date.past({ years: 10 }),
    adopted: faker.datatype.boolean()
  };
};

//* Genera muchos usuarios
export const makeManyUsers = async (quantity = 50) =>
  Promise.all(Array.from({ length: quantity }, () => makeMockUser()));

//* Genera muchas mascotas
export const makeManyPets = (quantity = 50) =>
  Array.from({ length: quantity }, () => makeMockPet());

