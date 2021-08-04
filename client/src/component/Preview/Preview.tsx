import parse from 'html-react-parser';
import sanitizeHtml from 'sanitize-html';

interface Props {
  html: string;
}

export const Preview = (props: Props) => {
  const { html } = props;
  console.log(html);
  const cleanHtml = sanitizeHtml(html, { allowedAttributes: {},disallowedTagsMode: 'recursiveEscape' });
  console.log(cleanHtml);
  return <div className='preview'>{parse(cleanHtml)}</div>;
};
