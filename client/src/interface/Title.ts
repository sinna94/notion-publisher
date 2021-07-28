export interface Title {
  annotations: {
    bold: boolean;
    code: boolean;
    color: string;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
  };
  href: null;
  plain_text: string;
  text: {
    content: string;
    link: null;
  };
  type: string;
}
