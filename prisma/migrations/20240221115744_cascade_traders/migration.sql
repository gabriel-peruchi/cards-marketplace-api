-- DropForeignKey
ALTER TABLE "trade_cards" DROP CONSTRAINT "trade_cards_cardId_fkey";

-- DropForeignKey
ALTER TABLE "trade_cards" DROP CONSTRAINT "trade_cards_tradeId_fkey";

-- DropForeignKey
ALTER TABLE "trades" DROP CONSTRAINT "trades_userId_fkey";

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trade_cards" ADD CONSTRAINT "trade_cards_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trade_cards" ADD CONSTRAINT "trade_cards_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "trades"("id") ON DELETE CASCADE ON UPDATE CASCADE;
