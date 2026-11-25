/**
 * RightSidebar Component
 * 
 * LinkedIn-style sticky sidebar with:
 * - Profile language selector
 * - Public profile URL
 * - Suggested connections
 * - Ad/CTA card
 * - "People also viewed" section
 * 
 * Features:
 * - Sticky positioning on desktop
 * - Collapsible sections on mobile
 * - Skeleton loading states
 */

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { showCustomTextToast } from "../../../utilities";

export default function RightSidebar({ profile }) {
  const navigate = useNavigate();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  // DBUU Campus Mentors & Cohort Peers (local avatars per Section 7)
  const suggestedConnections = [
    {
      id: "mentor-sumit",
      name: "Dr. Sumit Sharma",
      headline: "Professor (CSE), SoEC • Project Supervisor",
      avatarUrl: "/avatars/sumit.svg",
      mutualConnections: 4
    },
    {
      id: "alumni-rohan",
      name: "Rohan Rawat",
      headline: "Alumni '24 • Software Engineer at Infosys",
      avatarUrl: "/avatars/rohan.svg",
      mutualConnections: 4
    },
    {
      id: "peer-ansh",
      name: "Ansh",
      headline: "B.Tech CSE (3rd Year) • UI/UX & Frontend",
      avatarUrl: "/avatars/ansh.svg",
      mutualConnections: 4
    }
  ];

  const peopleViewed = [
    {
      id: "peer-yash",
      name: "Yash Kholiya",
      headline: "B.Tech CSE (AI & ML) • Semantic AI Track",
      avatarUrl: "/avatars/yash.svg"
    },
    {
      id: "peer-rajat",
      name: "Rajat Kishore",
      headline: "B.Tech CSE (3rd Year) • Backend Lead",
      avatarUrl: "/avatars/rajat.svg"
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <aside className="space-y-4" role="complementary">
      
      {/* Profile Language & Public URL Card */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-2xl shadow-sm p-4"
      >
        <h3 className="text-sm font-semibold text-color-text-darker mb-3">
          Profile Settings
        </h3>

        {/* Language Selector */}
        <div className="mb-4">
          <label className="text-xs text-color-text block mb-2">
            Profile language
          </label>
          <div className="relative">
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="w-full flex items-center justify-between px-3 py-2 bg-color-gray-soft-background rounded-lg text-sm text-color-text-darker hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-color-button-blue"
              aria-label="Select profile language"
              aria-expanded={showLanguageDropdown}
            >
              <span>English</span>
              <i className="fas fa-chevron-down text-xs" aria-hidden="true" />
            </button>

            {showLanguageDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden"
              >
                {["English", "Spanish", "French", "German", "Chinese"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      console.log("Language selected:", lang);
                      setShowLanguageDropdown(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-color-text-darker hover:bg-gray-50 transition-colors"
                  >
                    {lang}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Public Profile URL */}
        <div>
          <label className="text-xs text-color-text block mb-2">
            Public profile & URL
          </label>
          <a
            href={`/profile/${profile._id}`}
            className="text-sm text-color-button-blue hover:underline focus:outline-none focus:ring-2 focus:ring-color-button-blue rounded px-1 break-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://appdost-linkedin-client.vercel.app/linkedin/profile/{profile._id}
          </a>
        </div>
      </motion.div>

      {/* Suggested Connections Card */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-sm overflow-hidden"
      >
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-color-text-darker">
            People you may know
          </h3>
        </div>

        <div className="divide-y divide-gray-100">
          {suggestedConnections.map((connection) => (
            <motion.div
              key={connection.id}
              className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
              whileHover={{ x: 4 }}
              onClick={() =>
                showCustomTextToast(`Search "${connection.name}" in the top bar to open their profile.`, 2.5)
              }
            >
              <div className="flex gap-3">
                {/* Avatar */}
                <img
                  src={connection.avatarUrl}
                  alt={`${connection.name}'s avatar`}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  loading="lazy"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-color-text-darker line-clamp-1">
                    {connection.name}
                  </h4>
                  <p className="text-xs text-color-text line-clamp-2 mb-2">
                    {connection.headline}
                  </p>
                  <p className="text-xs text-color-text-low-emphasis">
                    <i className="fas fa-user-friends text-xs mr-1" aria-hidden="true" />
                    {connection.mutualConnections} mutual connections
                  </p>
                </div>
              </div>

              {/* Connect Button */}
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  showCustomTextToast(`Search "${connection.name}" in the top bar to send a connection request.`, 2.5);
                }}
                className="w-full mt-3 px-4 py-1.5 border border-color-button-blue text-color-button-blue rounded-full text-sm font-semibold hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-color-button-blue focus:ring-offset-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="fas fa-user-plus mr-2" aria-hidden="true" />
                Connect
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <button
          className="w-full p-3 text-sm text-color-text hover:bg-gray-50 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-color-button-blue"
          onClick={() => console.log("View all suggestions")}
        >
          View all suggestions
          <i className="fas fa-arrow-right ml-2 text-xs" aria-hidden="true" />
        </button>
      </motion.div>

      {/* People Also Viewed Card */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-sm overflow-hidden"
      >
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-color-text-darker">
            People also viewed
          </h3>
        </div>

        <div className="divide-y divide-gray-100">
          {peopleViewed.map((person) => (
            <motion.button
              key={person.id}
              className="w-full p-4 flex gap-3 items-center hover:bg-gray-50 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-color-button-blue"
              whileHover={{ x: 4 }}
              onClick={() =>
                showCustomTextToast(`Search "${person.name}" in the top bar to view their profile.`, 2.5)
              }
            >
              <img
                src={person.avatarUrl}
                alt={`${person.name}'s avatar`}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                loading="lazy"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-color-text-darker line-clamp-1">
                  {person.name}
                </h4>
                <p className="text-xs text-color-text line-clamp-1">
                  {person.headline}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* DBUU Campus Resources Card */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-sm overflow-hidden"
      >
        <div className="p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#172B52] to-[#223B6B] rounded flex items-center justify-center flex-shrink-0">
              <i className="fas fa-graduation-cap text-[#F58220]" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-[#172B52] mb-1">
                DBUU Academic Resources
              </h3>
              <p className="text-xs text-slate-500">
                Phase 2 AI Helpdesk &amp; syllabus matching queued
              </p>
            </div>
          </div>

          <motion.button
            onClick={() => navigate("/feed")}
            className="w-full px-4 py-2 bg-[#172B52] text-white rounded-lg text-sm font-semibold hover:bg-[#0D1A33] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F58220] focus:ring-offset-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Back to Campus Feed
          </motion.button>
        </div>
      </motion.div>

      {/* Footer Links */}
      <div className="px-4 py-3 text-center">
        <p className="text-xs text-color-text-low-emphasis">
          DBUU Student Connect © {new Date().getFullYear()}
        </p>
      </div>
    </aside>
  );
}
