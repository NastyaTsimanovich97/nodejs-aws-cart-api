import { resolve } from 'path';
import * as dotenv from 'dotenv';

export enum Type {
  STRING = 'string',
  INT = 'int',
  FLOAT = 'float',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
}

export const load = (...path) => {
  const options: Parameters<typeof dotenv.config>[0] = {};

  if (path.length) {
    options.path = resolve(...path);
  }

  dotenv.config(options);
};

function get(name: string): string;
function get(name: string, type: Type.STRING): string;
function get(name: string, type: Type.INT): number;
function get(name: string, type: Type.FLOAT): number;
function get(name: string, type: Type.NUMBER): number;
function get(name: string, type: Type.BOOLEAN): boolean;
function get(
  name: string,
  type: Type = Type.STRING,
): string | number | boolean {
  const value = ((process.env[name] ?? '') + '').trim();

  switch (type) {
    case Type.INT:
      return parseInt(value, 10);
    case Type.FLOAT:
      return parseFloat(value);
    case Type.NUMBER:
      return +value;
    case Type.BOOLEAN:
      return value.toLowerCase() === 'true';
    case Type.STRING:
    default:
      return value;
  }
}

export { get };

export default { get, load, ...Type };
