export const PATHS_URL = {
  LOGIN: 'https://mens-shop-api-production-9e78.up.railway.app/auth/login',
  COMPRA: (id: number) =>  `https://mens-shop-api-production-9e78.up.railway.app/compra/${id}`,
  PRODUCTS: 'https://mens-shop-api-production-9e78.up.railway.app/produtos',
  REGISTRO: 'https://mens-shop-api-production-9e78.up.railway.app/auth/registro',
  USUARIO: (id: number) => `https://mens-shop-api-production-9e78.up.railway.app/usuario/${id}`
};
