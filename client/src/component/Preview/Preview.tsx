import parse from 'html-react-parser';
import { Box, Divider, Skeleton, Typography } from '@material-ui/core';

interface Props {
  html: string | undefined;
}

export const Preview = (props: Props) => {
  const { html } = props;
  const style = { height: 'calc(100vh - 125px)', overflow: 'auto', margin: '5px 0', padding: '5px' };
  return (
    <Box sx={{ boxShadow: 3 }} style={style} className="preview">
      <Typography variant={'h2'}>미리 보기</Typography>
      <Divider variant={'fullWidth'} orientation={'horizontal'} />
      {html && parse(html)}
      {!html && <Skeleton style={{ height: '100%' }} />}
    </Box>
  );
};
