import logo from './logo.svg';
import {Main} from './templates/Main'
import {useState, useEffect} from 'react'
import {ChevronRightIcon, ChevronDoubleRightIcon, RefreshIcon, CogIcon, UsersIcon, DocumentTextIcon, ChartBarIcon, UploadIcon } from '@heroicons/react/outline'
import Table from './components/Table'
import './App.css';

const FAKE_WORDS = [
'饮料',
'厕所',
'分钟',
'画家',
'上午',
'有用',
'中国',
'以后',
'回家',
'睡觉',
'饺子',
'菜单',
'大学',
'工作',
'对面',
'玩儿',
'学生',
'总是',
'国家',
'多少',
'城市',
'号码',
'小心',
'回来',
'一起',
'不客气',
'为什么',
'里面',
'开心',
'点儿',
'离开',
'安全',
'中间',
'虽然',
'客气',
'好像',
'汉字',
'您好',
'不好意思',
'下去',
'书店',
'上来',
'身体',
'饭店',
'不一定',
'门口',
'开学',
'然后',
'老人',
'上面',
'中文',
'所以',
'爸爸',
'这么',
'还是',
'原来',
'小学',
'照片',
'马上',
'这里',
'自己',
'一定',
'中午',
'常常',
'楼梯',
'没有',
'忘记了',
'慢慢',
'客人',
'动物',
'学习',
'没问题',
'市场',
'点菜',
'上学',
'放下',
'医院',
'早上',
'办公室',
'大家',
'什么',
'那么',
'奶奶',
'图片',
'出国',
'男孩儿',
'点心'];

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


const STATUS = {
  CORRECT: 'CORRECT',
  WRONG: 'WRONG'
}

const getTime = () => {
  const date = new Date();
  const result = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
  return result;
}

function App() {

  const [lstWords, setListWord] = useState([]);
  const [countKeyDown, setCountKeyDown] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [currentId, setCurrentWordId] = useState(0);
  const [currentStatus, setCurrentWordStatus] = useState(true);
  const [counter, setCounter] = useState(60);
  const [startCounter, setStartCounter] = useState(false);
  const [endGame, setEndGame] = useState(false);
  const [testInfo, setTestInfo] = useState({});
  const [rowShow, setRowShow] = useState(0);
  const [typeTest, setTypeTest] = useState(0);
  
  useEffect(() => {
    const shuffleArr = shuffle(FAKE_WORDS);
    const lst = shuffleArr.map( (item,index) => ({id: index, word: item, status: null}))
    setListWord(lst);
  }, [])

  const renderStyle = ({item, currentWordId, currentStatus}) => {
    let result = '';
    if (item.status) {
      if(item.status === STATUS.CORRECT){
        result = 'correct'
      } else {
        result = 'wrong'
      }
    } else {
      if(currentWordId === item.id) {
        if(currentStatus) {
          result = 'highlight'
        }else {
          result = 'highlight-wrong'
        }
      }
    }
    return result
  }
  
  const onKeyDown = (e) => {
    if(!startCounter) {
      setStartCounter(true)
    }
    console.log(e?.target?.value)
    const value = e?.target?.value || '';
    const wordObj = lstWords.find(item => item.id === currentId)
    const currentWord = wordObj?.word || '';
    let status = true

    if(e?.keyCode === 32) {
      if(String(value).trim() === '') {
        setInputValue('')
        return;
      }
      const lstNew = lstWords;
      if(String(value).trim().localeCompare(currentWord) === 0) {
        const newObj = {...wordObj, status: STATUS.CORRECT};
        lstNew[newObj.id] = newObj;
        setListWord([...lstNew]);
      } else {
        const newObj = {...wordObj, status: STATUS.WRONG};
        lstNew[newObj.id] = newObj;
        setListWord([...lstNew]);
      }
      setCurrentWordId(wordObj.id + 1);
      setCurrentWordStatus(true);
      setInputValue('')

      const textedListLength = lstNew.filter(item => item.status).length;
      if(textedListLength % 10 === 0) {
        setRowShow(textedListLength / 10);
      }

      if(textedListLength === FAKE_WORDS.length) {
        setCounter(0)
      }

    } else {
      value.split('').forEach((word, index) => {
        if(word.localeCompare(currentWord[index]) !== 0){
          status = false
        }
      });
      setCurrentWordStatus(status)
      setCountKeyDown(countKeyDown+1)
    }  
  }

  const onChangeInput = (e) => {
    setInputValue(e?.target?.value)
  }



  useEffect(() => {
    if(startCounter){
      if (counter === 0) {
        setEndGame(true)
        setListWord([])

      }
      const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
     
    }
  }, [counter, startCounter]);

  useEffect(() => {
    if(endGame && lstWords.length === 0) {
      alert('time out!!!!')
      setInputValue('')
      const lstTested = lstWords.filter( item => item.status);
      const lstCorrect = lstTested.filter( item => item.status === STATUS.CORRECT);
      const info = {
        correct: lstCorrect.length,
        incorrect: lstTested.length - lstCorrect.length,
        accuracy: (lstCorrect.length / (lstTested.length) * 100).toFixed(2),
        keystrokes: countKeyDown,
        wpm: countKeyDown/5
      }
      setTestInfo(info)
      const records = sessionStorage.getItem("records")
      const parse = records ? JSON.parse(records) : []
      parse.push({wpm: info.wpm, correct: info.correct, incorrect: info.incorrect, time: getTime(), id: parse.length + 1})
      sessionStorage.setItem("records", JSON.stringify(parse));
    }
  }, [endGame, lstWords]);

  const refresh = () => window.location.reload();
  

  return (
    <Main>
      <div className=' w-11/12 m-auto  bg-body p-2 rounded-lg h-screen'>
      <div className='w-full  grid grid-cols-12'>
        <div className='w-full col-span-2 max-w-[250px]'>
          <div className='flex flex-col bg-white rounded-lg'>
            <div className={`flex flex-row p-4 border-b items-start gap-4 rounded-t-lg cursor-pointer ${typeTest === 0 ? 'bg-selected text-white' : ''}`} onClick={() => setTypeTest(0)}>
              <ChevronRightIcon width={18} height={18}/>
              <div>
                <p><p className="font-medium text-sm">打字速度测试</p></p>
                <small>常用200字</small>
              </div>
            </div>
            <div className={`flex flex-row p-4 border-b items-start gap-4 cursor-pointer ${typeTest === 1 ? 'bg-selected text-white' : ''}`} onClick={() => setTypeTest(1)}>
              <ChevronDoubleRightIcon width={18} height={18}/>
              <div>
                <p><p className="font-medium text-sm">打字速度测试（高级）</p></p>
                <small>常用1000字</small>
              </div>
            </div>
            <div className={`flex flex-row p-4 border-b items-start gap-4 cursor-pointer`}>
              <CogIcon width={18} height={18}/>
              <div>
                <p><p className="font-medium text-sm">Custom Typing Test</p></p>
                <small>Create your own!</small>
              </div>
            </div>
            <div className={`flex flex-row p-4 border-b items-start gap-4 cursor-pointer`}>
              <UsersIcon width={18} height={18}/>
              <div>
                <p><p className="font-medium text-sm">Multiplayer Typing Test</p></p>
                <small>Multiplayer Typing Test</small>
              </div>
            </div>
            <div className={`flex flex-row p-4 border-b items-start gap-4 cursor-pointer`}>
              <UploadIcon width={18} height={18}/>
              <div>
                <p><p className="font-medium text-sm">打字竞赛</p></p>
                <small>谁是快速打字记录者?</small>
              </div>
            </div>
            <div className={`flex flex-row p-4 border-b items-start gap-4 cursor-pointer`}>
              <DocumentTextIcon width={18} height={18}/>
              <div>
                <p><p className="font-medium text-sm">练习文章</p></p>
                <small>練習你自己的文章</small>
              </div>
            </div>
            <div className={`flex flex-row p-4 border-b items-start gap-4 cursor-pointer`}>
              <ChartBarIcon width={18} height={18}/>
              <div>
                <p><p className="font-medium text-sm">常用 1000</p></p>
                <small>解开选定语言的常用1000字</small>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-start  col-span-9'>
          <div className='relative gap-2 bg-slate-200 text-6xl overflow-hidden wrap-display-text'>
            <div className='absolute' style={{top: rowShow * -55}}>
              {lstWords.map( (item) => {
                return <span key={item.id} id={item.id} className={renderStyle({item, currentWordId: currentId, currentStatus})}>{item.word} {(item.id + 1) % 10 === 0 && <br/>}</span>
                } 
              )}
            </div>
          </div>
          <div className='flex justify-center items-center gap-4 mb-12 bg-[#A7C8E7] rounded'>
            <input className="input-text w-52" type="text" readOnly={endGame} value={inputValue} onChange={onChangeInput} onKeyUp={onKeyDown} autoComplete="off" />
            <div className='p-3 rounded-md text-white text-2xl bg-slate-500 countdown'>0:{counter < 10 ? `0${counter}` : counter}</div>
            <div className='p-3 rounded-md text-white text-2xl bg-slate-500 refresh cursor-pointer' onClick={refresh}>
              <RefreshIcon width={32} height={32}/>
            </div>

          </div>
          {testInfo?.wpm && 
        <div className='flex col-span-3 justify-center w-[300px] '>
          <div className='w-full bg-white rounded-lg'>
            <div className='text-center text-xl p-2 bg-result-title text-white result-text rounded-t-lg'>Result</div>
            <div className='text-center py-4 border-b'>
              <p className='text-4xl text-[#527a1e] font-bold'>{testInfo.wpm ? testInfo.wpm.toFixed(0) : 0} WPM</p>
              <span>(words per minute)</span>
            </div>
            <div className='p-4 flex justify-between text-xl border-b '>
              <p className=''>Keystrokes</p>
              <span>{testInfo.keystrokes || 0}</span>
            </div>
            <div className='p-4 flex justify-between text-xl border-b '>
              <p className=''>Accuracy</p>
              <strong>{testInfo.accuracy || 0}%</strong>
            </div>
            <div className='p-4 flex justify-between text-xl border-b '>
              <p className=''>Correct words</p>
              <strong className='text-emerald-600'>{testInfo.correct || 0}</strong>
            </div>
            <div className='p-4 flex justify-between text-xl border-b '>
              <p className=''>Wrong words</p>
              <strong className='text-rose-700'>{testInfo.incorrect || 0}</strong>
            </div>
          </div>
        </div>}
        <Table />

        </div>
        <div className='col-span-1'></div>
      </div>
      
      </div>
    </Main>
  );
}

export default App;
