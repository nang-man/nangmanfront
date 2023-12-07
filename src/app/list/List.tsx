import TagList from "./TagList";

const List = () => {
  const list = [
    { tag: "# 자동차", count: 2, roomId: "test1" },
    { tag: "# 요리", count: 3, roomId: "test2" },
  ];

  return (
    <section className="w-full h-auto">
      {list.map((item, idx) => (
        <TagList
          key={idx}
          title={item.tag}
          count={item.count}
          roomId={item.roomId}
        />
      ))}
    </section>
  );
};

export default List;
