type AuthorProps = {
  userName: string;
  createdAt: string;
};

export default function Author({ userName, createdAt }: AuthorProps) {
  return (
    <address className=" flex rounded-2xl overflow-hidden w-full lg:w-80 relative not-italic shadow-md shadow-gray-500/50">
      <div className="bg-gray-300 min-w-[60px] h-20 rounded-r-[50%] absolute self-center"></div>
      <div className="p-2 truncate w-full text-center">
        <h2 className="font-bold ">{userName}</h2>
        <p className="text-xs">{createdAt}</p>
      </div>
    </address>
  );
}
