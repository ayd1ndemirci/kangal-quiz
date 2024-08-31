"use client";
import React, { useState } from "react";
import list from "./list.json";
import './App.css'; // CSS dosyasını import edin

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [feedback, setFeedback] = useState("");
  const [disabledGroups, setDisabledGroups] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const currentItem = list[currentIndex];

  const handleGroupClick = (group) => {
    if (feedback) return; // Seçim yapıldıysa işleme

    setSelectedGroup(group);
    if (group === currentItem.correctgroup) {
      setFeedback("correct");
      setCorrectCount(correctCount + 1); // Doğru sayısını artır
    } else {
      setFeedback("incorrect");
      setIncorrectCount(incorrectCount + 1); // Yanlış sayısını artır
      setDisabledGroups([currentItem.correctgroup]); // Yanlış seçilen seçeneği değil, sadece doğru seçeneği devre dışı bırak
    }
  };

  const nextItem = () => {
    if (currentIndex < list.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedGroup("");
      setFeedback("");
      setDisabledGroups([]); // Yeni soruya geçerken seçenekleri aktif hale getir
    }
  };

  return (
    <div className="App">
      <div className="card">
      <h1 className="text-dikkat">DİKKAT</h1>
        <h3 className="text-description">Bu site tamamen mizah amaçlı yapılmıştır.</h3>
        <h3 className="text-description-continue">Kişilerin örgütler ile herhangi bir ilgisi bulunmamaktadır</h3>

        <h1 className="open-source"><a href="https://github.com/ayd1ndemirci/kangal-quiz" target="blank">Site Kodları İçin Tıkla</a></h1>
        <h2>Soru {currentIndex + 1} / {list.length}</h2> <br></br>
        <img
          src={`https://kangal-quiz.vercel.app/fotos/${currentItem.path}`}
          alt="current"
          style={{ width: "300px", height: "300px" }}
        />
        <div className="buttons">
          {currentItem.groups.map((group, index) => (
            <button
              key={index}
              onClick={() => handleGroupClick(group)}
              className={`group-button ${feedback === "correct" && group === currentItem.correctgroup
                  ? "correct"
                  : feedback === "incorrect" && group === selectedGroup
                    ? "incorrect"
                    : feedback === "incorrect" && group === currentItem.correctgroup
                      ? "correct"
                      : ""
                }`}
              disabled={feedback && !disabledGroups.includes(group)} // Yanlış seçilen seçeneği değil, sadece doğru seçeneği devre dışı bırak
            >
              {group}
            </button>
          ))}
        </div>
        <div className="feedback-summary">
          <p>Doğru Sayısı: {correctCount}</p>
          <p>Yanlış Sayısı: {incorrectCount}</p>
        </div>
        {feedback && currentIndex < list.length - 1 && (
          <button onClick={nextItem} className="next-button">İleri</button>
        )}
      </div>
      <h2 className="footer">
      Made by <a href="https://github.com/ayd1ndemirci" target="blank">ayd1ndemirci</a> & <a href="https://github.com/seri4lize" target="blank">seri4lize</a>
      </h2>
      <h3 className="footer-bottom">Discord: <a href="https://discord.com/users/581450819224993803" target="blank">ayd1ndemirci</a> & <a href="https://discord.com/users/1198959852739899524" target="blank">seri4lize</a></h3>
    </div>
  );
}
