import { Message } from 'ai';
import { FiUser } from 'react-icons/fi';
import { VscOctoface } from 'react-icons/vsc';
import { dateFormat } from '@/lib/util/dateTimeFormatter';
type AiChatRowProps = {
  message: Message;
};

export default function AiChatRow({ message }: AiChatRowProps) {
  const { role, content, createdAt } = message;

  return (
    <div className={`flex justify-between gap-5 shadow-md rounded-md px-5 py-4`}>
      <div className="text-center basis-1/12">
        {role === 'user' ? <FiUser size={'1.5rem'} /> : <VscOctoface size={'1.5rem'} />}
      </div>
      <div className="w-full self-start basis-11/12">
        <p className={`${role === 'user' ? '' : 'text-gray-500'}`}>{content}</p>
        {createdAt && <p className="text-end text-xs text-gray-400">{dateFormat(createdAt)}</p>}
      </div>
    </div>
  );
}
