import parse from 'html-react-parser';

interface Props {
  html: string;
}

export const Preview = (props: Props) => {
  const { html } = props;
  return <div className='preview'>{parse(html)}</div>;
};
