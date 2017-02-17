import { Env } from './env'

export const Config = {
  apiUrl: Env.current == "Development" ? "http://localhost:29416/api/" : "http://localhost:29416/api/",
  toastrTimeout: 5000
};
