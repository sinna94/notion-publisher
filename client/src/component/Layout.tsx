import { useHistory } from "react-router-dom";
import { Layout as AntdLayout, Menu } from 'antd';
import { Footer, Header, Content } from 'antd/lib/layout/layout';

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
    'height': '100vh',
  }

  return (
    <AntdLayout className="layout" style={style}>
      <Header style={{ direction: 'rtl' }}>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key='auth' onClick={onClickLogin} >노션 로그인</Menu.Item>
          <Menu.Item key='search' onClick={onClickSearch} >검색</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </AntdLayout>
  )
}