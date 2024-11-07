import React, { useEffect, useState } from "react";
import api from "../api";

function ControlePonto() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName, setUserName] = useState(""); // Nome do usuário logado
  const [morningEntry, setMorningEntry] = useState("");
  const [morningExit, setMorningExit] = useState("");
  const [afternoonEntry, setAfternoonEntry] = useState("");
  const [afternoonExit, setAfternoonExit] = useState("");

  const getLocalDate = () => {
    const localTime = new Date();
    localTime.setMinutes(
      localTime.getMinutes() - localTime.getTimezoneOffset()
    );
    return localTime.toISOString().split("T")[0];
  };

  const date = getLocalDate();

  // Função para buscar informações do usuário e horários registrados
  const fetchUserInfoAndTimeEntries = async () => {
    try {
      const userResponse = await api.get("/users/me");
      setUserName(userResponse.data.name);

      // Buscar horários para o dia atual
      const timeEntryResponse = await api.get(`/time-entry/${date}`);
      if (timeEntryResponse.data) {
        const { morningEntry, morningExit, afternoonEntry, afternoonExit } =
          timeEntryResponse.data;
        setMorningEntry(morningEntry || "");
        setMorningExit(morningExit || "");
        setAfternoonEntry(afternoonEntry || "");
        setAfternoonExit(afternoonExit || "");
      }
    } catch (error) {
      console.error("Erro ao obter informações do usuário ou horários", error);
    }
  };

  // Executa a busca de informações assim que a página é carregada
  useEffect(() => {
    fetchUserInfoAndTimeEntries();

    const interval = setInterval(() => {
      setCurrentTime((prevTime) => new Date(prevTime.getTime() + 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []); // Apenas ao carregar o componente

  // Função para registrar o ponto
  const handleClockIn = async () => {
    const formattedTime = currentTime.toLocaleTimeString();

    let updatedTimeEntry = {
      date,
      morningEntry,
      morningExit,
      afternoonEntry,
      afternoonExit,
    };

    if (!morningEntry) {
      updatedTimeEntry.morningEntry = formattedTime;
      setMorningEntry(formattedTime);
    } else if (!morningExit) {
      updatedTimeEntry.morningExit = formattedTime;
      setMorningExit(formattedTime);
    } else if (!afternoonEntry) {
      updatedTimeEntry.afternoonEntry = formattedTime;
      setAfternoonEntry(formattedTime);
    } else if (!afternoonExit) {
      updatedTimeEntry.afternoonExit = formattedTime;
      setAfternoonExit(formattedTime);
    }

    try {
      await api.post("/time-entry", updatedTimeEntry); // Envie os horários atualizados para o backend
      alert("Ponto registrado com sucesso!");
    } catch (error) {
      console.error("Erro ao registrar ponto", error);
      alert("Erro ao registrar ponto");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">
          Controle de Ponto
        </h2>
        <p className="text-center text-gray-400">
          Bem-vindo,{" "}
          <span className="font-semibold text-white">{userName}</span>
        </p>

        <div className="text-center text-gray-400">
          {currentTime.toLocaleString()}
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-gray-400">Entrada Manhã</label>
            <input
              type="text"
              value={morningEntry}
              placeholder="08:00"
              className="w-full px-4 py-2 mt-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-400">Saída Manhã</label>
            <input
              type="text"
              value={morningExit}
              placeholder="12:00"
              className="w-full px-4 py-2 mt-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-400">Entrada Tarde</label>
            <input
              type="text"
              value={afternoonEntry}
              placeholder="13:00"
              className="w-full px-4 py-2 mt-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-400">Saída Tarde</label>
            <input
              type="text"
              value={afternoonExit}
              placeholder="18:00"
              className="w-full px-4 py-2 mt-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              readOnly
            />
          </div>
          <button
            type="button"
            onClick={handleClockIn}
            className="w-full py-2 mt-4 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Registrar Ponto
          </button>
        </form>
      </div>
    </div>
  );
}

export default ControlePonto;
