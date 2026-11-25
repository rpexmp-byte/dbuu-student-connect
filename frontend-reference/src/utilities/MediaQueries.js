const MediaQueries = (() => {
  const minWidth640px =
    typeof window !== "undefined" && typeof window.matchMedia === "function"
      ? window.matchMedia("(min-width: 640px)")
      : { matches: true, onchange: null };

  minWidth640px.onchange = () => {
    if (typeof window !== "undefined" && window.location?.reload) {
      window.location.reload();
    }
  };

  return { minWidth640px };
})();

export default MediaQueries;
