-- CreateTable
CREATE TABLE "Driver" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "number" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "manufacturer" VARCHAR(100) NOT NULL,
    "model" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CarToDriver" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Driver_number_key" ON "Driver"("number");

-- CreateIndex
CREATE UNIQUE INDEX "_CarToDriver_AB_unique" ON "_CarToDriver"("A", "B");

-- CreateIndex
CREATE INDEX "_CarToDriver_B_index" ON "_CarToDriver"("B");

-- AddForeignKey
ALTER TABLE "_CarToDriver" ADD CONSTRAINT "_CarToDriver_A_fkey" FOREIGN KEY ("A") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarToDriver" ADD CONSTRAINT "_CarToDriver_B_fkey" FOREIGN KEY ("B") REFERENCES "Driver"("id") ON DELETE CASCADE ON UPDATE CASCADE;
