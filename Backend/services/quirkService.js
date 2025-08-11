export const maybeAddQuirk = (text) => {
    if (Math.random() < 0.2) {
      return text + " (But what if it also ran on cat memes?)";
    }
    return text;
  };
  