import { DataSource } from 'typeorm';
import { Product } from './models/productModel';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres', // замените на ваше имя пользователя
  password: 'password', // замените на ваш пароль
  database: 'myshop',
  synchronize: true,
  logging: false,
  entities: [Product],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Подключение к базе данных успешно установлено');
  })
  .catch((error) => console.log('Ошибка подключения к базе данных:', error));
