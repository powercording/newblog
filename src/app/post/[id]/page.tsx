type Params = {
  params: {
    id: string;
  };
};

export default function Post({ params }: Params) {
  const { id } = params;
  console.log(id);
  return <h1>포스트</h1>;
}
