interface BlogLayout {
  children: React.ReactNode;
}

export default function BlogLayout({ children }: BlogLayout) {
  return (
    <div className="py-12 min-h-screen h-auto grid grid-cols-5 w-full xl:w-4/6 mx-auto gap-3">
      <aside>
        <div className="sticky top-12 p-3">left aside</div>
      </aside>
      <main className="col-span-3 p-3">{children}</main>
      <aside>
        <div className="sticky top-12 p-3">right aside</div>
      </aside>
    </div>
  );
}
