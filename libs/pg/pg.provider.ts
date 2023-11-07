import { Inject, Injectable } from "@nestjs/common";
import { Pool } from "pg";
import { PgOptions } from "./pg-options.interface";
import { PG_OPTIONS } from "./pg.constants";

@Injectable()
export class PgProvider {
  private readonly pool: Pool;
  private connected = false;

  constructor(@Inject(PG_OPTIONS) pgOptions: PgOptions) {
    this.pool = new Pool({ connectionString: pgOptions.url });
  }

  async query(sql: string, values?: unknown[]) {
    if (!this.connected) {
      await this.pool.connect();
      this.connected = true;
    }

    return this.pool.query(sql, values);
  }
}
