import { useState } from 'react';
import { Check, ChevronDown, Copy } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export function AccountsSection() {
  const [openAccountSide, setOpenAccountSide] = useState<'groom' | 'bride' | null>(null);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const handleCopyAccount = async (accountNumber: string) => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopiedAccount(accountNumber);
      setTimeout(() => setCopiedAccount(null), 2000);
    } catch {
      setCopiedAccount(null);
    }
  };

  return (
    <section
      id="accounts"
      className="py-20 md:py-24 px-6 max-w-3xl mx-auto"
      aria-labelledby="accounts-heading"
    >
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2
            id="accounts-heading"
            className="font-editorial text-lg md:text-xl font-medium text-zinc-900 mb-2 tracking-wide"
          >
            마음 전하실 곳
          </h2>
          <p className="text-xs md:text-sm text-stone-500">
            참석이 어려우신 분들을 위해 계좌번호를 함께 남깁니다.
          </p>
        </div>

        <div className="border-y border-stone-200/80 divide-y divide-stone-200/80">
          {(['groom', 'bride'] as const).map((side) => {
            const isOpen = openAccountSide === side;
            const sideAccounts = WEDDING_DATA.accounts.filter((a) => a.side === side);
            return (
              <div key={side}>
                <button
                  type="button"
                  onClick={() => setOpenAccountSide(isOpen ? null : side)}
                  aria-expanded={isOpen}
                  className="w-full min-h-[54px] py-4 px-1 flex items-center justify-between text-left text-sm text-zinc-900 hover:text-zinc-600 transition-colors cursor-pointer"
                >
                  <span>{side === 'groom' ? '신랑 측 계좌번호' : '신부 측 계좌번호'}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <div className="pb-4 space-y-2.5">
                    {sideAccounts.map((acc) => {
                      const isCopied = copiedAccount === acc.accountNumber;
                      return (
                        <div
                          key={acc.accountNumber}
                          className="py-2 px-1 flex items-center justify-between gap-4 text-sm"
                        >
                          <div className="min-w-0">
                            <p className="text-xs text-stone-500">
                              {acc.roleLabel} · {acc.holder}
                            </p>
                            <p className="text-zinc-900 tabular-nums truncate mt-0.5">
                              {acc.bank} {acc.accountNumber}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => void handleCopyAccount(acc.accountNumber)}
                            className="min-h-[38px] px-3 py-1.5 border border-stone-300 rounded text-xs text-zinc-700 hover:bg-stone-100 inline-flex items-center gap-1 shrink-0 cursor-pointer"
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                                <span className="text-emerald-700">복사됨</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                                <span>복사</span>
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
