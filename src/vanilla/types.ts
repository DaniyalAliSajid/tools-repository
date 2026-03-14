export interface ToolModule {
  render(container: HTMLElement): void;
  destroy?(): void;
}

export type ToolCategory = 'text' | 'calculators' | 'security' | 'developer' | 'converters' | 'productivity' | 'health';

export interface FAQ {
  question: string;
  answer: string;
}

export interface ToolEntry {
  id: string;
  name: string;
  slug: string;
  category: ToolCategory;
  icon: string;
  description: string;
  keywords: string[];
  module: () => Promise<ToolModule>;
  faqs?: FAQ[];
}

export interface CategoryInfo {
  id: ToolCategory;
  name: string;
  icon: string;
  color: string;
}
