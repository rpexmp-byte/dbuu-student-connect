import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../../services/apiClient";
import { RoleBadge } from "../../../../components";
import { resolveAvatarUrl } from "../../../../utilities/CampusRoleUtils";

/** @typedef {import("../../../../models/User").User} User */

/**
 * Top-navbar live DBUU campus user search with clean elevated dropdown.
 * Replaces legacy PoUpFullContainer full-page shade that caused highlight glitches.
 * @param {Object} props
 * @param {User} props.objLoggedUser
 * @returns {JSX.Element}
 */
// eslint-disable-next-line no-unused-vars
export function SearchBox({ objLoggedUser }) {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    const handleOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  // Debounced user search via backend GET /api/users/search
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await apiClient.get("/users/search", {
          params: { q: trimmed, limit: 8 },
        });
        setResults(data?.users || []);
      } catch (err) {
        console.error("Search failed:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelectUser = (userId) => {
    setIsOpen(false);
    setQuery("");
    navigate(`/profile/${userId}`);
  };

  return (
    <div ref={containerRef} className="relative w-full flex-1 shrink-0 z-50">
      <div className="relative w-full">
        <input
          type="text"
          name="input-search-box"
          id="input-search-box"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Search DBUU students, mentors, alumni, roll no..."
          className="flex items-center pl-10 pr-8 w-full h-9 bg-[#223B6B] rounded-full border border-slate-500/50 text-xs sm:text-sm text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#F58220] focus:border-transparent transition-all"
        />
        <div className="absolute top-2.5 left-3.5 text-slate-300 w-4 h-4 pointer-events-none">
          <svg
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            data-supported-dps="16x16"
            fill="currentColor"
            width="16"
            height="16"
            focusable="false"
          >
            <path d="M14.56 12.44L11.3 9.18a5.51 5.51 0 10-2.12 2.12l3.26 3.26a1.5 1.5 0 102.12-2.12zM3 6.5A3.5 3.5 0 116.5 10 3.5 3.5 0 013 6.5z"></path>
          </svg>
        </div>
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
            aria-label="Clear search"
            className="absolute top-2 right-2.5 text-slate-300 hover:text-white text-xs px-1"
          >
            ×
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 top-11 bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50">
          {!query.trim() ? (
            <div className="p-3.5 text-xs text-slate-600">
              <p className="font-bold text-[#172B52] mb-1">
                Search DBUU Campus Directory
              </p>
              <p className="text-slate-500">
                Type a name, department, faculty title, or roll number (e.g.{" "}
                <button
                  type="button"
                  onClick={() => setQuery("Sumit")}
                  className="text-[#172B52] font-semibold underline hover:text-[#F58220]"
                >
                  Sumit
                </button>
                ,{" "}
                <button
                  type="button"
                  onClick={() => setQuery("24BTCSE")}
                  className="text-[#172B52] font-semibold underline hover:text-[#F58220]"
                >
                  24BTCSE
                </button>
                ,{" "}
                <button
                  type="button"
                  onClick={() => setQuery("Rohan")}
                  className="text-[#172B52] font-semibold underline hover:text-[#F58220]"
                >
                  Rohan
                </button>
                ).
              </p>
            </div>
          ) : loading ? (
            <div className="p-4 text-xs text-slate-500 flex items-center gap-2">
              <span className="inline-block w-3.5 h-3.5 border-2 border-[#172B52] border-t-transparent rounded-full animate-spin" />
              <span>Searching DBUU campus...</span>
            </div>
          ) : results.length === 0 ? (
            <div className="p-4 text-xs text-slate-500">
              No matching DBUU students, alumni, or faculty found for &quot;{query.trim()}&quot;.
            </div>
          ) : (
            <ul className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
              {results.map((user) => (
                <li key={user._id}>
                  <button
                    type="button"
                    onClick={() => handleSelectUser(user._id)}
                    className="w-full px-3.5 py-2.5 flex items-center gap-3 hover:bg-[#FFF9F3] text-left transition-colors"
                  >
                    <img
                      src={resolveAvatarUrl(user.profilePicURL)}
                      alt={user.fullName}
                      className="w-9 h-9 rounded-full object-cover border border-[#F58220] flex-shrink-0"
                      onError={(e) => {
                        e.currentTarget.src = "/student_avatar.jpg";
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-[#172B52] truncate">
                          {user.fullName}
                        </span>
                        <RoleBadge
                          role={user.role || "student"}
                          academicYear={user.academicYear || ""}
                          graduationYear={user.graduationYear || null}
                          compact
                        />
                      </div>
                      <p className="text-xs text-slate-500 truncate">
                        {user.department || user.profile?.headline || user.email}
                        {user.rollNumber ? ` • ${user.rollNumber}` : ""}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
