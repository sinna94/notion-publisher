import { useHistory } from "react-router-dom";
import { AppBar, Button, Container, Toolbar } from "@material-ui/core";

export const Layout: React.FC = (props) => {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_REDIRECT_URI;

  const url = `https://api.notion.com/v1/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

  const history = useHistory();

  const onClickLogin = () => {
    window.location.href = url;
  }

  const onClickSearch = () => {
    history.push('search');
  }

  const { children } = props;

  const style = {
    'height': '100%',
  }

  return (
    <div className="layout" style={style}>
      <AppBar position={"static"} style={{'direction': 'rtl'}}>
        <Toolbar>
          <Button color={"inherit"} onClick={onClickLogin}>
            노션 로그인
          </Button>
          <Button color={"inherit"} onClick={onClickSearch}>
            페이지 검색
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        {children}
      </Container>
      <footer style={{ textAlign: 'center' }}></footer>
    </div>
  )
}