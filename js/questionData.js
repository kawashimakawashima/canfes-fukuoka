
const questions={
  'CFNazo_Cky54C' :{'answeres':['f4ab3dae84c3ff953c3492d1b308a5a31eee9e31fcaad628b01695cb7f929da7'], 'hint1':'答えは四文字です。それぞれの文字は「+」で区切られています。', 'hint2':'指定された色の部分に注目しましょう。'},
  'CFNazo_Ds9yeA' :{'answeres':['7f9cee78c399f26679f004947ae5872b380643bdf790a179d17289c9c33619ce'], 'hint1':'小学校で習う表の形をしています。', 'hint2':'五十音表です。'},
  'CFNazo_GrkAhm' :{'answeres':['427101d91632c0fad636a9d962a78d7b4ea381a7849a4929da3dd34f62d320f0'], 'hint1':'「しなじー」を、青色の矢印に当てはめてみましょう。', 'hint2':'縦読みしてみましょう。'},
  'CFNazo_HaDiL5' :{'answeres':['d9a0d68b30061d93781cd89a58f36d6307ab79caf47212ac0649c87bfbcdff15'], 'hint1':'イラストを文字に変換しましょう。', 'hint2':'「くつ」のイラストは、2つに分かれています。'},
  'CFNazo_i57t63' :{'answeres':['d5181e3b433fdc5d28e2745a1edaa5fd86f8d127f1b07d8742d9d277068feb88'], 'hint1':'指示に従って、言葉を変換しましょう。', 'hint2':'青い矢印は、対義語を表しています。'},
  'CFNazo_mDhQae' :{'answeres':['b8f455d557d67b105dad2bc095c6b950336b666a7f92303eb2d57e9cfaedd94c'], 'hint1':'問題文がなぜかローマ字になっています。', 'hint2':'「うらみな」をローマ字に変換しましょう。'},
  'CFNazo_nBXLMF' :{'answeres':['f8797412334f868e6b153ad2c3c8336f9d8d373334bd0628aa9e88d021b8c136'], 'hint1':'指示に従って、全ての単語を漢字に変換します。', 'hint2':'文字の赤い部分が、カタカナに見えてきませんか？'},
  'CFNazo_s2QZ62' :{'answeres':['82aaaa0e49d09afb502548b3cd50adf3799ca4ba62226de3bbb80c03978dde75'], 'hint1':'右上のイラストは、「くじら」です。', 'hint2':'左の図は、時刻を表しています。'},
  'CFNazo_tAU2FQ' :{'answeres':['6f37ffe3ec1d6fb722858dafc76a692e8d4617c520b04e32767615ce0694cb84'], 'hint1':'文字の色に法則性がありそうです。', 'hint2':'緑色の文字は、全て「い」になっています。'},
  'CFNazo_wsFEgB' :{'answeres':['4519ba204a8a88e7a39c266f47d2b39a0ba2f364101aa4e7bcc661f94cb1351b'], 'hint1':'動詞を全て否定の形に直します。', 'hint2':'例えば「取る」は「取らない」にします。'},
}

async function makeHash(text){
  const uint8  = new TextEncoder().encode(text)
  const digest = await crypto.subtle.digest('SHA-256', uint8)
  return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2,'0')).join('')
}

async function comparisonHash(text, questionName) {
  let result = false;
  await makeHash(text).then(hash=>{
    for(let i = 0; i < questions[questionName].answeres.length; i++){
      console.log(questions[questionName].answeres[i]==hash);
      if(hash == questions[questionName].answeres[i]){
        result = true;
        break;
      }
    }
  })
  return result;
}

function getQuestionNames(){
  return Object.keys(questions);
}

function getQuestionProps(questionName){
  return {'questionImgUrl':questions[questionName].questionImgUrl,'hint1':questions[questionName].hint1,'hint2':questions[questionName].hint2};
}

export {makeHash, comparisonHash, getQuestionNames, getQuestionProps};