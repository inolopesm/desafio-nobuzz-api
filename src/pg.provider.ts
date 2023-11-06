import { Injectable } from "@nestjs/common";
import { Pool } from "pg";

@Injectable()
export class PgProvider {
  private readonly pool: Pool;
  private connected = false;

  constructor(connectionString: string) {
    this.pool = new Pool({ connectionString });
  }

  async query(sql: string, values?: unknown[]) {
    if (!this.connected) {
      await this.pool.connect();
      this.connected = true;
    }

    return this.pool.query(sql, values);
  }
}
