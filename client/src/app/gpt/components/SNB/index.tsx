import CreateChatButton from '../CreateChatButton';

export default function SNB() {
  return (
    <aside className="w-[240px] h-full rounded-sm">
      <div className="w-[240px] h-full bg-[#ECECEF]/50 py-6 px-7 flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="font-black text-headline5">Chat GPT</h1>
          <div className="flex flex-col gap-9">
            <span className="p-2 border-b text-caption1 text-gray-scale-600 border-blue-gray-scale-200">
              사용 가능 횟수:
              <strong className="font-normal text-gray-scale-700">{` 2/10회`}</strong>
            </span>
            <div className="font-bold text-gray-scale-600 text-caption1">
              새로운 채팅을 시작해보세요
            </div>
          </div>
        </div>

        <CreateChatButton />
      </div>
    </aside>
  );
}
