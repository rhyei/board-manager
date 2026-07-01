-- CreateTable
CREATE TABLE "BoardInspection" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "week" INTEGER NOT NULL,
    "inspector" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "defectType" TEXT NOT NULL,
    "defect" TEXT NOT NULL,
    "worker" INTEGER NOT NULL,

    CONSTRAINT "BoardInspection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoardInventory" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "week" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "product" TEXT NOT NULL,
    "worker" INTEGER NOT NULL,

    CONSTRAINT "BoardInventory_pkey" PRIMARY KEY ("id")
);
