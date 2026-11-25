import { useNavigate } from "react-router-dom";
import { NavigationPaths } from "../../../../../../utilities";

const DBUU_MENTORS = [
  {
    name: "SoEC Project Review Cell",
    subtitle: "Faculty Mentors • CSE & AI",
    avatar: "/dbuu_crest.jpg",
  },
  {
    name: "DBUU Training & Placement",
    subtitle: "Alumni Pass-outs • Career Guidance",
    avatar: "/dbuu_crest.jpg",
  },
  {
    name: "Senior Peer Mentors (4th Year)",
    subtitle: "MERN Stack & Mini-Project Support",
    avatar: "/student_avatar.jpg",
  },
];

export default function AddToYourFeed() {
  const navigate = useNavigate();

  return (
    <div className="w-full rounded-xl border border-[#E2E8F0] bg-white shadow-sm p-4">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[#0F172A] text-[15px] font-bold leading-5">
          Connect with DBUU Mentors
        </span>
        <span className="text-[11px] font-semibold text-[#F58220]">
          Campus Cell
        </span>
      </div>
      <ul className="space-y-3">
        {DBUU_MENTORS.map((mentor) => (
          <li key={mentor.name} className="flex items-start gap-3">
            <img
              src={mentor.avatar}
              alt={mentor.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-[#F58220] flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#0F172A] truncate">
                {mentor.name}
              </p>
              <p className="text-[11px] text-[#64748B] leading-snug mb-1.5">
                {mentor.subtitle}
              </p>
              <button
                type="button"
                onClick={() => navigate(`/${NavigationPaths.MESSAGING}`)}
                className="text-[11px] font-bold text-[#172B52] border border-[#172B52] rounded-full px-3 py-0.5 hover:bg-[#172B52] hover:text-white transition-colors"
              >
                + Message
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3 pt-2.5 border-t border-[#F1F5F9]">
        <button
          type="button"
          onClick={() => navigate(`/${NavigationPaths.MESSAGING}`)}
          className="text-xs font-bold text-[#172B52] hover:text-[#F58220] flex items-center gap-1 transition-colors"
        >
          <span>Message DBUU mentors</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
