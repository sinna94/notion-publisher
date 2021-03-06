import { BlockType, Color, Content, RichTextObject } from '../interface';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { get } from '../request';
import { Preview } from './Preview';
import { Layout } from './Layout';

const parentIdMap = new Map<string, number>();

export const Page: React.FC = () => {
  const [pageHtml, setPageHtml] = useState<string | undefined>(undefined);

  const routerParams: any = useParams();

  useEffect(() => {
    const fetchPage = async () => {
      const params = { pageId: routerParams.id };
      const response = await get<Content>('/page', { params });

      if (response.data) {
        parentIdMap.clear();
        const tagList = parsePage(response.data.results);
        const html = tagList.join('\n');
        setPageHtml(html);
      }
    };
    fetchPage();
  }, []);

  return (
    <Layout>
      <Preview html={pageHtml} />
    </Layout>
  );
};

const parsePage = (resultList: Content[]): string[] => {
  return resultList.map((result) => {
    return parseResult(result, 'top');
  });
};

const parseChild = (childList: Content[]): string => {
  let tag = '';
  childList.forEach((child) => {
    child.results.forEach((childResult) => {
      tag += parseResult(childResult);
    });
  });

  return tag;
};

const parseResult = (result: Content, parentId?: string) => {
  let tag = '';
  switch (result.type) {
    case BlockType.paragraph:
      tag += '<p>';
      result.paragraph?.text?.forEach((text) => {
        tag += parseText(text);
      });
      tag += '</p>';
      break;
    case BlockType.heading_1:
      tag += '<h1>';
      result.heading_1?.text?.forEach((text) => {
        tag += parseText(text);
      });
      tag += '</h1>';
      break;
    case BlockType.heading_2:
      tag += '<h2>';
      result.heading_2?.text?.forEach((text) => {
        tag += parseText(text);
      });
      tag += '</h2>';
      break;
    case BlockType.heading_3:
      tag += '<h3>';
      result.heading_3?.text?.forEach((text) => {
        tag += parseText(text);
      });
      tag += '</h3>';
      break;
    case BlockType.numbered_list_item:
      const listIndex = parentIdMap.get(parentId ?? 'top') ?? 1;
      parentIdMap.set(parentId ?? 'top', listIndex + 1);
      tag += ` <ol start=${listIndex}><li>`;
      result.numberedListItem?.text?.forEach((text) => {
        tag += parseText(text);
      });
      result.childrenList.forEach((child) => {
        child.results.forEach((childResult) => {
          tag += parseResult(childResult, result.id);
        });
      });
      tag += '</li></ol>';
      break;
    case BlockType.bulleted_list_item:
      tag += '<ul><li>';
      result.bulletedListItem?.text?.forEach((text) => {
        tag += parseText(text);
      });

      tag += parseChild(result.childrenList);
      tag += '</li></ul>';
      break;
    case BlockType.to_do:
      const checked = result.toDo?.checked ?? false;
      tag += `<ul class='to-do-list'><li>`;
      tag += `<div class='checkbox checkbox-${checked ? 'on' : 'off'}'></div>`;

      if (checked) {
        tag += `<span class='to-do-children-checked>`;
      }
      result.toDo?.text?.forEach((text) => {
        tag += parseText(text);
      });

      if (checked) {
        tag += `</span>`;
      }

      tag += parseChild(result.childrenList);

      tag += parsePage(result.childrenList);

      tag += '</li></ul>';
      break;
    case BlockType.toggle:
      tag += `<ul class='toggle'><li><details><summary>`;
      result.toggle?.text?.forEach((text) => {
        tag += parseText(text);
      });
      tag += '</summary>';
      tag += parseChild(result.childrenList);
      tag += '</details></li></ul>';
      break;
    case BlockType.unsupported:
      if(result.image){
        tag += `<figure class='image'>`;
        tag += `<a href='${result.image?.url}'/>`;
        tag += `<img src='${result.image?.url}'/>`;
        tag += '</a>';
        tag += '</figure>';
      }
      break;
    case BlockType.child_page:
      break;
    default:
      break;
  }
  return tag;
};

function parseText(text: RichTextObject) {
  //   const classNames = parseClassNames(text);
  let tag = '';

  const { annotations, plain_text, href } = text;
  const { bold, code, color, italic, strikethrough, underline } = annotations;
  const replacedText = plain_text.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  const colorText = parseColor(color, replacedText);

  if (bold) {
    tag += `<strong>`;
  }
  if (code) {
    tag += `<code>`;
  }
  if (italic) {
    tag += `<em>`;
  }
  if (strikethrough) {
    tag += `<del>`;
  }
  if (underline) {
    tag += `<span style="border-bottom:0.05em solid">`;
  }

  if (!(bold || code || italic || strikethrough || underline)) {
    tag += `<span>`;
  }

  tag += colorText;

  if (bold) {
    tag += `</strong>`;
  }
  if (code) {
    tag += `</code>`;
  }
  if (italic) {
    tag += `</em>`;
  }
  if (strikethrough) {
    tag += `</del>`;
  }
  if (underline) {
    tag += `</span>`;
  }

  if (!(bold || code || italic || strikethrough || underline)) {
    tag += `</span>`;
  }

  return parseLink(tag, href);
}

function parseLink(text: string, href: string | undefined) {
  if (href) {
    return `<a href=${href}>${text}</a>`;
  }
  return text;
}

function parseColor(color: Color, text: string) {
  if (color === Color.default) {
    return text;
  }
  return `<mark class='highlight-${color}'>${text}</mark>`;
}
