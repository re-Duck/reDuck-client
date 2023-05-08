import { axios_post } from '@/service/base/api';

export const imageHandler = () => {
  console.log('에디터에서 이미지 버튼을 클릭하면 이 핸들러가 시작됩니다!');

  const input = document.createElement('input');

  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.addEventListener('change', async () => {
    console.log('온체인지');
    if (input.files === null) return;

    const file = input.files[0];
    const formData = new FormData();
    formData.append('img', file);

    try {
      const dataObject = {
        suburl: '/post/image',
        data: formData,
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MyIsInJvbGVzIjpbeyJuYW1lIjoiUk9MRV9VU0VSIn1dLCJpYXQiOjE2ODA3MTQxNDEsImV4cCI6MTY4MDcxNDE3MX0.9vk4SHWp7Nfy2wIS59TuGH7qOCZeyt-wqNnTdQ3ZiGo',
        },
      };
      const result = await axios_post(dataObject);
      console.log(result);
      // console.log('성공 시, 백엔드가 보내주는 데이터', result.data.url);
      // const IMG_URL = result.data.url;
      // const editor = quillRef.current.getEditor(); // 에디터 객체 가져오기
      // editor.root.innerHTML =
      //   editor.root.innerHTML + `<img src=${IMG_URL} /><br/>`; // 현재 있는 내용들 뒤에 써줘야한다.
      // const range = editor.getSelection();

      // editor.insertEmbed(range.index, 'image', IMG_URL);
    } catch (error) {
      console.log('실패했어요ㅠ');
    }
  });
};
