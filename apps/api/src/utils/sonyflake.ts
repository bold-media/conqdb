import Sonyflake from 'sonyflake';

let idGeneratorInstance: Sonyflake;

import config from '../config/standalone.config';

export const sonyflake = (): Sonyflake => {
  if (!idGeneratorInstance) {
    idGeneratorInstance = new Sonyflake({
      machineId: config.machineId,
      epoch: Date.UTC(2024, 5, 1, 0, 0, 0, 0),
    });
  }

  return idGeneratorInstance;
};

export function generateSonyflakeId(): string {
  return sonyflake().nextId();
}
