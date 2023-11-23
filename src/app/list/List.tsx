import TagList from "./TagList";

const List = () => {
  const list = [
    { tag: "# 자동차", count: 2 },
    { tag: "# 요리", count: 3 },
  ];

  return (
    <section className="w-screen h-screen">
      {list.map((item, idx) => (
        <TagList key={idx} title={item.tag} count={item.count} />
      ))}
    </section>
  );
};

export default List;
