import fs from "fs";
import path from "path";

const PERF_DIR = path.join(process.cwd(), "public", "performance");
const FILE_PATTERN = /^\d{4}-\d{2}\.csv$/;

function detectColumnOffset(lines, headerIdx, headers) {
  for (let i = headerIdx + 1; i < lines.length; i++) {
    const fields = lines[i].split(";");
    if (fields.length < headers.length) continue;
    if (/^\d+$/.test(fields[0]?.trim())) return 0;
    if (/^\d{4}-/.test(fields[0]?.trim())) return -1;
  }
  return 0;
}

function parseCSV(raw) {
  const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);
  const headerIdx = lines.findIndex((l) => l.startsWith("TICKET;"));
  if (headerIdx === -1) return { trades: [], deposits: 0 };

  const headers = lines[headerIdx].split(";").map((h) => h.trim());
  const col = (name) => headers.indexOf(name);

  const iDate = col("TRANSACTION DATE");
  const iType = col("TRANSACTION TYPE");
  const iDetails = col("DETAILS");
  const iPL = col("PL");
  const iBalance = col("BALANCE");
  const iAmount = col("AMOUNT");

  if ([iType, iDetails, iPL].includes(-1)) return { trades: [], deposits: 0 };

  const offset = detectColumnOffset(lines, headerIdx, headers);
  const adj = (idx) => idx + offset;

  const trades = [];
  let deposits = 0;
  for (let i = headerIdx + 1; i < lines.length; i++) {
    const fields = lines[i].split(";");
    if (fields.length < headers.length + offset) continue;

    const type = fields[adj(iType)]?.trim();
    const details = fields[adj(iDetails)]?.trim();

    if (type === "TRANSFER_FUNDS") {
      const amount = parseFloat(fields[adj(iAmount)]);
      if (!isNaN(amount) && amount > 0) deposits += amount;
      continue;
    }

    if (type !== "ORDER_FILL" || details !== "MARKET_ORDER_POSITION_CLOSEOUT")
      continue;

    const pl = parseFloat(fields[adj(iPL)]);
    if (isNaN(pl)) continue;

    const balance = parseFloat(fields[adj(iBalance)]) || 0;
    const dateStr = fields[adj(iDate)]?.trim() || "";

    trades.push({ date: dateStr, pl, balance });
  }

  return { trades, deposits };
}

function getCSVFiles() {
  if (!fs.existsSync(PERF_DIR)) return [];
  return fs
    .readdirSync(PERF_DIR)
    .filter((f) => FILE_PATTERN.test(f))
    .sort();
}

export function computePerformance() {
  const files = getCSVFiles();
  if (files.length === 0) return null;

  let allTrades = [];
  let totalDeposits = 0;

  for (const file of files) {
    try {
      const raw = fs.readFileSync(path.join(PERF_DIR, file), "utf-8");
      const { trades, deposits } = parseCSV(raw);
      allTrades = allTrades.concat(trades);
      totalDeposits += deposits;
    } catch {
      continue;
    }
  }

  if (allTrades.length === 0) return null;

  allTrades.sort((a, b) => a.date.localeCompare(b.date));

  const startingBalance = totalDeposits > 0
    ? totalDeposits
    : allTrades[0].balance - allTrades[0].pl;
  const totalTrades = allTrades.length;
  const wins = allTrades.filter((t) => t.pl > 0);
  const losses = allTrades.filter((t) => t.pl < 0);
  const winCount = wins.length;
  const lossCount = losses.length;
  const winRate = totalTrades > 0 ? (winCount / totalTrades) * 100 : 0;

  const netProfit = allTrades.reduce((s, t) => s + t.pl, 0);
  const grossProfit = wins.reduce((s, t) => s + t.pl, 0);
  const grossLoss = Math.abs(losses.reduce((s, t) => s + t.pl, 0));
  const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : grossProfit > 0 ? Infinity : 0;
  const avgTrade = totalTrades > 0 ? netProfit / totalTrades : 0;
  const largestWin = wins.length > 0 ? Math.max(...wins.map((t) => t.pl)) : 0;
  const largestLoss = losses.length > 0 ? Math.min(...losses.map((t) => t.pl)) : 0;

  // Equity curve (cumulative PL)
  let cumulative = 0;
  const equityCurve = allTrades.map((t) => {
    cumulative += t.pl;
    return { date: t.date, equity: cumulative };
  });

  // Max drawdown from equity curve
  let peak = -Infinity;
  let maxDD = 0;
  for (const point of equityCurve) {
    if (point.equity > peak) peak = point.equity;
    const dd = peak - point.equity;
    if (dd > maxDD) maxDD = dd;
  }

  // Trading days
  const uniqueDays = new Set(
    allTrades.map((t) => t.date.split(" ")[0])
  );
  const tradingDays = uniqueDays.size;

  // Monthly performance with % returns
  const monthlyMap = {};
  for (const t of allTrades) {
    const month = t.date.substring(0, 7);
    if (!monthlyMap[month]) monthlyMap[month] = { pl: 0, trades: 0 };
    monthlyMap[month].pl += t.pl;
    monthlyMap[month].trades += 1;
  }
  let runningBalance = startingBalance;
  const monthlyPerformance = Object.entries(monthlyMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => {
      const pct = runningBalance > 0 ? (data.pl / runningBalance) * 100 : 0;
      const result = { month, pl: data.pl, pct: Math.round(pct * 100) / 100, trades: data.trades };
      runningBalance += data.pl;
      return result;
    });

  return {
    stats: {
      totalTrades,
      winCount,
      lossCount,
      winRate: Math.round(winRate * 10) / 10,
      netProfit: Math.round(netProfit * 100) / 100,
      grossProfit: Math.round(grossProfit * 100) / 100,
      grossLoss: Math.round(grossLoss * 100) / 100,
      profitFactor: Math.round(profitFactor * 100) / 100,
      avgTrade: Math.round(avgTrade * 100) / 100,
      largestWin: Math.round(largestWin * 100) / 100,
      largestLoss: Math.round(largestLoss * 100) / 100,
      maxDrawdown: Math.round(maxDD * 100) / 100,
      tradingDays,
      startingBalance: Math.round(startingBalance * 100) / 100,
    },
    equityCurve,
    monthlyPerformance,
  };
}
