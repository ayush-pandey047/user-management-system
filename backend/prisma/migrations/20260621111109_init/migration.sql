-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "primaryMobile" VARCHAR(10) NOT NULL,
    "secondaryMobile" VARCHAR(10),
    "aadhaar" VARCHAR(12) NOT NULL,
    "pan" VARCHAR(10) NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "placeOfBirth" VARCHAR(150) NOT NULL,
    "currentAddress" TEXT NOT NULL,
    "permanentAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_aadhaar_key" ON "users"("aadhaar");

-- CreateIndex
CREATE UNIQUE INDEX "users_pan_key" ON "users"("pan");

-- CreateIndex
CREATE INDEX "users_isDeleted_idx" ON "users"("isDeleted");
