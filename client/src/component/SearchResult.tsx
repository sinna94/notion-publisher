import { useState } from 'react';
import { get } from '../request/request';
import { BlockType, Color, Content, Property, Result, RichTextObject } from '../interface';
import { Preview } from './Preview';

interface Props {
    pageInfoList: Result[];
}

export const PageInfo = (props: Props) => {
    const [pageHtml, setPageHtml] = useState('');

    const { pageInfoList } = props;

    const isTitleProperty = (property: Property): boolean => {
        return property.type === 'title' && (property.title?.length ?? 0) > 0;
    };

    const titleList = pageInfoList.map((result) => {
        const { properties } = result;
        const titles = Object.values(properties).filter((prop) => isTitleProperty(prop));

        return { id: result.id, title: titles?.[0]?.title?.[0].plain_text ?? '제목 없음', type: result.object };
    });

    console.log(titleList);
    const onClickPageId = async (pageId: string) => {
        const params = { pageId };
        const response = await get<Content>('/page', { params });

        if (response.data) {
            prasePage(response.data.results);
        }
    };

    const prasePage = (resultList: Content[]) => {
        console.log(resultList);
        const tagList = resultList.map((result) => {
            console.log(result);
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
                    result.paragraph?.text?.forEach((text) => {
                        tag += parseText(text);
                    });
                    tag += '</h1>';
                    break;
                case BlockType.heading_2:
                    tag += '<h2>';
                    result.paragraph?.text?.forEach((text) => {
                        tag += parseText(text);
                    });
                    tag += '</h2>';
                    break;
                case BlockType.heading_3:
                    tag += '<h3>';
                    result.paragraph?.text?.forEach((text) => {
                        tag += parseText(text);
                    });
                    tag += '</h3>';
                    break;
                case BlockType.numbered_list_item:
                    tag += '<ol><li>';
                    result.paragraph?.text?.forEach((text) => {
                        tag += parseText(text);
                    });
                    tag += '</li></ol>';
                    break;
                case BlockType.bulleted_list_item:
                    tag += '<ul><li>';
                    result.paragraph?.text?.forEach((text) => {
                        tag += parseText(text);
                    });
                    tag += '</li></ul>';
                    break;
                case BlockType.to_do:
                    tag += '<ul><li>';
                    result.paragraph?.text?.forEach((text) => {
                        tag += parseText(text);
                    });
                    tag += '</li></ul>';
                    break;
                case BlockType.toggle:
                    tag += '<ul><li><details><summary>';
                    result.paragraph?.text?.forEach((text) => {
                        tag += parseText(text);
                    });
                    tag += '</summary></details></li></ul>';
                    break;
                case BlockType.unsupported:
                    break;
                case BlockType.child_page:
                    break;
                default:
                    break;
            }
            return tag;
        });
        const html = tagList.join('\n');
        console.log(html);
        setPageHtml(html);
    };

    return (
        <>
            <Preview html={pageHtml} />
            {titleList?.map((titleInfo) => {
                return <p onClick={() => onClickPageId(titleInfo.id)}>{titleInfo.title}</p>;
            })}
        </>
    );
};
function parseText(text: RichTextObject) {
    //   const classNames = parseClassNames(text);
    let tag = '';

    const { annotations, plain_text, href } = text;
    const { bold, code, color, italic, strikethrough, underline } = annotations;
    const colorText = parseColor(color, plain_text);

    if (bold) {
        tag += `<strong>${colorText}</strong>`;
    } else if (code) {
        tag += `<code>${colorText}</code>`;
    } else if (italic) {
        tag += `<em>${colorText}</em>`;
    } else if (strikethrough) {
        tag += `<del>${colorText}</del>`;
    } else if (underline) {
        tag += `<span style="border-bottom:0.05em solid">${colorText}</span>`;
    } else {
        tag += `<span>${colorText}</span>`;
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
