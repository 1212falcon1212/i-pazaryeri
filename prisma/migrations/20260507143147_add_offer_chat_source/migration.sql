-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OfferRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "sector" TEXT NOT NULL,
    "networkSize" TEXT,
    "modules" TEXT,
    "selectedServices" TEXT,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Yeni',
    "internalNote" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "source" TEXT NOT NULL DEFAULT 'form',
    "chatTranscript" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_OfferRequest" ("company", "createdAt", "email", "fullName", "id", "internalNote", "isRead", "message", "modules", "networkSize", "phone", "sector", "selectedServices", "status", "updatedAt") SELECT "company", "createdAt", "email", "fullName", "id", "internalNote", "isRead", "message", "modules", "networkSize", "phone", "sector", "selectedServices", "status", "updatedAt" FROM "OfferRequest";
DROP TABLE "OfferRequest";
ALTER TABLE "new_OfferRequest" RENAME TO "OfferRequest";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
