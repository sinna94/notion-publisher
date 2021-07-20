import { get } from "../request/request";
import { Content, Property, Result } from "../interface";

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
        console.log(response);
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
