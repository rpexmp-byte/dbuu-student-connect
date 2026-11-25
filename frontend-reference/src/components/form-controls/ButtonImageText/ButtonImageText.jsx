/**
 *
 * @param {object} props
 * @param {JSX.Element} props.children
 * @param {string} props.strTitle
 * @param {function(object):void} props.handleClick
 * @param {boolean} [props.booSelected]
 * @returns
 */
const ButtonImageText = ({
  children,
  strTitle,
  handleClick,
  booSelected = false,
  booDarkBg = false,
}) => {
  const stateClasses = booDarkBg
    ? booSelected
      ? "text-[#F58220] sm:border-b-[#F58220]"
      : "text-slate-300 hover:text-white sm:border-b-transparent"
    : booSelected
    ? "text-[#172B52] sm:border-b-[#172B52]"
    : "text-color-button-gray-ligth sm:text-color-text-low-emphasis hover:text-[#172B52] sm:border-b-transparent";

  return (
    <button
      type="button"
      className={
        "flex flex-1 sm:flex-initial items-center flex-col gap-0.5 h-11 sm:h-[56px] w-fit min-w-[80px] sm:min-w-[96px] px-2 justify-center sm:border-solid sm:border-b-2 transition-colors " +
        stateClasses
      }
      onClick={handleClick}
    >
      <span className="flex justify-center w-8 sm:w-auto h-fit flex-shrink-0">
        {children}
      </span>
      <span className="text-[11px] sm:text-xs font-semibold whitespace-nowrap leading-4">
        {strTitle}
      </span>
    </button>
  );
};
export { ButtonImageText };
