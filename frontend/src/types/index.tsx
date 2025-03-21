export type Post = {
  id: string;
  attributes: BlogAttributes;
};

type BlogAttributes = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  description: string;
  content: string;
  img: ImageAttributes;
};

type ImageAttributes = {
  data: {
    attributes: {
      name: string;
      alternateText: string;
      caption: string;
      width: number;
      height: number;
      formats: {
        thumbnail: {
          name: string;
          hash: string;
          ext: string;
          mime: string;
          path: string | null;
          width: number;
          height: number;
          size: number;
          url: string;
        };
      };
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: string | null;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export type Meta = {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
};
