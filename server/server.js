// для запуска сервера npm run server
// потом npm start

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());

app.use(express.json());

const filePath = path.join(__dirname, 'seminars.json');


const getSeminars = () => {
   try {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data).seminars;
   } catch (error) {
      console.error('Ошибка чтения JSON:', error);
      return [];
   }
};

app.get('/api/seminars', (req, res) => {
   const seminars = getSeminars();
   res.json(seminars);
});


app.delete('/api/seminars/:id', (req, res) => {
   const seminarId = req.params.id;
   const seminars = getSeminars();


   const updatedSeminars = seminars.filter(seminar => seminar.id !== parseInt(seminarId));

   fs.writeFileSync(filePath, JSON.stringify({ seminars: updatedSeminars }, null, 2));

   res.status(200).send({ message: 'Семинар успешно удален' });
});
app.put('/api/seminars/:id', (req, res) => {
   const seminarId = parseInt(req.params.id);
   const { title, description, date, time, photo } = req.body;
   const seminars = getSeminars();
   const seminarIndex = seminars.findIndex(seminar => seminar.id === seminarId);
   if (seminarIndex !== -1) {
      seminars[seminarIndex] = { id: seminarId, title, description, date, time, photo };
      fs.writeFileSync(filePath, JSON.stringify({ seminars }, null, 2));
      res.status(200).send({ message: 'Семинар успешно обновлен' });
   } else {
      res.status(404).send({ message: 'Семинар не найден' });
   }
});

const PORT = 1010;
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});


