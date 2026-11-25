import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  RoundedTextButton,
} from "../../../../components/form-controls/";
import {
  DBUU_ACADEMIC_YEARS,
  DBUU_DEPARTMENTS,
  DBUU_ROLES,
  showCustomTextToast,
} from "../../../../utilities";

export default function HeroForm() {
  const objNavigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    headline: "",
    countryLoc: "India",
    postalCodeLoc: "248007",
    role: DBUU_ROLES.STUDENT,
    department: DBUU_DEPARTMENTS[0],
    academicYear: "3rd Year",
    rollNumber: "",
    graduationYear: "2024",
    currentPosition: "",
  });
  const [isRegistering, setIsRegistering] = useState(false); // Default to Sign In view first
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  useEffect(() => {
    const handleAuthModeChange = (event) => {
      if (event.detail === "login") setIsRegistering(false);
      if (event.detail === "register") setIsRegistering(true);
    };
    window.addEventListener("dbuu-auth-mode", handleAuthModeChange);
    return () => window.removeEventListener("dbuu-auth-mode", handleAuthModeChange);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleSelect = (nextRole) => {
    setFormData((prev) => ({
      ...prev,
      role: nextRole,
      academicYear:
        nextRole === DBUU_ROLES.MENTOR
          ? "Faculty"
          : nextRole === DBUU_ROLES.PASSOUT
          ? "Alumni"
          : "3rd Year",
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        showCustomTextToast("Image size must be less than 5MB", 3);
        return;
      }

      // Validate file type
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        showCustomTextToast("Only image files are allowed (JPEG, PNG, GIF, WebP)", 3);
        return;
      }

      setProfileImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setProfileImagePreview(null);
  };

  const handleAgreeAndJoinClick = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!formData.email || !formData.password) {
      showCustomTextToast("Please enter both email and password", 3);
      return;
    }

    // Validate password length only for new registrations (default demo user may use short password on login)
    if (isRegistering && formData.password.length < 6) {
      showCustomTextToast("Password must be at least 6 characters", 3);
      return;
    }

    // Additional validation for registration
    if (isRegistering) {
      if (!formData.firstName || !formData.lastName) {
        showCustomTextToast("Please enter your first and last name", 3);
        return;
      }
    }

    // Import and call the appropriate handler
    import("./HeroFormUtil").then(({ handleEmailRegister, handleEmailLogin }) => {
      if (isRegistering) {
        const fullName = `${formData.firstName} ${formData.lastName}`.trim();
        const defaultHeadline =
          formData.role === DBUU_ROLES.MENTOR
            ? formData.currentPosition || `Faculty Mentor • ${formData.department}`
            : formData.role === DBUU_ROLES.PASSOUT
            ? formData.currentPosition || `Alumni (${formData.graduationYear || "Pass-out"}) • ${formData.department}`
            : `${formData.department} • ${formData.academicYear}`;
        handleEmailRegister(
          { 
            email: formData.email, 
            password: formData.password, 
            fullName: fullName,
            firstName: formData.firstName,
            lastName: formData.lastName,
            headline: formData.headline.trim() || defaultHeadline,
            countryLoc: formData.countryLoc,
            postalCodeLoc: formData.postalCodeLoc,
            role: formData.role,
            department: formData.department,
            academicYear: formData.academicYear,
            rollNumber: formData.rollNumber,
            graduationYear: formData.role === DBUU_ROLES.PASSOUT ? formData.graduationYear : null,
            currentPosition: formData.currentPosition,
            profileImage: profileImage, // Pass profile image file
          }, 
          dispatch, 
          objNavigate
        );
      } else {
        handleEmailLogin(
          { 
            email: formData.email, 
            password: formData.password 
          }, 
          dispatch, 
          objNavigate
        );
      }
    });
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    objNavigate("/forgot-password");
  };

  const handleTermsAndConditions = () => {
    showCustomTextToast("DBUU Student Connect campus policy: use your academic identity respectfully.", 2.5);
  };

  return (
    <form className="w-full sm:w-[440px]" onSubmit={handleAgreeAndJoinClick}>
      <p className="pb-[16px] sm:pb-0 text-[30px] sm:text-[46px] text-[#172B52] font-light leading-[1.18]">
        Welcome to <span className="font-bold">DBUU</span> Student Connect
      </p>
      <p className="text-sm text-slate-600 mt-2">
        Dev Bhoomi Uttarakhand University intra-campus mentorship &amp; doubt support portal.
      </p>
      <div className=" pt-3 pb-7 sm:pt-6 sm:pb-4">
        <div className="flex flex-col gap-3">
          {isRegistering && (
            <>
              {/* Campus Role Selector */}
              <div className="bg-[#FFF9F3] border border-orange-200 rounded-xl p-2.5">
                <label className="block text-[11px] font-bold text-[#172B52] uppercase tracking-wider mb-1.5">
                  Select Campus Role
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: DBUU_ROLES.STUDENT, label: "Student", icon: "fa-graduation-cap" },
                    { id: DBUU_ROLES.PASSOUT, label: "Pass-out", icon: "fa-user-tie" },
                    { id: DBUU_ROLES.MENTOR, label: "Mentor", icon: "fa-chalkboard-user" },
                  ].map((option) => {
                    const active = formData.role === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => handleRoleSelect(option.id)}
                        className={`py-2 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 border transition ${
                          active
                            ? "bg-[#172B52] text-white border-[#172B52] shadow-sm"
                            : "bg-white text-slate-700 border-slate-200 hover:border-[#F58220]"
                        }`}
                      >
                        <i className={`fa-solid ${option.icon} ${active ? "text-[#F58220]" : "text-slate-500"}`} />
                        <span>{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  className="flex-1 h-12 border-color-button-gray rounded-sm bg-transparent px-3 text-base"
                  type="text"
                  name="firstName"
                  id="input-text-firstname"
                  placeholder="First Name*"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
                <input
                  className="flex-1 h-12 border-color-button-gray rounded-sm bg-transparent px-3 text-base"
                  type="text"
                  name="lastName"
                  id="input-text-lastname"
                  placeholder="Last Name*"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              {/* Profile Picture Upload */}
              <div className="w-full border-color-button-gray rounded-sm bg-transparent p-3">
                <label className="block text-sm font-medium text-color-text mb-2">
                  Profile Picture (Optional)
                </label>
                {profileImagePreview ? (
                  <div className="flex items-center gap-3">
                    <img 
                      src={profileImagePreview} 
                      alt="Profile preview" 
                      className="w-16 h-16 rounded-full object-cover border-2 border-color-blue"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="flex items-center justify-center w-full h-16 border-2 border-dashed border-color-button-gray rounded-md cursor-pointer hover:border-color-blue transition-colors">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-color-text-low-emphasis" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span className="text-sm text-color-text-low-emphasis">Click to upload photo</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
                <p className="text-xs text-color-text-low-emphasis mt-1">
                  Max size: 5MB. Formats: JPEG, PNG, GIF, WebP
                </p>
              </div>
            </>
          )}
          <input
            className="w-full h-12 border-color-button-gray rounded-sm bg-transparent px-3 text-base"
            type="email"
            name="email"
            id="input-text-email"
            placeholder="DBUU email (e.g. rajat.kishore@dbuu.ac.in)"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            className="w-full h-12 border-color-button-gray rounded-sm bg-transparent px-3 text-base"
            type="password"
            name="password"
            id="input-text-pass"
            placeholder={isRegistering ? "Password (6+ characters)" : "Password"}
            value={formData.password}
            onChange={handleInputChange}
            required
            minLength={isRegistering ? 6 : 1}
          />
          {isRegistering && (
            <>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full h-11 border-color-button-gray rounded-sm bg-white px-3 text-sm text-slate-800"
              >
                {DBUU_DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>

              {formData.role === DBUU_ROLES.STUDENT && (
                <div className="flex gap-2">
                  <select
                    name="academicYear"
                    value={formData.academicYear}
                    onChange={handleInputChange}
                    className="flex-1 h-11 border-color-button-gray rounded-sm bg-white px-3 text-sm text-slate-800"
                  >
                    {DBUU_ACADEMIC_YEARS.map((yr) => (
                      <option key={yr} value={yr}>
                        {yr}
                      </option>
                    ))}
                  </select>
                  <input
                    className="flex-1 h-11 border-color-button-gray rounded-sm bg-transparent px-3 text-sm"
                    type="text"
                    name="rollNumber"
                    placeholder="Roll No. (e.g. 24BTCSE0039)"
                    value={formData.rollNumber}
                    onChange={handleInputChange}
                  />
                </div>
              )}

              {formData.role === DBUU_ROLES.PASSOUT && (
                <div className="flex gap-2">
                  <input
                    className="w-32 h-11 border-color-button-gray rounded-sm bg-transparent px-3 text-sm"
                    type="number"
                    name="graduationYear"
                    placeholder="Batch (2024)"
                    value={formData.graduationYear}
                    onChange={handleInputChange}
                  />
                  <input
                    className="flex-1 h-11 border-color-button-gray rounded-sm bg-transparent px-3 text-sm"
                    type="text"
                    name="currentPosition"
                    placeholder="Current Role (e.g. SWE @ TCS)"
                    value={formData.currentPosition}
                    onChange={handleInputChange}
                  />
                </div>
              )}

              {formData.role === DBUU_ROLES.MENTOR && (
                <input
                  className="w-full h-11 border-color-button-gray rounded-sm bg-transparent px-3 text-sm"
                  type="text"
                  name="currentPosition"
                  placeholder="Designation (e.g. Assistant Professor, SoEC)"
                  value={formData.currentPosition}
                  onChange={handleInputChange}
                />
              )}

              <input
                className="w-full h-11 border-color-button-gray rounded-sm bg-transparent px-3 text-sm"
                type="text"
                name="headline"
                id="input-text-headline"
                placeholder="Academic Headline (optional — auto-filled if blank)"
                value={formData.headline}
                onChange={handleInputChange}
              />
            </>
          )}
        </div>
        {!isRegistering && (
          <div className="text-right mt-2">
            <button
              type="button"
              onClick={handleForgotPasswordClick}
              className="text-color-blue hover:underline text-sm font-semibold"
            >
              Forgot password?
            </button>
          </div>
        )}
        {isRegistering && (
          <p className="py-3 text-[13px] leading-5 text-color-text font-medium">
            By clicking Agree &amp; Join, you agree to the DBUU Connect{" "}
            <span
              onClick={handleTermsAndConditions}
              className="hover:cursor-pointer hover:underline text-color-blue font-bold"
            >
              Campus Guidelines, Privacy Policy
            </span>
            {" and "}
            <span
              onClick={handleTermsAndConditions}
              className="hover:cursor-pointer hover:underline text-color-blue font-bold"
            >
              Code of Conduct
            </span>
            .
          </p>
        )}
        <div className="sm:text-xl">
          <RoundedTextButton
            strColor="blue"
            strText={isRegistering ? "Agree & Join DBUU Connect" : "Sign In"}
            booBorder={true}
            booColoredBackground={true}
            booFullWidth={true}
            handleClick={handleAgreeAndJoinClick}
          />
        </div>
        <div className="text-center mt-2">
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-color-blue hover:underline text-sm font-semibold"
          >
            {isRegistering 
              ? "Already have a DBUU account? Sign in" 
              : "New to DBUU Connect? Join now"}
          </button>
        </div>
      </div>
    </form>
  );
}
