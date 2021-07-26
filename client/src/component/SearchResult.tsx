import { get } from '../request/request';
import { BlockType, Content, Property, Result, RichTextObject } from '../interface';

interface Props {
    pageInfoList: Result[];
}

export const PageInfo = (props: Props) => {
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
        console.log(tagList);
    };

    return (
        <>
            {titleList?.map((titleInfo) => {
                return <p onClick={() => onClickPageId(titleInfo.id)}>{titleInfo.title}</p>;
            })}
        </>
    );
};
function parseText(text: RichTextObject) {
    //   const classNames = parseClassNames(text);

    let tag = "";

    const { annotations, plain_text } = text;
    const { bold, code, color, italic, strikethrough, underline } = annotations
    if (bold) {
        tag += `<strong>${plain_text}</strong>`
    }
    if (code) {
        tag += `<code>${plain_text}</code>`
    }
    if (italic) {
        tag += `<em>${plain_text}</em>`
    }
    if (strikethrough) {
        tag += `<del>${plain_text}</del>`
    }
    if (underline) {
        tag += `<span style="border-bottom:0.05em solid">${plain_text}</span>`
    }

        const span = `<span>${text.plain_text}</span>`;
    console.log(span);
    return tag;
}

function parseClassNames(text: RichTextObject) {
    return Object.entries(text.annotations)
        .filter((_, value) => value)
        .map((key) => { console.log(key); return key })
        .join(' ');
}
