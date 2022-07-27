import logo from './logo.svg';
import {Main} from './templates/Main'
import {useState, useEffect} from 'react'
import {ChevronRightIcon, ChevronDoubleRightIcon, RefreshIcon } from '@heroicons/react/outline'
import './App.css';

const FAKE_JSON_WORDS = [{"index":0,"word":"饮料"},{"index":1,"word":"厕所"},{"index":2,"word":"分钟"},{"index":3,"word":"画家"},{"index":4,"word":"上午"},{"index":5,"word":"有用"},{"index":6,"word":"中国"},{"index":7,"word":"以后"},{"index":8,"word":"回家"},{"index":9,"word":"睡觉"},{"index":10,"word":"饺子"},{"index":11,"word":"菜单"},{"index":12,"word":"大学"},{"index":13,"word":"工作"},{"index":14,"word":"对面"},{"index":15,"word":"玩儿"},{"index":16,"word":"学生"},{"index":17,"word":"总是"},{"index":18,"word":"国家"},{"index":19,"word":"多少"},{"index":20,"word":"城市"},{"index":21,"word":"号码"},{"index":22,"word":"小心"},{"index":23,"word":"回来"},{"index":24,"word":"一起"},{"index":25,"word":"不客气"},{"index":26,"word":"为什么"},{"index":27,"word":"里面"},{"index":28,"word":"开心"},{"index":29,"word":"点儿"},{"index":30,"word":"离开"},{"index":31,"word":"安全"},{"index":32,"word":"中间"},{"index":33,"word":"虽然"},{"index":34,"word":"客气"},{"index":35,"word":"好像"},{"index":36,"word":"汉字"},{"index":37,"word":"您好"},{"index":38,"word":"不好意思"},{"index":39,"word":"下去"},{"index":40,"word":"书店"},{"index":41,"word":"上来"},{"index":42,"word":"身体"},{"index":43,"word":"饭店"},{"index":44,"word":"不一定"},{"index":45,"word":"门口"},{"index":46,"word":"开学"},{"index":47,"word":"然后"},{"index":48,"word":"老人"},{"index":49,"word":"上面"},{"index":50,"word":"中文"},{"index":51,"word":"所以"},{"index":52,"word":"爸爸"},{"index":53,"word":"这么"},{"index":54,"word":"还是"},{"index":55,"word":"原来"},{"index":56,"word":"小学"},{"index":57,"word":"照片"},{"index":58,"word":"马上"},{"index":59,"word":"这里"},{"index":60,"word":"自己"},{"index":61,"word":"一定"},{"index":62,"word":"中午"},{"index":63,"word":"常常"},{"index":64,"word":"楼梯"},{"index":65,"word":"没有"},{"index":66,"word":"忘记了"},{"index":67,"word":"慢慢"},{"index":68,"word":"客人"},{"index":69,"word":"动物"},{"index":70,"word":"学习"},{"index":71,"word":"没问题"},{"index":72,"word":"市场"},{"index":73,"word":"点菜"},{"index":74,"word":"上学"},{"index":75,"word":"放下"},{"index":76,"word":"医院"},{"index":77,"word":"早上"},{"index":78,"word":"办公室"},{"index":79,"word":"大家"},{"index":80,"word":"什么"},{"index":81,"word":"那么"},{"index":82,"word":"奶奶"},{"index":83,"word":"图片"},{"index":84,"word":"出国"},{"index":85,"word":"男孩儿"},{"index":86,"word":"点心"}]
const FAKE_WORDS = ['饮料',
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

const STATUS = {
  CORRECT: 'CORRECT',
  WRONG: 'WRONG'
}

function App() {

  const [lstWords, setListWord] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [currentId, setCurrentWordId] = useState(0);
  const [currentStatus, setCurrentWordStatus] = useState(true);
  const [counter, setCounter] = useState(60);
  const [startCounter, setStartCounter] = useState(false);
  
  useEffect(() => {
    const lst = FAKE_WORDS.map( (item,index) => ({id: index, word: item, status: null}))
    setListWord(lst)
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
    } else {
      value.split('').forEach((word, index) => {
        if(word.localeCompare(currentWord[index]) !== 0){
          status = false
        }
      });
      setCurrentWordStatus(status)
    }  
  }

  const onChangeInput = (e) => {
    setInputValue(e?.target?.value)
  }



  useEffect(() => {
    if(startCounter){
      const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [counter, startCounter]);

  return (
    <Main>
      <div className='flex flex-row gap-9'>
        <div className='flex flex-col bg-white w-[250px]'>
          <div className='flex flex-row p-4 border-b items-start gap-4'>
            <ChevronRightIcon width={22} height={22}/>
            <div>
              <p><strong>打字速度测试</strong></p>
              <small>常用200字</small>
            </div>
          </div>
          <div className='flex flex-row p-4 border-b items-start gap-4'>
            <ChevronDoubleRightIcon width={22} height={22}/>
            <div>
              <p><strong>打字速度测试（高级）</strong></p>
              <small>常用1000字</small>
            </div>
          </div>
        </div>
        <div className='flex flex-col max-w-4xl justify-center '>
          <div className='flex gap-2 bg-slate-200 text-6xl overflow-hidden wrap-display-text'>
            {lstWords.map( (item, index) =>  <span key={item.id} id={item.id} className={renderStyle({item, currentWordId: currentId, currentStatus})}>{item.word}</span> )}
          </div>
          <div className='flex justify-center items-center gap-4'>
            <input className="input-text w-52" type="text" value={inputValue} onChange={onChangeInput} onKeyUp={onKeyDown} />
            <div className='p-3 rounded-md text-white text-2xl bg-slate-500 countdown'>0:{counter < 10 ? `0${counter}` : counter}</div>
            <div className='p-3 rounded-md text-white text-2xl bg-slate-500 refresh cursor-pointer'>
              <RefreshIcon width={32} height={32}/>
            </div>
          </div>
        </div>
        <div className='flex'>
          <div>Result</div>
        </div>
      </div>
    </Main>
  );
}

export default App;
