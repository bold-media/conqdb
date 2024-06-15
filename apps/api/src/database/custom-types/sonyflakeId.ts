import { generateSonyflakeId } from '@app/utils/sonyflake';
import { customType } from 'drizzle-orm/pg-core';

export const sonyflakeId = (name: string) =>
  customType<{ data: string; driverData: bigint }>({
    dataType() {
      return 'bigint';
    },
    fromDriver(value: bigint): string {
      return value.toString();
    },
    toDriver(value: string): bigint {
      return BigInt(value);
    },
  })(name);
