export interface IModule {
  number: number;
  title: string;
  description: string;
}

export interface ICourse {
  title: string;
  shortTitle: string;
  slug: string;
  description: string;
  overview: string;
  audience: string;
  price: number | null;
  priceLabel: string;
  duration: string;
  timing: string;
  coding: string;
  modules: IModule[];
  certificate: string;
  ctaLabel: string;
  tag: string;
  image?: string;
  status: "draft" | "published";
  createdAt?: Date;
}
