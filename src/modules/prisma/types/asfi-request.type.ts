import { Prisma } from 'generated/prisma';

export type AsfiRequestWithFile = Prisma.AsfiRequestGetPayload<{
  include: { file: true };
}>;
