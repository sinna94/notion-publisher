import { CircularProgress, Divider, IconButton, List, ListItem, ListItemText, Theme, Tooltip } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import PublishIcon from '@material-ui/icons/Publish';
import { createStyles, makeStyles } from '@material-ui/styles';
import { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { Waypoint } from 'react-waypoint';
import { Property, SearchResponse } from '../interface';

interface Props {
  searchResult: SearchResponse | undefined;
  getSearchResponse: (nextCursor?: string) => void;
  loading: boolean;
}

export const PageInfo: React.FC<Props> = (props: Props) => {
  const { searchResult } = props;

  const isTitleProperty = (property: Property): boolean => {
    return property.type === 'title' && (property.title?.length ?? 0) > 0;
  };

  const titleList = searchResult?.results.map((result) => {
    const { properties } = result;
    const titles = Object.values(properties).filter((prop) => isTitleProperty(prop));

    return {
      id: result.id,
      title: titles?.[0]?.title?.[0].plain_text ?? '제목 없음',
      type: result.object,
      updateAt: result.last_edited_time,
      url: result.url,
    };
  });

  const history = useHistory();
  const onClickPageId = async (pageId: string) => {
    history.push(`/page/${pageId}`);
  };

  const handleInfiniteOnLoad = async () => {
    if (searchResult?.nextCursor && !props.loading) {
      props.getSearchResponse(searchResult?.nextCursor);
    }
  };

  const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
      list: {
        height: 'calc(100vh - 120px)',
        overflow: 'auto',
        padding: '0',
      },
      li: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
      },
      iconButton: {
        '&:hover': {
          color: theme.palette.secondary.main,
        },
      },
    });
  });

  const classes = useStyles();

  return (
    <List className={classes.list}>
      {titleList?.map((titleInfo, index) => {
        return (
          <Fragment key={`${index}-${titleInfo.id}`}>
            <ListItem
              className={classes.li}
              secondaryAction={
                <>
                  <Tooltip title="노션 페이지로 이동">
                    <IconButton className={classes['iconButton']} onClick={() => window.open(titleInfo.url)}>
                      <LinkIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="블로그로 보내기" onClick={() => onClickPageId(titleInfo.id)}>
                    <IconButton className={classes['iconButton']}>
                      <PublishIcon />
                    </IconButton>
                  </Tooltip>
                </>
              }
            >
              <ListItemText
                primary={titleInfo.title}
                secondary={new Date(Date.parse(titleInfo.updateAt)).toLocaleString()}
              />
            </ListItem>
            <Divider />
          </Fragment>
        );
      })}
      {props.loading && (
        <ListItem style={{ justifyContent: 'center', marginBottom: '5px' }}>
          {<CircularProgress size={60} color="secondary" />}
        </ListItem>
      )}
      <Waypoint onEnter={handleInfiniteOnLoad} />
    </List>
  );
};
