/*
  Warnings:

  - You are about to drop the column `pickupTime` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `Order` table. All the data in the column will be lost.
  - You are about to alter the column `unitPrice` on the `OrderItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - You are about to alter the column `subtotal` on the `OrderItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - Made the column `unitPrice` on table `OrderItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `subtotal` on table `OrderItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "pickupTime",
DROP COLUMN "totalAmount";

-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "unitPrice" SET NOT NULL,
ALTER COLUMN "unitPrice" SET DATA TYPE INTEGER,
ALTER COLUMN "subtotal" SET NOT NULL,
ALTER COLUMN "subtotal" SET DATA TYPE INTEGER;
