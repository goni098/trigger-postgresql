-- CreateTable
CREATE TABLE "students" (
    "id" SERIAL NOT NULL,
    "age" INTEGER NOT NULL,
    "name" VARCHAR NOT NULL,
    "class" VARCHAR NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);
