import env, { Type } from '../utils/env';

export default () =>
  ({
    database: {
      type: 'postgres' as const,
      host: env.get('POSTGRES_HOST'),
      port: env.get('POSTGRES_PORT', Type.INT),
      username: env.get('POSTGRES_USER'),
      password: env.get('POSTGRES_PASSWORD'),
      database: env.get('POSTGRES_DB'),
      entities: ['entities/public/**/.entity{.ts,.js}'],
      synchronize: false,
      autoLoadEntities: true,
      migrationsTableName: 'migrations',
      migrationsRun: false,
      migrations: ['../migrations/public/*.ts'],
      cli: {
        migrationsDir: 'migrations/public',
      },
      logging: env.get('POSTGRES_LOGGING', Type.BOOLEAN),
    },
  } as const);
