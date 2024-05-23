import dompurify from "dompurify"; //used this library in order to prevent XSS attack.

const purifyInnerHtml = (htmlData: string) => {
  const sanitizer = dompurify.sanitize;

  return <div dangerouslySetInnerHTML={{ __html: sanitizer(htmlData) }} />;
};

export default purifyInnerHtml;
