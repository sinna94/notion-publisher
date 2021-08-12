import { useHistory } from 'react-router-dom';
import { AppBar, Avatar, Button, Container, Toolbar, Typography } from '@material-ui/core';
import { getWorkspaceName } from '../util/Storage';

export const Layout: React.FC = (props) => {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_REDIRECT_URI;

  const url = `https://api.notion.com/v1/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

  const history = useHistory();

  const onClickLogin = () => {
    window.location.href = url;
  };

  const onClickSearch = () => {
    history.push('/search');
  };

  const { children } = props;

  const style = {
    height: '100%',
    backgroundColor: '#f5f5f5',
  };

  const workspaceName = getWorkspaceName();

  return (
    <div className="layout" style={style}>
      <AppBar position={'static'}>
        <Toolbar>
          <a href={"/"}>
            <Avatar
              alt="Notion Publisher"
              src={`${process.env.PUBLIC_URL}/NotionPublisher_192.png`}
              sx={{ width: 40, height: 40 }}
              variant="square"
              style={{ alignSelf: 'center', margin: '5px' }}
            />
          </a>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {workspaceName ?? ''}
          </Typography>
          <Button color="secondary" onClick={onClickSearch}>
            페이지 검색
          </Button>
          <Button color="secondary" onClick={onClickLogin}>
            {workspaceName ? '로그아웃' : '노션 로그인'}
          </Button>
        </Toolbar>
      </AppBar>
      <Container style={{ height: 'calc(100vh - 120px)' }}>{children}</Container>
      <footer style={{ textAlign: 'center' }}>
        footer
      </footer>
    </div>
  );
};
