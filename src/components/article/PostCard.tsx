import Link from 'next/link';
import { Post } from './postLayout';
import { dateFormatter } from '@/lib/util/dateTimeFormatter';
import Image from 'next/image';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { id, title, createdAt, userName, content } = post;

  return (
    <Link
      className="h-80 w-60 text-black rounded-2xl p-4 flex items-end bg-cover bg-center shadow-md
    transition-all relative overflow-hidden border-8 border-solid border-gray-200 hover:-translate-y-2"
      href={`post/${id}`}
    >
      <img
        className="absolute top-0 bottom-0 left-0 right-0 z-0 object-fill"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcMbB_H1MBDItISAntq2ISPWyJR3cUcUIehg&usqp=CAU"
        alt="Profile Picture"
        height={'100%'}
      ></img>
      <div>
        <h1 className="m-0 text-2xl leading-7 line-clamp-3">{title}</h1>
        <span className="absolute top-0 right-0 text-xs p-4 leading-4 opacity-80">
          {dateFormatter(createdAt)}
        </span>
        <p className="py-2">{userName}</p>
        <div className="flex">
          <span className="text-xs bg-red-500 bg-opacity-50 rounded-md px-2 leading-6 transition-all">
            tag
          </span>
        </div>
      </div>
    </Link>
  );
}
