export const useButton = (border: Boolean, color: string) => {
  const style = border
    ? {
        backgroundColor: "white",
        border: `2px solid ${color}`,
        color: color,
      }
    : {
        backgroundColor: color,
        border: "none",
        color: "white",
      };

      return {
        style
    };
};
