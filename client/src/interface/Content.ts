export enum BlockType {
  paragraph = 'paragraph',
  'heading_1' = 'heading_1',
  'heading_2' = 'heading_2',
  'heading_3' = 'heading_3',
  'bulleted_list_item' = 'bulleted_list_item',
  'numbered_list_item' = 'numbered_list_item',
  'to_do' = 'to_do',
  toggle = 'toggle',
  'child_page' = 'child_page',
  unsupported = 'unsupported',
}

export interface Content {
  object: string;
  id: string;
  type: BlockType;
  createdTime: string;
  lastEditedTime: string;
  url: string;
  hasChildren: boolean;
  childrenList: Content[];
  results: Content[];
  nextCursor: string | undefined;
  hasMore: boolean;
  paragraph: ContentText | undefined;
  heading_1: ContentText | undefined;
  heading_2: ContentText | undefined;
  heading_3: ContentText | undefined;
  bulletedListItem: ContentText | undefined;
  numberedListItem: ContentText | undefined;
  toggle: ContentText | undefined;
  toDo: ToDo | undefined;
  unsupported: any | undefined;
  childPage: any | undefined;
  image: Image | undefined;
}

interface Image {
  caption: string[],
  type: string,
  url: string,
  file:{
    expiry_time: string
  }
}

interface ContentText {
  text: RichTextObject[];
}

interface ToDo extends ContentText {
  checked: false;
}

export enum Color {
  'default',
  'gray',
  'brown',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'pink',
  'red',
  'gray_background',
  'brown_background',
  'orange_background',
  'yellow_background',
  'green_background',
  'blue_background',
  'purple_background',
  'pink_background',
  'red_background',
}

export interface RichTextObject {
  plain_text: string;
  href: string | undefined;
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: Color;
  };
}
