import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
// import InitSeeder from 'src/database/seeds/init.seeder';
import { DataSource, DataSourceOptions } from 'typeorm';
// import { SeederOptions } from 'typeorm-extension';

dotenvConfig({ path: '.env' });

const config = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  autoLoadEntities: true,
  synchronize: process.env.NODE_ENV == 'local' ? true : false,
  logging: true,
  entities: ['./dist/**/*.entity{.ts,.js}'],
  migrations: ['./dist/database/migrations/*.{ts,js}'],
  migrationsTableName: 'migrations',
  cli: {
    migrationsDir: './dist/database/migrations/*.{ts,js}',
  },
  retryAttempts: 3, // Añade esto
  retryDelay: 3000, // Añade esto
  //   seeds: [InitSeeder],
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
