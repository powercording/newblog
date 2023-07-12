'use client';

import { useState } from 'react';
import MarkdownViewer from './markdownViewer';
import MarkdownEditor from './markdownEditor';
import { InferModel } from 'drizzle-orm';
import { post } from '@/lib/PostSchema/schema';
import postService from '@/app/service/PostService';
import { getSession } from 'next-auth/react';

type MarkdownSet = {
  renderType: 'edit' | 'create';
  markdown?: InferModel<typeof post>;
};

const emptyMarkdown: InferModel<typeof post> = {
  id: 0,
  content: '',
  title: '',
  userName: '',
  createdAt: '',
};

const categoryList = [
  '-',
  'javascript',
  'typescript',
  'react',
  'nextjs',
  'drizzle',
  'database',
  'server',
  'client',
  'css',
  'html',
  'git',
  'java',
];

export default function MarkdownSet({ markdown = emptyMarkdown, renderType }: MarkdownSet) {
  const [markdownContent, setMarkdownContent] = useState(markdown?.content ?? '');
  const [markdonwTitle, setMarkdownTitle] = useState(markdown?.title ?? '');
  const [categories, setCategories] = useState<string[]>([]);
  const {} = getSession();

  const handleMarkdownRegister = async () => {
    if (!markdownContent || !markdonwTitle || !categories.length)
      return alert('제목과 내용을 입력해주세요');

    await postService.insertPost({
      content: markdownContent,
      title: markdonwTitle,
    });
  };

  const handleMarkdownUpdate = async () => {
    await postService.updateMarkdown({
      ...markdown,
      content: markdownContent,
      title: markdonwTitle,
    });
  };

  const hnadleMarkdownDelete = async () => {
    const isDelete = confirm('정말 삭제하시겠습니까?');
    if (!isDelete) return;
    await postService.deleteMarkdown(markdown.id);
  };

  const handleMarkdownAutosave = () => {};

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === '-') return;
    if (categories.includes(selectedCategory)) return;
    setCategories([...categories, selectedCategory]);
  };

  const handleCategoryDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    const category = e.currentTarget.innerText;
    setCategories(categories.filter(c => c !== category));
  };

  const buttonOneText = renderType === 'create' ? '글쓰기' : '수정';
  const buttonOneCallback = renderType === 'create' ? handleMarkdownRegister : handleMarkdownUpdate;

  const buttonTwoText = renderType === 'create' ? '임시' : '삭제';
  const buttonTwoCallback = renderType === 'create' ? handleMarkdownAutosave : hnadleMarkdownDelete;

  return (
    <main>
      <section className="mt-12 min-h-fit border-b-gray-400 border-b w-full 2xl:w-3/4 mx-auto px-5 relative">
        <input
          className="block py-3 text-2xl text-black focus:outline-none bg-transparent border-b border-blue-300 w-full pt-8"
          placeholder="제목을 입력하세요"
          type="text"
          value={markdonwTitle ?? ''}
          onChange={e => setMarkdownTitle(e.target.value)}
        />
        <section className="w-full mx-auto py-2 flex">
          <div className="relative">
            <select
              className="rounded-md h-full bg-transparent pl-6 pr-16 border border-gray-300 focus:outline-none cursor-pointer"
              onChange={handleCategoryChange}
            >
              {categoryList.sort().map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <span className="absolute w-8 h-full bg-gray-500 right-0 rounded-r-md border-none pointer-events-none dropdown-span"></span>
          </div>
          <div className="px-2 flex gap-2 items-center absolute top-36 md:static">
            {categories?.map(category => (
              <span
                className="h-fit bg-slate-300 w-24 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer"
                key={category}
                onClick={handleCategoryDelete}
              >
                {category}
              </span>
            ))}
          </div>
          <div className="flex text-gray-400 gap-4 ml-auto">
            <button
              className="ml-auto hover:shadow-md p-2 rounded-md font-semibold bg-white border border-gray-300 w-24"
              onClick={buttonOneCallback}
            >
              {buttonOneText}
            </button>
            <button
              className="ml-auto hover:shadow-md p-2 rounded-md font-semibold bg-white border border-gray-300 w-24"
              onClick={buttonTwoCallback}
            >
              {buttonTwoText}
            </button>
          </div>
        </section>
      </section>
      <section className="grid lg:grid-cols-2 min-h-screen h-auto w-full 2xl:w-3/4 mx-auto mt-4 px-5">
        <MarkdownEditor markdown={markdownContent} setMarkdown={setMarkdownContent} />
        <MarkdownViewer markdown={markdownContent} />
      </section>
    </main>
  );
}
