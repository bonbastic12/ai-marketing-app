import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  PlusCircle,
  CreditCard,
  Building,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
} from 'lucide-react';

export const WalletTab: React.FC = () => {
  const {
    walletBalanceUSD,
    transactions,
    addFunds,
    withdrawFunds,
    formatCurrency,
    currentCurrency,
  } = useApp();

  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);

  const [depositAmount, setDepositAmount] = useState(250);
  const [withdrawAmount, setWithdrawAmount] = useState(100);
  const [withdrawDestination, setWithdrawDestination] = useState('bank_wire');
  const [paymentProvider, setPaymentProvider] = useState<'stripe' | 'chapa' | 'paypal'>('stripe');

  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (depositAmount <= 0) return;
    addFunds(depositAmount, `Prepaid Deposit via ${paymentProvider.toUpperCase()}`);
    setDepositModalOpen(false);
    setFeedbackMsg(`Successfully credited ${formatCurrency(depositAmount)} to your advertising balance.`);
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawAmount <= 0) return;
    const ok = withdrawFunds(withdrawAmount);
    if (ok) {
      setWithdrawModalOpen(false);
      setFeedbackMsg(`Withdrawal of ${formatCurrency(withdrawAmount)} initiated to ${withdrawDestination}.`);
      setTimeout(() => setFeedbackMsg(null), 4000);
    } else {
      alert('Insufficient funds available in your advertising balance.');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-1">
            <Wallet className="w-3.5 h-3.5" />
            <span>Prepaid Ad Spend & Ledger</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Wallet & Earnings</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage prepaid advertising credits, review automated campaign spends, and withdraw revenue share.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setWithdrawModalOpen(true)}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-neutral-950 border border-neutral-800 rounded-xl transition-colors cursor-pointer"
          >
            Request Payout
          </button>
          <button
            onClick={() => setDepositModalOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow transition-colors flex items-center gap-1.5 cursor-pointer glow-blue"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Deposit Funds</span>
          </button>
        </div>
      </div>

      {feedbackMsg && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Available Balance */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/40 via-neutral-950 to-neutral-950 border border-blue-900/40 space-y-2">
          <p className="text-xs text-slate-400">Available Advertising Credit</p>
          <p className="text-3xl font-extrabold font-mono text-white tabular-nums">
            {formatCurrency(walletBalanceUSD)}
          </p>
          <p className="text-[11px] text-slate-500 pt-2 border-t border-neutral-900">
            Available across all active platform delivery nodes
          </p>
        </div>

        {/* Monthly Spend */}
        <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900 space-y-2">
          <p className="text-xs text-slate-400">Total Campaign Spend (This Month)</p>
          <p className="text-3xl font-bold font-mono text-slate-200 tabular-nums">
            {formatCurrency(1820)}
          </p>
          <p className="text-[11px] text-slate-500 pt-2 border-t border-neutral-900">
            4 Campaigns actively drawing daily budgets
          </p>
        </div>

        {/* Earned Revenue Share */}
        <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900 space-y-2">
          <p className="text-xs text-slate-400">Total Attributed Gross Earnings</p>
          <p className="text-3xl font-bold font-mono text-emerald-400 tabular-nums">
            {formatCurrency(8450)}
          </p>
          <p className="text-[11px] text-slate-500 pt-2 border-t border-neutral-900">
            Calculated across verified post-click orders
          </p>
        </div>

      </div>

      {/* Transactions Ledger */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white tracking-tight">Transaction History</h2>
          <span className="text-xs text-slate-400 font-mono">Real-time ledger entries</span>
        </div>

        <div className="bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-900 bg-neutral-900/40 text-slate-400">
                  <th className="py-3 px-4 font-medium">Description</th>
                  <th className="py-3 px-4 font-medium">Type</th>
                  <th className="py-3 px-4 font-medium">Date & Reference</th>
                  <th className="py-3 px-4 font-medium text-right">Amount ({currentCurrency})</th>
                  <th className="py-3 px-4 font-medium text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-neutral-900/30 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-white max-w-[240px] truncate">
                      {tx.description}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-mono text-[11px] uppercase text-slate-300">
                        {tx.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                      <div>{new Date(tx.date).toLocaleDateString()}</div>
                      <div className="text-slate-500">{tx.referenceId}</div>
                    </td>
                    <td
                      className={`py-3.5 px-4 text-right font-mono tabular-nums font-semibold ${
                        tx.amount > 0 ? 'text-emerald-400' : 'text-slate-200'
                      }`}
                    >
                      {tx.amount > 0 ? `+${formatCurrency(tx.amount)}` : formatCurrency(tx.amount)}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {tx.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Integration-Ready Payment Providers Note */}
      <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 flex items-start gap-3 text-xs text-slate-400">
        <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-300">Payment Gateway Compliance:</strong> Digital Product is structured to bind to Stripe Billing, Chapa / Telebirr for Ethiopian Birr transactions, and international Wire payouts. Demo transactions maintain balance fidelity without real credit card charges until merchant secrets are attached in your environment variables.
        </div>
      </div>

      {/* DEPOSIT MODAL */}
      {depositModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-lg font-bold text-white tracking-tight">Deposit Advertising Funds</h2>
            <p className="text-xs text-slate-400">
              Select your payment method and fund amount in {currentCurrency}.
            </p>

            <form onSubmit={handleDeposit} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Payment Gateway
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentProvider('stripe')}
                    className={`p-2.5 rounded-xl border text-center font-medium cursor-pointer ${
                      paymentProvider === 'stripe'
                        ? 'border-blue-500 bg-blue-600/20 text-white'
                        : 'border-neutral-800 bg-neutral-900 text-slate-400'
                    }`}
                  >
                    Stripe / Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentProvider('chapa')}
                    className={`p-2.5 rounded-xl border text-center font-medium cursor-pointer ${
                      paymentProvider === 'chapa'
                        ? 'border-blue-500 bg-blue-600/20 text-white'
                        : 'border-neutral-800 bg-neutral-900 text-slate-400'
                    }`}
                  >
                    Chapa / ETB
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentProvider('paypal')}
                    className={`p-2.5 rounded-xl border text-center font-medium cursor-pointer ${
                      paymentProvider === 'paypal'
                        ? 'border-blue-500 bg-blue-600/20 text-white'
                        : 'border-neutral-800 bg-neutral-900 text-slate-400'
                    }`}
                  >
                    PayPal
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Amount in USD equivalent
                </label>
                <input
                  type="number"
                  min={10}
                  step={10}
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
                />
                <p className="text-[11px] text-blue-400 mt-1">
                  Estimated charge: {formatCurrency(depositAmount)}
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-900">
                <button
                  type="button"
                  onClick={() => setDepositModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow"
                >
                  Confirm Deposit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* WITHDRAW MODAL */}
      {withdrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-lg font-bold text-white tracking-tight">Withdraw Available Balance</h2>
            <p className="text-xs text-slate-400">
              Payouts are disbursed within 1-3 business days.
            </p>

            <form onSubmit={handleWithdraw} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Disbursement Route
                </label>
                <select
                  value={withdrawDestination}
                  onChange={(e) => setWithdrawDestination(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="bank_wire">International Bank Wire (SWIFT / IBAN)</option>
                  <option value="telebirr">Telebirr / Ethiopian Local Account</option>
                  <option value="stripe_connect">Stripe Connect Direct Payout</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Withdrawal Amount (Max: {formatCurrency(walletBalanceUSD)})
                </label>
                <input
                  type="number"
                  min={10}
                  max={walletBalanceUSD}
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-900">
                <button
                  type="button"
                  onClick={() => setWithdrawModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow"
                >
                  Submit Payout Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
