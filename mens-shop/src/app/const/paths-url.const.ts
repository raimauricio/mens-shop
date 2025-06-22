export const PATHS_URL = {
  LOGIN: 'http://localhost:8080/auth/login',
  COMPRA: (id: number) =>  `http://localhost:8080/compra/${id}`,
  PRODUCTS: 'http://localhost:8080/produtos',
  REGISTRO: 'http://localhost:8080/auth/registro',
  USUARIO: (id: number) => `http://localhost:8080/usuario/${id}`
};
