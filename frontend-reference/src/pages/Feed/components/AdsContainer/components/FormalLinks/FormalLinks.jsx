import { showCustomTextToast } from "../../../../../../utilities";
import GeneralLink from "../../../GeneralLink/GeneralLink";

export default function FormalLinks() {
  const className = "text-[12px] leading-4 text-[#64748B] hover:text-[#172B52]";

  return (
    <div className="px-2 pt-2">
      <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1.5">
        <li>
          <GeneralLink
            onClick={() => showCustomTextToast("DBUU Student Connect — Review-1 Portal")}
          >
            <span className={className}>About DBUU Portal</span>
          </GeneralLink>
        </li>
        <li>
          <GeneralLink
            onClick={() => showCustomTextToast("School of Engineering & Computing, Dehradun")}
          >
            <span className={className}>SoEC Guidelines</span>
          </GeneralLink>
        </li>
        <li>
          <GeneralLink
            onClick={() => showCustomTextToast("Phase 2 AI Helpdesk & Moderation queued")}
          >
            <span className={className}>Academic Integrity</span>
          </GeneralLink>
        </li>
      </ul>
      <div className="py-3 flex items-center justify-center gap-2">
        <img
          src="/dbuu_crest.jpg"
          alt="DBUU Crest"
          className="w-5 h-5 rounded-full object-cover border border-[#F58220]"
        />
        <span className="text-[12px] font-semibold text-[#172B52]">
          DBUU Student Connect © {new Date().getFullYear()}
        </span>
      </div>
    </div>
  );
}
