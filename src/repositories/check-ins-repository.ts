import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  findByUerIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
}
