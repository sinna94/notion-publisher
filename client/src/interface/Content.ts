import { Result } from '.';

enum BlockType {
    paragraph,
    heading_1,
    heading_2,
    heading_3,
    bulleted_list_item,
    numbered_list_item,
    to_do,
    toggle,
    child_page,
    unsupported
}

export interface Content {
    object: string;
    id: string;
    type: BlockType;
    createdTime: string;
    lastEditedTime: string;
    url: string;
    hasChildren: Boolean;
    childrenList: Result[];
    results: Result[];
    nextCursor: string | undefined;
    hasMore: Boolean;
    paragraph: ContentText[] | undefined;
    heading_1: ContentText[] | undefined;
    heading_2: ContentText[] | undefined;
    heading_3: ContentText[] | undefined;
    bulletedListItem: ContentText[] | undefined;
    numberedListItem: ContentText[] | undefined;
    toggle: ContentText[] | undefined;
    toDo: ToDo[] | undefined;
    unsupported: any | undefined;
    childPage: any | undefined;
}

interface ContentText {
    text: RichTextObject[];
}

interface ToDo extends ContentText {
    checked: false
}

enum Color {
    "default",
    "gray",
    "brown",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
    "pink",
    "red",
    "gray_background",
    "brown_background",
    "orange_background",
    "yellow_background",
    "green_background",
    "blue_background",
    "purple_background",
    "pink_background",
    "red_background"
}

interface RichTextObject {
    plain_text: string;
    href: string | undefined;
    annotations: {
        bold: boolean,
        italic: boolean,
        strikethrough: boolean,
        underline: boolean,
        code: boolean,
        color: Color
    },
}