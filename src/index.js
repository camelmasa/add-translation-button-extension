import http from 'axios'
import _ from './index.css'

// Ref: https://github.com/jxnblk/loading/blob/master/loading-bubbles.svg
const spinnerIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="#e6ecf0"><circle transform="translate(8 0)" cx="0" cy="16" r="0"><animate attributeName="r" values="0; 4; 0; 0" dur="1.2s" repeatCount="indefinite" begin="0" keytimes="0;0.2;0.7;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8" calcMode="spline" /></circle><circle transform="translate(16 0)" cx="0" cy="16" r="0"><animate attributeName="r" values="0; 4; 0; 0" dur="1.2s" repeatCount="indefinite" begin="0.3" keytimes="0;0.2;0.7;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8" calcMode="spline" /></circle><circle transform="translate(24 0)" cx="0" cy="16" r="0"><animate attributeName="r" values="0; 4; 0; 0" dur="1.2s" repeatCount="indefinite" begin="0.6" keytimes="0;0.2;0.7;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8" calcMode="spline" /></circle></svg>'

// Ref: https://octicons.github.com/icon/globe/
const globeIcon = '<svg viewBox="0 0 14 16" version="1.1" aria-hidden="true"><path fill-rule="evenodd" d="M7 1C3.14 1 0 4.14 0 8s3.14 7 7 7c.48 0 .94-.05 1.38-.14-.17-.08-.2-.73-.02-1.09.19-.41.81-1.45.2-1.8-.61-.35-.44-.5-.81-.91-.37-.41-.22-.47-.25-.58-.08-.34.36-.89.39-.94.02-.06.02-.27 0-.33 0-.08-.27-.22-.34-.23-.06 0-.11.11-.2.13-.09.02-.5-.25-.59-.33-.09-.08-.14-.23-.27-.34-.13-.13-.14-.03-.33-.11s-.8-.31-1.28-.48c-.48-.19-.52-.47-.52-.66-.02-.2-.3-.47-.42-.67-.14-.2-.16-.47-.2-.41-.04.06.25.78.2.81-.05.02-.16-.2-.3-.38-.14-.19.14-.09-.3-.95s.14-1.3.17-1.75c.03-.45.38.17.19-.13-.19-.3 0-.89-.14-1.11-.13-.22-.88.25-.88.25.02-.22.69-.58 1.16-.92.47-.34.78-.06 1.16.05.39.13.41.09.28-.05-.13-.13.06-.17.36-.13.28.05.38.41.83.36.47-.03.05.09.11.22s-.06.11-.38.3c-.3.2.02.22.55.61s.38-.25.31-.55c-.07-.3.39-.06.39-.06.33.22.27.02.5.08.23.06.91.64.91.64-.83.44-.31.48-.17.59.14.11-.28.3-.28.3-.17-.17-.19.02-.3.08-.11.06-.02.22-.02.22-.56.09-.44.69-.42.83 0 .14-.38.36-.47.58-.09.2.25.64.06.66-.19.03-.34-.66-1.31-.41-.3.08-.94.41-.59 1.08.36.69.92-.19 1.11-.09.19.1-.06.53-.02.55.04.02.53.02.56.61.03.59.77.53.92.55.17 0 .7-.44.77-.45.06-.03.38-.28 1.03.09.66.36.98.31 1.2.47.22.16.08.47.28.58.2.11 1.06-.03 1.28.31.22.34-.88 2.09-1.22 2.28-.34.19-.48.64-.84.92s-.81.64-1.27.91c-.41.23-.47.66-.66.8 3.14-.7 5.48-3.5 5.48-6.84 0-3.86-3.14-7-7-7L7 1zm1.64 6.56c-.09.03-.28.22-.78-.08-.48-.3-.81-.23-.86-.28 0 0-.05-.11.17-.14.44-.05.98.41 1.11.41.13 0 .19-.13.41-.05.22.08.05.13-.05.14zM6.34 1.7c-.05-.03.03-.08.09-.14.03-.03.02-.11.05-.14.11-.11.61-.25.52.03-.11.27-.58.3-.66.25zm1.23.89c-.19-.02-.58-.05-.52-.14.3-.28-.09-.38-.34-.38-.25-.02-.34-.16-.22-.19.12-.03.61.02.7.08.08.06.52.25.55.38.02.13 0 .25-.17.25zm1.47-.05c-.14.09-.83-.41-.95-.52-.56-.48-.89-.31-1-.41-.11-.1-.08-.19.11-.34.19-.15.69.06 1 .09.3.03.66.27.66.55.02.25.33.5.19.63h-.01z"></path></svg>'

const addTranslateButton = (dom) => {
  const text = dom.innerText

  let buttonArea = document.createElement('div')
  buttonArea.setAttribute('class', 'add-translation-button-extension button')

  let button = document.createElement('span')
  button.innerText = '英語から翻訳'

  buttonArea.innerHTML = globeIcon
  buttonArea.appendChild(button)

  button.addEventListener('click', () => {
    dom.removeChild(buttonArea)

    let resultArea = document.createElement('div')
    resultArea.setAttribute('class', 'add-translation-button-extension result')

    let loaderArea = document.createElement('div')
    loaderArea.setAttribute('class', 'add-translation-button-extension loader')
    loaderArea.innerHTML = spinnerIcon

    dom.appendChild(loaderArea)

    http.get('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ja&dt=t&dt=bd&dj=1&source=icon&q=' + encodeURIComponent(text))
      .then((response) => {
        const transTexts = response.data.sentences.map((sentence) => { return sentence.trans })

        resultArea.innerText = transTexts.join('')

        dom.removeChild(loaderArea)
        dom.appendChild(resultArea)
      })
      .catch((error) => {
        resultArea.innerText = '翻訳に失敗しました'

        dom.removeChild(loaderArea)
        dom.appendChild(resultArea)
      })
  })

  dom.appendChild(buttonArea)
}

switch (true) {
  // GitHub
  case /^https:\/\/github.com/.test(location.href):
    document.addEventListener('pjax:success', () => {
      document.querySelectorAll('.comment-body').forEach((dom) => { addTranslateButton(dom) })
    })

    // Dispach event when first load
    document.querySelectorAll('.comment-body').forEach((dom) => { addTranslateButton(dom) })

    break

  // Hacker News
  case /^https:\/\/news.ycombinator.com\/item/.test(location.href):
    document.querySelectorAll('.comment').forEach((dom) => { addTranslateButton(dom) })

    break
}
