import { Prisma } from 'generated/prisma';

export type AsfiFundTransferWithFile = Prisma.AsfiFundTransferGetPayload<{
  include: { file: true; asfiRequest: { select: { circularNumber: true; requestCode: true } } };
}>;
