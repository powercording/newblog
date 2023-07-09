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

export default function MarkdownSet({ markdown = emptyMarkdown, renderType }: MarkdownSet) {
  const [markdownContent, setMarkdownContent] = useState(markdown?.content ?? '');
  const [markdonwTitle, setMarkdownTitle] = useState(markdown?.title ?? '');
  const {} = getSession();

  const handleMarkdownRegister = async () => {
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

  const buttonOneText = renderType === 'create' ? '글쓰기' : '수정';
  const buttonOneCallback = renderType === 'create' ? handleMarkdownRegister : handleMarkdownUpdate;

  const buttonTwoText = renderType === 'create' ? '임시1' : '삭제';
  const buttonTwoCallback = renderType === 'create' ? handleMarkdownAutosave : hnadleMarkdownDelete;

  return (
    <main className="grid lg:grid-cols-2 min-h-screen h-auto w-full xl:w-4/6 mx-auto mt-12">
      <MarkdownEditor markdown={markdownContent} setMarkdown={setMarkdownContent} />
      <MarkdownViewer markdown={markdownContent} />
      <div className="flex border fixed h-16 bottom-0 inset-x-0 lg:inset-x-[300px] bg-white rounded-t-lg drop-shadow-md shadow-md">
        <input
          className="w-full h-full px-6 font-bold focus:outline-none bg-gray-50 text-black"
          type="text"
          value={markdonwTitle ?? ''}
          onChange={e => setMarkdownTitle(e.target.value)}
          placeholder="제목을 입력해 주세요"
        />
        <button className="w-24 border-x hover:bg-zinc-200 text-black" onClick={buttonOneCallback}>
          {buttonOneText}
        </button>
        <button className="w-24 hover:bg-zinc-200 text-black" onClick={buttonTwoCallback}>
          {buttonTwoText}
        </button>
      </div>
    </main>
  );
}
