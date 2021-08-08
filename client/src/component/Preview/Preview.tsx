import parse from 'html-react-parser';

interface Props {
  html: string;
}

export const Preview = (props: Props) => {
  const { html } = props;
  const style = { 'height': 'calc(100vh - 120px)', 'overflow': 'auto' };
  return <div style={style} className='preview'>{parse(html)}</div>;
};
