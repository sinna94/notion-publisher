import { get } from "../request/request";
import { BlockType, Content, Property, Result } from "../interface";

interface Props {
    pageInfoList: Result[];
}

export const PageInfo = (props: Props) => {

    const { pageInfoList } = props;

    const isTitleProperty = (property: Property
    ): boolean => {
        return (property.type === 'title' && (property.title?.length ?? 0) > 0);
    };

    const titleList = pageInfoList.map(result => {
        const { properties } = result;
        const titles = Object.values(properties).filter(prop => isTitleProperty(prop));

        return { id: result.id, title: titles?.[0]?.title?.[0].plain_text ?? '제목 없음', type: result.object };
    })

    console.log(titleList);
    const onClickPageId = async (pageId: string) => {
        const params = { pageId }
        const response = await get<Content>('/page', { params });

        if (response.data) {
            prasePage(response.data.results);
        }
    }

    const prasePage = (resultList: Content[]) => {
        console.log(resultList);
        resultList.forEach(result => {
            console.log(result);
            switch (result.type) {
                case BlockType.paragraph:
                    result.paragraph?.text?.forEach(text => {
                        console.log(`<p>${text.plain_text}</p>`);
                    })
                    break;
                case BlockType.heading_1:
                    break;
                case BlockType.heading_2:
                    break;
                case BlockType.heading_3:
                    break;
                case BlockType.numbered_list_item:
                    break;
                case BlockType.bulleted_list_item:
                    break;
                case BlockType.to_do:
                    break;
                case BlockType.toggle:
                    break;
                case BlockType.unsupported:
                    break;
                case BlockType.child_page:
                    break;
                default:
                    break;
            }
        })

    }

    return (
        <>
            {titleList?.map(titleInfo => {
                return (
                    <p onClick={() => onClickPageId(titleInfo.id)}>
                        {titleInfo.title}
                    </p>
                );
            })}
        </>
    )
}
