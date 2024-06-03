-- CreateTable
CREATE TABLE "Order" (
    "order_id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("order_id")
);
