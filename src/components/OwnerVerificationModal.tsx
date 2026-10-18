import React, { useState } from 'react';
import { OWNER_VERIFICATION_CHECKLIST } from '../data/menuData';
import { X, AlertCircle, CheckCircle2, Copy, Check, FileCode } from 'lucide-react';

interface OwnerVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OwnerVerificationModal: React.FC<OwnerVerificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyReport = () => {
    const textReport = OWNER_VERIFICATION_CHECKLIST.map(
      (item, idx) =>
        `${idx + 1}. [${item.category}] ${item.title}\n   Currently Active: ${item.currentDisplay}\n   Conflict: ${item.conflictDescription}\n   Suggested Action: ${item.suggestedAction}\n`
    ).join('\n');

    navigator.clipboard.writeText(
      `BROOKIES CAFE - OWNER VERIFICATION REPORT\nGenerated for POS & Menu Confirmation\n\n${textReport}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-[#120A07] border border-[#F5C76B]/40 rounded-3xl shadow-[0_0_35px_rgba(245,199,107,0.2),0_15px_50px_rgba(0,0,0,0.95)] p-5 sm:p-7 max-h-[90vh] flex flex-col text-[#FFF5E5]">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#F5C76B]/20">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#FFB52E] uppercase tracking-wider mb-1">
              <AlertCircle className="w-4 h-4 text-[#F5C76B]" />
              <span>Owner & Admin Reference</span>
            </div>
            <h2 id="modal-title" className="font-display text-xl sm:text-2xl font-bold text-[#FFF5E5]">
              Menu Verification Checklist
            </h2>
            <p className="text-xs text-[#CFC0B0] mt-1">
              Use the published menu data as the current reference for customer-facing item names and prices.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#22130D] hover:bg-[#321C14] text-[#CFC0B0] hover:text-[#FFF5E5] border border-[#F5C76B]/25 transition-all focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Checklist Items */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 no-scrollbar">
          
          {/* Quick Notice */}
          <div className="p-3.5 rounded-xl bg-[#1A0E0A] border border-[#F5C76B]/30 text-xs text-[#D8C8BA] flex items-start gap-2.5 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-[#F5C76B] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#FFF5E5]">Menu Reference:</span> The current menu is organized into Veg, Non-Veg, Combos, Special, and Drinks sections.
            </div>
          </div>

          {OWNER_VERIFICATION_CHECKLIST.map((item, idx) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-[#160D09] border border-[#F5C76B]/20 space-y-2 shadow-xs"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#140A06] bg-gradient-to-r from-[#F5C76B] to-[#FFB52E] px-2 py-0.5 rounded shadow-xs">
                  Item #{idx + 1} · {item.category}
                </span>
                <span className="text-xs text-[#F5C76B] font-medium">
                  {item.currentDisplay}
                </span>
              </div>

              <h3 className="text-sm font-semibold text-[#FFF5E5]">
                {item.title}
              </h3>

              <p className="text-xs text-[#B5A192]">
                {item.conflictDescription}
              </p>

              {/* Conflict Options comparison */}
              <div className="space-y-1.5 pt-1">
                {item.options.map((opt, oIdx) => (
                  <div
                    key={oIdx}
                    className="p-2 rounded-lg bg-[#0E0705] border border-[#2E1810] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1"
                  >
                    <span className="font-medium text-[#E0D0C2]">{opt.source}:</span>
                    <span className="text-[#F5C76B] text-[11px]">{opt.details}</span>
                  </div>
                ))}
              </div>

              <div className="text-xs text-[#FFB52E] pt-1">
                <span className="font-bold text-[#F5C76B]">Action: </span>
                {item.suggestedAction}
              </div>
            </div>
          ))}

          {/* Instructions Box: Where the current menu and logo live */}
          <div className="p-4 rounded-xl bg-[#1C0E0A] border border-[#F5C76B]/30 space-y-3">
            <h4 className="text-xs font-bold text-[#FFF5E5] uppercase tracking-wider flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-[#F5C76B]" />
              <span>Project Asset Locations</span>
            </h4>

            <div className="text-xs text-[#D1C0B0] space-y-2">
              <p>
                <strong className="text-[#FFF5E5]">Menu data:</strong> Edit <code className="text-[#F5C76B] bg-[#0E0705] px-1.5 py-0.5 rounded border border-[#F5C76B]/25">src/data/menuData.ts</code>. Item names, prices, and combo descriptions are rendered from this file.
              </p>
              <p>
                <strong className="text-[#FFF5E5]">Logo and food photos:</strong> Keep image files inside <code className="text-[#F5C76B] bg-[#0E0705] px-1.5 py-0.5 rounded border border-[#F5C76B]/25">src/assets/images/</code>; imported local assets are included in production builds.
              </p>
            </div>
          </div>

        </div>

        {/* Actions Footer */}
        <div className="pt-4 border-t border-[#F5C76B]/20 flex items-center justify-between gap-3">
          <button
            onClick={handleCopyReport}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl bg-[#1E110C] hover:bg-[#2B1812] text-[#FFF5E5] border border-[#F5C76B]/40 hover:border-[#F5C76B] transition-all shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#F5C76B]" />
                <span>Copy Report for Cafe Team</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-[#F5C76B] to-[#FFB52E] hover:from-[#FFD888] hover:to-[#F7BC36] text-[#140A06] transition-all shadow-[0_0_15px_rgba(255,181,46,0.35)]"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
