
const questions={
  'CFNazo_Cky54C' :{ 'hint1':'へのーの導きがあらんことを', 'hint2':'へのーの導きがあらんことを', 'answer':'90bd955ed49d354f75a16447e1554c8904ff7f7008dad1b687be087ce94f821d'},
  'CFNazo_Ds9yeA' :{ 'hint1':'へのーの導きがあらんことを', 'hint2':'へのーの導きがあらんことを', 'answer':'90bd955ed49d354f75a16447e1554c8904ff7f7008dad1b687be087ce94f821d'},
  'CFNazo_GrkAhm' :{ 'hint1':'へのーの導きがあらんことを', 'hint2':'へのーの導きがあらんことを', 'answer':'90bd955ed49d354f75a16447e1554c8904ff7f7008dad1b687be087ce94f821d'},
  'CFNazo_HaDiL5' :{ 'hint1':'へのーの導きがあらんことを', 'hint2':'へのーの導きがあらんことを', 'answer':'90bd955ed49d354f75a16447e1554c8904ff7f7008dad1b687be087ce94f821d'},
  'CFNazo_i57t63' :{ 'hint1':'へのーの導きがあらんことを', 'hint2':'へのーの導きがあらんことを', 'answer':'90bd955ed49d354f75a16447e1554c8904ff7f7008dad1b687be087ce94f821d'},
  'CFNazo_mDhQae' :{ 'hint1':'へのーの導きがあらんことを', 'hint2':'へのーの導きがあらんことを', 'answer':'90bd955ed49d354f75a16447e1554c8904ff7f7008dad1b687be087ce94f821d'},
  'CFNazo_nBXLMF' :{ 'hint1':'へのーの導きがあらんことを', 'hint2':'へのーの導きがあらんことを', 'answer':'90bd955ed49d354f75a16447e1554c8904ff7f7008dad1b687be087ce94f821d'},
  'CFNazo_s2QZ62' :{ 'hint1':'へのーの導きがあらんことを', 'hint2':'へのーの導きがあらんことを', 'answer':'90bd955ed49d354f75a16447e1554c8904ff7f7008dad1b687be087ce94f821d'},
  'CFNazo_tAU2FQ' :{ 'hint1':'へのーの導きがあらんことを', 'hint2':'へのーの導きがあらんことを', 'answer':'90bd955ed49d354f75a16447e1554c8904ff7f7008dad1b687be087ce94f821d'},
  'CFNazo_wsFEgB' :{ 'hint1':'へのーの導きがあらんことを', 'hint2':'へのーの導きがあらんことを', 'answer':'90bd955ed49d354f75a16447e1554c8904ff7f7008dad1b687be087ce94f821d'},
}

async function makeHash(text){
  const uint8  = new TextEncoder().encode(text)
  const digest = await crypto.subtle.digest('SHA-256', uint8)
  return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2,'0')).join('')
}

async function comparisonHash(text, questionName) {
  let result = false;
  await makeHash(text).then(hash=>{
    if(hash == questions[questionName].answer){
      result= true;
    }
  })
  return result;
}

function getQuestionNames(){
  return Object.keys(questions);
}

function getQuestionProps(questionName){
  return {'title':questions[questionName].title,'questionImgUrl':questions[questionName].questionImgUrl,'hint':questions[questionName].hint};
}

export {makeHash, comparisonHash, getQuestionNames, getQuestionProps};