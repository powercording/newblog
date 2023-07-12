import Category from './category';
import NameAndInfo from './nameAndInfo';
import ProfilImage from './profilImage';

const categories = ['category1', 'category2', 'category3', 'category4'];

interface Article {
  name?: string;
  info?: string;
  date?: string;
  img?: string;
  categories?: string[];
}

export default function Article({}: Article) {
  return (
    <div className="w-full border rounded-md flex h-48 bg-white cursor-pointer text-gray-400">
      <section className="w-[50%] p-2">
        <div className="w-full h-full border">이미지</div>
      </section>

      <section className="p-2 w-[50%] flex flex-col ">
        <div className=" h-full flex justify-between">
          <NameAndInfo />
          <ProfilImage />
        </div>

        <div className=" h-full flex items-end flex-wrap max-h-[50%] overflow-hidden   gap-1">
          <Category categories={categories} />
        </div>
      </section>
    </div>
  );
}
