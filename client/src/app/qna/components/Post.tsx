import { Check } from '@/assets/Icon';
import Image from 'next/image';

export default function Post() {
  return (
    <article className="w-[763px] px-4 py-[26px] border-[1px] border-gray-scale-400">
      <section className="w-full h-[140px] flex">
        <div className="w-[132px] h-full flex flex-col justify-center pr-6 items-end border-r-[1px] border-blue-gray-scale-50 gap-[17px]">
          <div className="flex items-center gap-2">
            <Check stroke="#1F9854" strokeWidth="3" />
            <span className="text-blue-gray-scale-400 text-[14px] font-medium flex items-center gap-2">
              <strong className="text-[24px] ">0</strong> 답변
            </span>
          </div>

          <span className="text-blue-gray-scale-200 text-[14px] flex items-center gap-2">
            <strong className="text-[24px] font-normal">0</strong> 조회
          </span>
        </div>

        <div className="flex flex-col w-full h-full gap-2 px-6">
          <h3 className="text-[18px] font-medium">
            개발자를 위한 커뮤니티 및 멘토링 시스템
          </h3>
          <p className="overflow-hidden text-ellipsis line-clamp-2 text-gray-scale-700">
            정성 목표는 다음과 같다 첫째 개발자들이 . , 실시간으로 자신의 경험과
            최신 기술을 공유하고 서로 도와주는 열린 커뮤니티를 구축하여 공부했던
            내용이나 공부하면서 궁금 했든 질문 내용을 커뮤니티에 올려 지식을
            공유하고 질문에 답변을 받는 시스템을 구현 한다 또한 실시간으로 . ,
          </p>

          <div>
            <div className="flex w-full gap-1 h-[24px]">
              <span className="flex justify-center items-center py-1 px-2 border-[1px] border-gray-scale-500 text-gray-scale-700 text-[12px] rounded-[2px]">
                #tag
              </span>
            </div>
            <div className="flex justify-end text-[12px]">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <Image
                    className="rounded-full border-[1px] border-gray-scale-400 w-5 h-5 flex justify-center items-center"
                    width={20}
                    height={20}
                    src="/images/main-duck.png"
                    alt="profile image"
                  />
                  <span className=" text-gray-scale-900">reDuck</span>
                </div>
                <span className="w-[1px] h-3 bg-gray-scale-600" />
                <span className="text-gray-scale-600">2024.01.01</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
