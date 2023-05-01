export const saveContentASFile = (innerHTML: string) => {
  const htmlContent = new Array(innerHTML);
  const bl = new Blob(htmlContent, { type: 'text/html' });
  const fr = new FileReader();

  fr.onload = () => {
    console.log(fr.result);
  };
  fr.readAsText(bl);
};
