import AddToYourFeed from "./components/AddToYourFeed/AddToYourFeed";
import { FormalLinks } from "./components/FormalLinks";

/** @typedef {import("../../../../models/User").User} User */

/**
 * Right sidebar housing Phase 2 Semantic AI Helpdesk placeholder card,
 * DBUU Faculty Mentor recommendations, and university links.
 * @param {Object} props
 * @param {User} props.objLoggedUser
 * @returns {JSX.Element}
 */
// eslint-disable-next-line no-unused-vars
export default function AdsContainer({ objLoggedUser }) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Phase 2 Semantic AI Helpdesk Placeholder Card */}
      <div className="w-full rounded-xl bg-gradient-to-br from-[#172B52] via-[#1D3563] to-[#0D1A33] text-white p-4 shadow-sm border border-[#223B6B]">
        <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#F58220]">
            <i className="fas fa-robot" aria-hidden="true" />
            <span>AI Doubt Assistant</span>
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F58220] text-[#0D1A33]">
            Phase 2
          </span>
        </div>
        <h3 className="text-sm font-bold leading-snug mb-1.5">
          DBUU Semantic Helpdesk
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed mb-3">
          Reserved UI slot for semester-2 NLP matching of campus doubts, past project synopses, and SoEC faculty answers.
        </p>
        <div className="rounded-lg bg-white/10 border border-white/15 px-3 py-2 text-[11px] text-slate-200 flex items-center gap-2">
          <i className="fas fa-sparkles text-[#F58220]" aria-hidden="true" />
          <span>Semantic search integration queued for Phase 2</span>
        </div>
      </div>

      <AddToYourFeed />
      <FormalLinks />
    </div>
  );
}
