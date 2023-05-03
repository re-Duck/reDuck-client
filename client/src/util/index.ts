export const makeHtmlToBlob = (innerHTML: string) => {
  const htmlContent = new Array(innerHTML);
  const blob = new Blob(htmlContent, { type: 'text/html' });
  return blob;
};

export const makeblobToHTML = (blob: Blob) => {
  const fr = new FileReader();

  try {
    fr.onload = () => {
      return fr.result;
    };
    fr.readAsText(blob);
  } catch (error) {
    console.log(error);
  }
};
