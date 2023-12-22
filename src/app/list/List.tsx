import TagList from "./TagList";

interface IList {
  tag: string;
  count: number;
  title: string;
  users: string[];
  roomId: string;
}

const List = () => {
  const list = [
    {
      tag: "자동차",
      title: "F1 같이 보실 분",
      count: 2,
      users: ["페라리", "레드불"],
      roomId: "test1",
    },
    {
      tag: "요리",
      title: "백종원 레시피",
      count: 3,
      users: ["소유진", "백종원", "기타시청자"],
      roomId: "test2",
    },
    {
      tag: "요리",
      title: "유튜브 같이 하실분?",
      count: 4,
      users: ["낭만", "배려", "감사", "정의"],
      roomId: "test3",
    },
    {
      tag: "자동차",
      title: "깡통 gv80 vs 풀 옵션 펠리세이드",
      count: 1,
      users: ["현대"],
      roomId: "test4",
    },
    {
      tag: "PC",
      title: "50만원으로 로아풀옵션 가능?",
      count: 3,
      users: ["다나와", "쿠팡", "컴퓨존"],
      roomId: "test5",
    },
    {
      tag: "요리",
      title: "유튜브 같이 하실분?",
      count: 4,
      users: ["낭만"],
      roomId: "test3",
    },
  ];

  const tagMap: {
    [tag: string]: Array<{
      count: number;
      title: string;
      users: string[];
      roomId: string;
    }>;
  } = {};

  list.forEach((item: IList) => {
    const { tag, count, title, users, roomId } = item;
    if (!tagMap[tag]) {
      tagMap[tag] = [];
    }
    tagMap[tag].push({ count, title, users, roomId });
  });

  const tagList = Object.keys(tagMap).map((tag) => ({
    tag,
    list: tagMap[tag],
  }));

  return (
    <section className="w-full h-auto">
      <div className="mb-16 pr-60">
        {tagList.map((list, idx: number) => (
          <>
            <h1
              className="text-3xl pb-2 border-b mb-2"
              key={`${list.tag}_${idx}`}
            >
              {list.tag}
            </h1>
            <div className="flex gap-4 mb-10 overflow-x-auto overflow-y-hidden">
              {list.list.map((item, idx: number) => (
                <TagList
                  key={`${item.roomId}_${idx}`}
                  count={item.count}
                  title={item.title}
                  roomId={item.roomId}
                  users={item.users}
                />
              ))}
            </div>
          </>
        ))}
      </div>
    </section>
  );
};

export default List;
