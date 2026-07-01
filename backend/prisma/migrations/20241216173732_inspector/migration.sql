-- AlterTable
ALTER TABLE "BoardInspection" ALTER COLUMN "inspector" SET DEFAULT 'Undefined',
ALTER COLUMN "product" SET DEFAULT 'Undefined',
ALTER COLUMN "defectType" SET DEFAULT 'Undefined',
ALTER COLUMN "defect" SET DEFAULT 'Undefined';

-- AlterTable
ALTER TABLE "BoardInventory" ADD COLUMN     "inspector" TEXT NOT NULL DEFAULT 'Undefined',
ALTER COLUMN "product" SET DEFAULT 'Undefined';
