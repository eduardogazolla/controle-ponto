// server/controllers/timeEntryController.js
const TimeEntry = require('../models/TimeEntry');

exports.clockIn = async (req, res) => {
  try {
    const timeEntry = new TimeEntry({ userId: req.user.id, clockIn: new Date() });
    await timeEntry.save();
    res.status(201).json({ message: 'Ponto registrado com sucesso', timeEntry });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar ponto', error });
  }
};

exports.clockOut = async (req, res) => {
  try {
    const timeEntry = await TimeEntry.findOne({ userId: req.user.id, clockOut: null });
    if (!timeEntry) return res.status(400).json({ message: 'Nenhum ponto aberto encontrado' });

    timeEntry.clockOut = new Date();
    await timeEntry.save();
    res.status(200).json({ message: 'Saída registrada com sucesso', timeEntry });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar saída', error });
  }
};
