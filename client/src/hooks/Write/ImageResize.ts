import Image from '@tiptap/extension-image';

const ImageResize = Image.extend({
  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      style: {
        default: 'width: 100%; height: 100%;',
      },
    };
  },
  addNodeView() {
    return ({ node, editor, getPos }) => {
      const { view } = editor;
      const { src, alt, style } = node.attrs;
      const $contatiner = document.createElement('div');
      const $img = document.createElement('img');
      const dotsPosition = [
        'top: -4px; left: -4px;',
        'top: -4px; right: -4px;',
        'bottom: -4px; left: -4px;',
        'bottom: -4px; right: -4px;',
      ];

      $contatiner.setAttribute(
        'style',
        `position: relative; border: 1px dashed #6C6C6C; ${style}`
      );

      let isResizing = false; // 리사이징 중인지 여부를 판별하는 플래그
      let startX: number, startWidth: number, startHeight: number;

      Array.from({ length: 4 }, (_, index) => {
        const $dot = document.createElement('div');
        $dot.setAttribute(
          'style',
          `position: absolute; width: 9px; height: 9px; border: 1.5px solid #6C6C6C; border-radius: 50%; ${dotsPosition[index]} cursor: pointer;`
        );

        $dot.addEventListener('mousedown', (e) => {
          e.preventDefault();
          isResizing = true; // 리사이징 시작
          startX = e.clientX;
          startWidth = $contatiner.offsetWidth;
          startHeight = $contatiner.offsetHeight;

          const onMouseMove = (e: MouseEvent) => {
            if (!isResizing) return; // 리사이징 중이 아니라면 무시

            const deltaX = e.clientX - startX;

            const aspectRatio = startWidth / startHeight;
            const newWidth = startWidth + deltaX;
            const newHeight = newWidth / aspectRatio;

            $contatiner.style.width = newWidth + 'px';
            $contatiner.style.height = newHeight + 'px';

            $img.style.width = newWidth + 'px';
            $img.style.height = newHeight + 'px';
          };

          const onMouseUp = () => {
            if (isResizing) {
              isResizing = false; // 리사이징 종료
            }
            if (typeof getPos === 'function') {
              const newAttrs = {
                ...node.attrs,
                style: `${$img.style.cssText}`,
              };
              view.dispatch(
                view.state.tr.setNodeMarkup(getPos(), null, newAttrs)
              );
            }

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
          };

          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);
        });
        $contatiner.appendChild($dot);
      });
      $contatiner.appendChild($img);
      $img.setAttribute('src', src);
      $img.setAttribute('alt', alt);
      $img.setAttribute('style', style);
      $img.setAttribute('draggable', 'true');

      return {
        dom: $contatiner,
      };
    };
  },
});

export default ImageResize;
