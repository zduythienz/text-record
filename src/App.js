import logo from "./logo.svg";
import { Main } from "./templates/Main";
import { useState, useEffect } from "react";
import {
  ChevronRightIcon,
  ChevronDoubleRightIcon,
  RefreshIcon,
  CogIcon,
  UsersIcon,
  DocumentTextIcon,
  ChartBarIcon,
  UploadIcon,
  ChevronDownIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import Table from "./components/Table";
import btn1 from "./btn-1.png";
import btn2 from "./btn-3.png";
import tablepng from "./table.png";
import share from "./share.png";
import "./App.css";

const FAKE_WORDS = [
  "饮料",
  "厕所",
  "分钟",
  "画家",
  "上午",
  "有用",
  "中国",
  "以后",
  "回家",
  "睡觉",
  "饺子",
  "菜单",
  "大学",
  "工作",
  "对面",
  "玩儿",
  "学生",
  "总是",
  "国家",
  "多少",
  "城市",
  "号码",
  "小心",
  "回来",
  "一起",
  "不客气",
  "为什么",
  "里面",
  "开心",
  "点儿",
  "离开",
  "安全",
  "中间",
  "虽然",
  "客气",
  "好像",
  "汉字",
  "您好",
  "不好意思",
  "下去",
  "书店",
  "上来",
  "身体",
  "饭店",
  "不一定",
  "门口",
  "开学",
  "然后",
  "老人",
  "上面",
  "中文",
  "所以",
  "爸爸",
  "这么",
  "还是",
  "原来",
  "小学",
  "照片",
  "马上",
  "这里",
  "自己",
  "一定",
  "中午",
  "常常",
  "楼梯",
  "没有",
  "忘记了",
  "慢慢",
  "客人",
  "动物",
  "学习",
  "没问题",
  "市场",
  "点菜",
  "上学",
  "放下",
  "医院",
  "早上",
  "办公室",
  "大家",
  "什么",
  "那么",
  "奶奶",
  "图片",
  "出国",
  "男孩儿",
  "点心",
];

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const STATUS = {
  CORRECT: "CORRECT",
  WRONG: "WRONG",
};

const getTime = () => {
  const date = new Date();
  const result = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  return result;
};

function App() {
  const [lstWords, setListWord] = useState([]);
  const [countKeyDown, setCountKeyDown] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [currentId, setCurrentWordId] = useState(0);
  const [currentStatus, setCurrentWordStatus] = useState(true);
  const [counter, setCounter] = useState(60);
  const [startCounter, setStartCounter] = useState(false);
  const [endGame, setEndGame] = useState(false);
  const [testInfo, setTestInfo] = useState({});
  const [rowShow, setRowShow] = useState(0);
  const [typeTest, setTypeTest] = useState(0);
  const [one, setOne] = useState(0);
  const [two, setTwo] = useState(0);
  const [three, setThree] = useState(0);
  const [forValue, setFor] = useState(0);
  const [five, setFive] = useState(0);
  useEffect(() => {
    const shuffleArr = shuffle(FAKE_WORDS);
    const lst = shuffleArr.map((item, index) => ({
      id: index,
      word: item,
      status: null,
    }));
    setListWord(lst);
  }, []);

  const renderStyle = ({ item, currentWordId, currentStatus }) => {
    let result = "";
    if (item.status) {
      if (item.status === STATUS.CORRECT) {
        result = "correct";
      } else {
        result = "wrong";
      }
    } else {
      if (currentWordId === item.id) {
        if (currentStatus) {
          result = "highlight";
        } else {
          result = "highlight-wrong";
        }
      }
    }
    return result;
  };

  function setAllValue(value) {
    setOne(value);
    setThree(100);
    setFive(0);
    switch (value) {
      case 44:
        setTwo(210);
        setFor(18);
        break;
      case 45:
        setTwo(215);
        setFor(18);
        break;
      case 46:
        setTwo(218);
        setFor(18);
        break;
      case 47:
        setTwo(225);
        setFor(18);
        break;
      case 48:
        setTwo(230);
        setFor(19);
        break;
      case 49:
        setTwo(232);
        setFor(19);
        break;
      case 50:
        setTwo(233);
        setFor(19);
        break;
      case 51:
        setTwo(238);
        setFor(20);
        break;
      case 52:
        setTwo(240);
        setFor(20);
        break;
      case 53:
        setTwo(244);
        setFor(20);
        break;
      case 54:
        setTwo(245);
        setFor(20);
        break;
      case 55:
        setTwo(252);
        setFor(21);
        break;
      case 56:
        setTwo(258);
        setFor(21);
        break;
      case 57:
        setTwo(259);
        setFor(22);
        break;
      case 58:
        setTwo(260);
        setFor(22);
        break;
      case 59:
        setTwo(269);
        setFor(22);
        break;
      default:
        break;
    }
  }

  const onKeyDown = (e) => {
    if (!startCounter) {
      setStartCounter(true);
    }
    console.log(e?.target?.value);
    const value = e?.target?.value || "";
    const wordObj = lstWords.find((item) => item.id === currentId);
    const currentWord = wordObj?.word || "";
    let status = true;

    if (e?.keyCode === 32) {
      if (String(value).trim() === "") {
        setInputValue("");
        return;
      }
      const lstNew = lstWords;
      if (String(value).trim().localeCompare(currentWord) === 0) {
        const newObj = { ...wordObj, status: STATUS.CORRECT };
        lstNew[newObj.id] = newObj;
        setListWord([...lstNew]);
      } else {
        const newObj = { ...wordObj, status: STATUS.WRONG };
        lstNew[newObj.id] = newObj;
        setListWord([...lstNew]);
      }
      setCurrentWordId(wordObj.id + 1);
      setCurrentWordStatus(true);
      setInputValue("");

      const textedListLength = lstNew.filter((item) => item.status).length;
      if (textedListLength % 10 === 0) {
        setRowShow(textedListLength / 10);
      }

      if (textedListLength === FAKE_WORDS.length) {
        setCounter(0);
      }
    } else {
      value.split("").forEach((word, index) => {
        if (word.localeCompare(currentWord[index]) !== 0) {
          status = false;
        }
      });
      setCurrentWordStatus(status);
      setCountKeyDown(countKeyDown + 1);
    }
  };

  const onChangeInput = (e) => {
    setInputValue(e?.target?.value);
  };

  useEffect(() => {
    if (startCounter) {
      if (counter === 0) {
        setEndGame(true);
        setListWord([]);
      }
      const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [counter, startCounter]);

  useEffect(() => {
    if (endGame && lstWords.length === 0) {
      setAllValue(Math.floor(Math.random() * (59 - 46 + 1)) + 46)
      alert("time out!!!!");
      setInputValue("");
      const lstTested = lstWords.filter((item) => item.status);
      const lstCorrect = lstTested.filter(
        (item) => item.status === STATUS.CORRECT
      );
      const info = {
        correct: lstCorrect.length,
        incorrect: lstTested.length - lstCorrect.length,
        accuracy: ((lstCorrect.length / lstTested.length) * 100).toFixed(2),
        keystrokes: countKeyDown,
        wpm: countKeyDown / 5,
      };
      setTestInfo(info);
      const records = sessionStorage.getItem("records");
      const parse = records ? JSON.parse(records) : [];
      parse.push({
        wpm: info.wpm,
        correct: info.correct,
        incorrect: info.incorrect,
        time: getTime(),
        id: parse.length + 1,
      });
      sessionStorage.setItem("records", JSON.stringify(parse));
    }
  }, [endGame, lstWords]);

  const refresh = () => window.location.reload();

  return (
    <Main>
      <div className=" w-11/12 m-auto  bg-body p-2 rounded-lg h-full">
        <div className="w-full  grid grid-cols-12">
          <div className="w-full col-span-2 max-w-[250px]">
            <div className="flex flex-col bg-white rounded-lg">
              <div
                className={`flex flex-row p-4 border-b items-start gap-4 rounded-t-lg cursor-pointer ${
                  typeTest === 0 ? "bg-selected text-white" : ""
                }`}
                onClick={() => setTypeTest(0)}
              >
                <ChevronRightIcon width={18} height={18} />
                <div>
                  <p>
                    <p className="font-medium text-sm">打字速度测试</p>
                  </p>
                  <small>常用200字</small>
                </div>
              </div>
              <div
                className={`flex flex-row p-4 border-b items-start gap-4 cursor-pointer ${
                  typeTest === 1 ? "bg-selected text-white" : ""
                }`}
                onClick={() => setTypeTest(1)}
              >
                <ChevronDoubleRightIcon width={18} height={18} />
                <div>
                  <p>
                    <p className="font-medium text-sm">打字速度测试（高级）</p>
                  </p>
                  <small>常用1000字</small>
                </div>
              </div>
              <div
                className={`flex flex-row p-4 border-b items-start gap-4 cursor-pointer`}
              >
                <CogIcon width={18} height={18} />
                <div>
                  <p>
                    <p className="font-medium text-sm">Custom Typing Test</p>
                  </p>
                  <small>Create your own!</small>
                </div>
              </div>
              <div
                className={`flex flex-row p-4 border-b items-start gap-4 cursor-pointer`}
              >
                <UsersIcon width={18} height={18} />
                <div>
                  <p>
                    <p className="font-medium text-sm">
                      Multiplayer Typing Test
                    </p>
                  </p>
                  <small>Multiplayer Typing Test</small>
                </div>
              </div>
              <div
                className={`flex flex-row p-4 border-b items-start gap-4 cursor-pointer`}
              >
                <UploadIcon width={18} height={18} />
                <div>
                  <p>
                    <p className="font-medium text-sm">打字竞赛</p>
                  </p>
                  <small>谁是快速打字记录者?</small>
                </div>
              </div>
              <div
                className={`flex flex-row p-4 border-b items-start gap-4 cursor-pointer`}
              >
                <DocumentTextIcon width={18} height={18} />
                <div>
                  <p>
                    <p className="font-medium text-sm">练习文章</p>
                  </p>
                  <small>練習你自己的文章</small>
                </div>
              </div>
              <div
                className={`flex flex-row p-4 border-b items-start gap-4 cursor-pointer`}
              >
                <ChartBarIcon width={18} height={18} />
                <div>
                  <p>
                    <p className="font-medium text-sm">常用 1000</p>
                  </p>
                  <small>解开选定语言的常用1000字</small>
                </div>
              </div>
            </div>
            <div className="btn-login flex items-center">
              {" "}
              <LogoutIcon className="mr-3.5" width={18} /> 登录
            </div>
            <div className="flex flex-col bg-white rounded-lg mt-4">
              <div
                className={`flex flex-row p-2 border-b items-start gap-4 rounded-t-lg cursor-pointer`}
              >
                <img
                  src="https://graph.facebook.com/115700377854960/picture?type=square"
                  alt=""
                  class="pull-left rounded-lg"
                />
                <div>
                  <p className="text-xs">
                    {" "}
                    <span className="text-[#428bca]">
                      BalaBlack
                    </span> reached <strong>24 WPM </strong>in the{" "}
                    <span className="text-[#428bca]">
                      Normal Typing Test (vietnamese)
                    </span>{" "}
                  </p>
                </div>
              </div>
              <div
                className={`flex flex-row p-2 border-b items-start gap-4 rounded-t-lg cursor-pointer`}
              >
                <img
                  src="https://graph.facebook.com/10216685035873013/picture?type=square"
                  alt=""
                  class="pull-left rounded-lg"
                />
                <div>
                  <p className="text-xs">
                    {" "}
                    <span className="text-[#428bca]">
                      MuhammadRusdianLaOla
                    </span>{" "}
                    reached <strong>92 WPM </strong>in the{" "}
                    <span className="text-[#428bca]">
                      Normal Typing Test (indonesian)
                    </span>{" "}
                  </p>
                </div>
              </div>
              <div
                className={`flex flex-row p-2 border-b items-start gap-4 rounded-t-lg cursor-pointer`}
              >
                <img
                  src="https://graph.facebook.com/630224231857086/picture?type=square"
                  alt=""
                  class="pull-left rounded-lg"
                />
                <div>
                  <p className="text-xs">
                    {" "}
                    <span className="text-[#428bca]">Qunh9</span> reached{" "}
                    <strong>95 WPM </strong>in the{" "}
                    <span className="text-[#428bca]">
                      Normal Typing Test (vietnamese)
                    </span>{" "}
                  </p>
                </div>
              </div>
              <div
                className={`flex flex-row p-2 border-b items-start gap-4 rounded-t-lg cursor-pointer`}
              >
                <img
                  src="https://www.gravatar.com/avatar/36278f43b411da88ca27811086cd0d2d?s=50&d=mm&r=pg"
                  alt=""
                  class="pull-left rounded-lg"
                />
                <div>
                  <p className="text-xs">
                    {" "}
                    <span className="text-[#428bca]">
                      theowong
                    </span> reached <strong>36 WPM </strong>in the{" "}
                    <span className="text-[#428bca]">
                      Normal Typing Test (indonesian)
                    </span>{" "}
                  </p>
                </div>
              </div>
              <div
                className={`flex flex-row p-2 border-b items-start gap-4 rounded-t-lg cursor-pointer`}
              >
                <img
                  src="https://graph.facebook.com/630224231857086/picture?type=square"
                  alt=""
                  class="pull-left rounded-lg"
                />
                <div>
                  <p className="text-xs">
                    {" "}
                    <span className="text-[#428bca]">
                      BalaBlack
                    </span> reached <strong>24 WPM </strong>in the{" "}
                    <span className="text-[#428bca]">
                      Normal Typing Test (vietnamese)
                    </span>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start  col-span-9">
            <div className="flex gap-2 items-center mb-2">
              <div className="rounded-md text-white text-md countdown-2">
                登录
              </div>
              <div className="rounded-md text-white text-md countdown-3 flex gap-2 justify-center">
                Chinese Simplified <ChevronDownIcon width={14} />
              </div>
              <div className="text-[14px]">切换打字测试语言</div>
            </div>
            <div className="relative gap-2 bg-slate-200 text-6xl overflow-hidden wrap-display-text">
              <div
                className="absolute"
                style={{ top: rowShow * -67, width: "102%" }}
              >
                {lstWords.map((item) => {
                  return (
                    <span
                      key={item.id}
                      id={item.id}
                      className={renderStyle({
                        item,
                        currentWordId: currentId,
                        currentStatus,
                      })}
                    >
                      {item.word} {(item.id + 1) % 10 === 0 && <br />}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-center items-center gap-4 mb-12 bg-[#A7C8E7] rounded">
              <input
                className="input-text w-52"
                type="text"
                readOnly={endGame}
                value={inputValue}
                onChange={onChangeInput}
                onKeyUp={onKeyDown}
                autoComplete="off"
              />
              <div className="p-3 rounded-md text-white text-2xl bg-[#3c4d5c] countdown">
                {counter === 60
                  ? "1:00"
                  : `0:${counter < 10 ? `0${counter}` : counter}`}{" "}
              </div>
              <div
                className="p-3 rounded-md text-white text-2xl bg-[#428bca] refresh cursor-pointer"
                onClick={refresh}
              >
                <RefreshIcon width={32} height={32} />
              </div>
            </div>
            {testInfo && (
              <div className="flex col-span-3 justify-center w-[300px] ">
                <div className="w-full bg-white rounded-lg">
                  <div className="text-center text-xl p-2 bg-result-title text-white result-text rounded-t-lg">
                    成绩{" "}
                  </div>
                  <div className="text-center py-4 border-b bg-[#f9f9f9]">
                    <p className="text-4xl text-[#527a1e] font-bold">
                      {testInfo.wpm ? one : 0} 单词/分钟
                    </p>
                    <span>每分钟字数</span>
                  </div>
                  <div className="px-4 py-2 flex justify-between text-[16px] border-b ">
                    <p className="">键盘敲击</p>
                    <span>
                      {testInfo.keystrokes && (
                        <small>
                          (<span class="correct">{two}</span> |{" "}
                          <span class="wrong">0</span>)
                        </small>
                      )}
                      &nbsp;
                      {two}
                    </span>
                  </div>
                  <div className="px-4 py-2 flex justify-between text-[16px] border-b bg-[#f9f9f9]">
                    <p className="">Accuracy</p>
                    <strong>{testInfo.accuracy ? three : 0}%</strong>
                  </div>
                  <div className="px-4 py-2 flex justify-between text-[16px] border-b ">
                    <p className="">正确的单词</p>
                    <strong className="text-emerald-600">
                      {one ? forValue : 0}
                    </strong>
                  </div>
                  <div className="px-4 py-2 flex justify-between text-[16px] border-b bg-[#f9f9f9]">
                    <p className="">错误的单词</p>
                    <strong className="text-rose-700">
                      {testInfo.incorrect ? five : 0}
                    </strong>
                  </div>
                  <div className="flex flex-col justify-center relative">
                    <div className="cursor-pointer px-4 pt-4 pb-2">
                      <img src={btn1} alt="btn-1" />
                    </div>
                    <div className="cursor-pointer px-4 pb-4">
                      <img src={btn2} alt="btn-1" />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <img src={share} alt="share" className="flex my-6" />
            <div className="flex relative">
              <img src={tablepng} alt="tabble" className="flex" />
            </div>
            {/* <Table /> */}
          </div>
          <div className="col-span-1"></div>
        </div>
      </div>
    </Main>
  );
}

export default App;
