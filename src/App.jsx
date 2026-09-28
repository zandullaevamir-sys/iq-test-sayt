import { useEffect, useMemo, useState } from 'react';
import './styles.css';

const QUESTION_BANK = {
  tarix: [
    { question: "O'zbekiston Respublikasining Konstitutsiyasi qachon qabul qilingan?", options: ['1991-yil 31-avgust', '1992-yil 8-dekabr', '1993-yil 2-iyul', '1995-yil 30-avgust'], correct: 1 },
    { question: "Amir Temur qaysi yilda tug'ilgan?", options: ['1256', '1336', '1370', '1405'], correct: 1 },
    { question: "Mirzo Ulug'bek rasadxonasi qaysi shaharda qurilgan?", options: ['Buxoro', 'Xiva', 'Samarqand', 'Toshkent'], correct: 2 },
    { question: "Alisher Navoiy qaysi shaharda tug'ilgan?", options: ['Hirot', 'Samarqand', 'Buxoro', 'Shahrisabz'], correct: 0 },
    { question: "Muhammad al-Xorazmiy qaysi fanning asoschisi hisoblanadi?", options: ['Kimyo', 'Algebra', 'Tibbiyot', 'Astronomiya'], correct: 1 },
    { question: "Ikkinchi jahon urushi qaysi yilda tugagan?", options: ['1939', '1943', '1945', '1950'], correct: 2 },
  ],
  geo: [
    { question: "Dunyodagi eng katta okean qaysi?", options: ['Atlantika', 'Hind', 'Shimoliy Muz', 'Tinch'], correct: 3 },
    { question: "Yaponiyaning poytaxti qaysi shahar?", options: ['Osaka', 'Tokio', 'Kioto', 'Nagoya'], correct: 1 },
    { question: "Orol dengizi qaysi ikki davlat hududida joylashgan?", options: ["O'zbekiston va Qozog'iston", "O'zbekiston va Turkmaniston", "Qozog'iston va Qirg'iziston", "Tojikiston va Qirg'iziston"], correct: 0 },
    { question: "Avstraliyaning poytaxti qaysi shahar?", options: ['Sidney', 'Melburn', 'Kanberra', 'Pert'], correct: 2 },
    { question: "Dunyodagi eng baland tog' cho'qqisi qaysi?", options: ['Elbrus', 'Jomolungma (Everest)', 'Kilimanjaro', 'Monblan'], correct: 1 },
    { question: "Misr piramidalari qaysi daryo bo'yida joylashgan?", options: ['Nil', 'Amudaryo', 'Dunay', 'Yangtsi'], correct: 0 },
  ],
  fan: [
    { question: "Suvning kimyoviy formulasi qanday?", options: ['CO2', 'H2O', 'O2', 'NaCl'], correct: 1 },
    { question: "Yorug'likning vakuumdagi tezligi taxminan qancha?", options: ['30 000 km/s', '150 000 km/s', '300 000 km/s', '1 000 000 km/s'], correct: 2 },
    { question: "Quyosh tizimidagi eng katta sayyora qaysi?", options: ['Saturn', 'Yupiter', 'Neptun', 'Yer'], correct: 1 },
    { question: "Inson tanasidagi eng katta organ qaysi?", options: ['Yurak', 'Jigar', 'Teri', "O'pka"], correct: 2 },
    { question: "Havoning eng katta qismini qaysi gaz tashkil qiladi?", options: ['Kislorod', 'Azot', 'Karbonat angidrid', 'Vodorod'], correct: 1 },
    { question: "Tovush qaysi muhitda eng tez tarqaladi?", options: ['Havoda', 'Vakuumda', 'Suvda', "Po'latda"], correct: 3 },
  ],
  it: [
    { question: "Python dasturlash tili qaysi yilda yaratilgan?", options: ['1985', '1991', '1995', '2000'], correct: 1 },
    { question: "HTML nima uchun ishlatiladi?", options: ['Veb-sahifa tuzilmasini yaratish', "Ma'lumotlar bazasini boshqarish", 'Rasmlarni tahrirlash', 'Videolarni siqish'], correct: 0 },
    { question: "CPU qisqartmasi nimani anglatadi?", options: ['Markaziy protsessor', 'Xotira bloki', 'Video karta', "Ta'minot bloki"], correct: 0 },
    { question: "1 bayt necha bitdan iborat?", options: ['4', '8', '16', '32'], correct: 1 },
    { question: "Quyidagilardan qaysi biri operatsion tizim?", options: ['Excel', 'Chrome', 'Windows', 'Photoshop'], correct: 2 },
    { question: "AI qisqartmasi nimani anglatadi?", options: ['Avtomatik internet', "Sun'iy intellekt", "Ilg'or interfeys", "Analog ma'lumot"], correct: 1 },
  ],
  adabiyot: [
    { question: 'Alisher Navoiyning "Xamsa" asari nechta dostondan iborat?', options: ['3', '4', '5', '7'], correct: 2 },
    { question: '"O\'tkan kunlar" romani muallifi kim?', options: ['Cho\'lpon', 'Abdulla Qodiriy', 'Oybek', "G'afur G'ulom"], correct: 1 },
    { question: '"Hamlet" tragediyasi muallifi kim?', options: ['Vilyam Shekspir', 'Lev Tolstoy', 'Viktor Gyugo', 'Iogann Gyote'], correct: 0 },
    { question: '"Sariq devni minib" asari muallifi kim?', options: ['Abdulla Oripov', 'Xudoyberdi To\'xtaboyev', 'Erkin Vohidov', 'Said Ahmad'], correct: 1 },
    { question: '"Mona Liza" rasmining muallifi kim?', options: ['Mikelanjelo', 'Rafael', 'Leonardo da Vinchi', 'Pikasso'], correct: 2 },
    { question: '"Boburnoma" asari muallifi kim?', options: ['Alisher Navoiy', 'Zahiriddin Muhammad Bobur', 'Mirzo Ulug\'bek', 'Abu Rayhon Beruniy'], correct: 1 },
  ],
};

const TEST_MAP = {
  'Umumiy Testlar': { banks: ['tarix', 'geo', 'fan', 'it', 'adabiyot'], count: 10 },
  'Tarix va Geografiya': { banks: ['tarix', 'geo'], count: 10 },
  'Fan va Texnika': { banks: ['fan', 'it'], count: 10 },
  "San'at va Adabiyot": { banks: ['adabiyot'], count: 6 },
  "O'zbekiston tarixi va madaniyati": { banks: ['tarix'], count: 6 },
  'Jahon mamlakatlari va poytaxtlari': { banks: ['geo'], count: 6 },
  'Zamonaviy texnologiyalar va IT': { banks: ['it'], count: 6 },
};

const TEST_ORDER = Object.keys(TEST_MAP);

function shuffle(items) {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function buildQuestions(title) {
  const config = TEST_MAP[title] || TEST_MAP['Umumiy Testlar'];
  let pool = [];
  config.banks.forEach((bank) => {
    pool = pool.concat(QUESTION_BANK[bank]);
  });

  return shuffle(pool)
    .slice(0, config.count)
    .map((item) => {
      const options = shuffle(item.options.map((text, index) => ({ text, ok: index === item.correct })));
      return {
        question: item.question,
        options: options.map((option) => option.text),
        correct: options.findIndex((option) => option.ok),
      };
    });
}

function formatTime(value) {
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export default function App() {
  const [currentTestTitle, setCurrentTestTitle] = useState('Umumiy Testlar');
  const [questions, setQuestions] = useState(() => buildQuestions('Umumiy Testlar'));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45 * 10);

  useEffect(() => {
    const nextQuestions = buildQuestions(currentTestTitle);
    setQuestions(nextQuestions);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowResult(false);
    setTimeLeft(nextQuestions.length * 45);
  }, [currentTestTitle]);

  const currentQuestion = questions[currentIndex] || null;

  useEffect(() => {
    if (showResult || !currentQuestion) return undefined;

    const timer = window.setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          window.clearInterval(timer);
          setShowResult(true);
          return 0;
        }
        return previous - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [currentQuestion, showResult]);

  const correctCount = useMemo(
    () => questions.reduce((total, question, index) => (selectedAnswers[index] === question.correct ? total + 1 : total), 0),
    [questions, selectedAnswers]
  );

  const resultPercent = questions.length ? Math.round((correctCount / questions.length) * 100) : 0;
  const totalPoints = correctCount * 10;
  const progress = showResult ? 100 : ((currentIndex + 1) / Math.max(questions.length, 1)) * 100;

  function handleAnswer(optionIndex) {
    setSelectedAnswers((previous) => ({ ...previous, [currentIndex]: optionIndex }));
  }

  function nextQuestion() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((previous) => previous + 1);
      return;
    }
    setShowResult(true);
  }

  function prevQuestion() {
    if (currentIndex > 0) {
      setCurrentIndex((previous) => previous - 1);
    }
  }

  function retakeTest() {
    const nextQuestions = buildQuestions(currentTestTitle);
    setQuestions(nextQuestions);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowResult(false);
    setTimeLeft(nextQuestions.length * 45);
  }

  return (
    <div className="page-wrap">
      <div className="card">
        <div className="topbar">
          <span className="eyebrow">{currentTestTitle}</span>
          <span>{formatTime(timeLeft)}</span>
        </div>

        <div className="progress">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '18px' }}>
          {TEST_ORDER.map((testName) => (
            <button
              key={testName}
              type="button"
              onClick={() => setCurrentTestTitle(testName)}
              style={{
                background: testName === currentTestTitle ? '#2563eb' : '#0f172a',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                color: '#e2e8f0',
                borderRadius: '999px',
                padding: '8px 12px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {testName}
            </button>
          ))}
        </div>

        {!showResult && currentQuestion ? (
          <div className="quiz-card">
            <h2>{currentQuestion.question}</h2>

            <div className="options">
              {currentQuestion.options.map((option, index) => {
                const selected = selectedAnswers[currentIndex] === index;
                return (
                  <button
                    key={option}
                    type="button"
                    className="option"
                    onClick={() => handleAnswer(index)}
                    style={{
                      background: selected ? 'rgba(96, 165, 250, 0.18)' : 'rgba(15, 23, 42, 0.45)',
                      borderColor: selected ? 'rgba(96, 165, 250, 0.8)' : 'rgba(148, 163, 184, 0.2)',
                    }}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginTop: '20px' }}>
              <button type="button" className="primary-btn" onClick={prevQuestion} disabled={currentIndex === 0} style={{ width: '48%' }}>
                Oldingi
              </button>
              <button type="button" className="primary-btn" onClick={nextQuestion} style={{ width: '48%' }}>
                {currentIndex === questions.length - 1 ? 'Yakunlash' : 'Keyingi'}
              </button>
            </div>
          </div>
        ) : (
          <div className="result-card">
            <div className="score-ring">
              <span>{resultPercent}%</span>
              <small>Natija</small>
            </div>

            <h1>Test yakunlandi</h1>
            <p className="result-text">
              {correctCount} ta to'g'ri javob, {questions.length - correctCount} ta xato.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '12px', marginBottom: '18px' }}>
              <div>
                <div style={{ color: '#94a3b8', fontSize: '12px' }}>To'g'ri</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#34d399' }}>{correctCount}</div>
              </div>
              <div>
                <div style={{ color: '#94a3b8', fontSize: '12px' }}>%</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f8fafc' }}>{resultPercent}%</div>
              </div>
              <div>
                <div style={{ color: '#94a3b8', fontSize: '12px' }}>Ball</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fbbf24' }}>{totalPoints}</div>
              </div>
            </div>

            <button type="button" className="primary-btn" onClick={retakeTest}>
              Qayta ishlash
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
