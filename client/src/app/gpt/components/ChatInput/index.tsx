export default function ChatInput() {
  return (
    <textarea
      className="w-full h-[160px] border border-gray-scale-600 px-6 py-3 ovrflow-auto resize-none text-body2 placeholder-gray-scale-500"
      placeholder="GPT에게 코드리뷰를 물어보세요."
    />
  );
}
