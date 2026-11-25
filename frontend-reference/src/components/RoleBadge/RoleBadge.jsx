import React from "react";
import { getRoleBadgeConfig } from "../../utilities/CampusRoleUtils";

/**
 * Reusable DBUU cohort role badge (Student / Alumni Pass-out / Faculty Mentor).
 * @param {Object} props
 * @param {string} [props.role="student"]
 * @param {string} [props.academicYear=""]
 * @param {number|string|null} [props.graduationYear=null]
 * @param {boolean} [props.compact=false]
 * @param {string} [props.className=""]
 * @returns {JSX.Element}
 */
export default function RoleBadge({
  role = "student",
  academicYear = "",
  graduationYear = null,
  compact = false,
  className = "",
}) {
  const config = getRoleBadgeConfig(role, academicYear, graduationYear);

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-bold whitespace-nowrap ${
        compact ? "text-[10px] px-2 py-0.5" : "text-[11px] px-2.5 py-0.5"
      } ${config.className} ${className}`}
    >
      <i className={`${config.iconClass} text-[10px]`} aria-hidden="true" />
      <span>{compact ? config.shortLabel : config.label}</span>
    </span>
  );
}

