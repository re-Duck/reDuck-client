export const makeContentASFile = (innerHTML: string) => {
  const htmlContent = new Array(innerHTML);
  const bl = new Blob(htmlContent, { type: 'text/html' });
  const fr = new FileReader();

  try {
    fr.onload = () => {
      return fr.result;
    };
    fr.readAsText(bl);
  } catch (e) {
    console.log(e);
  }
};
