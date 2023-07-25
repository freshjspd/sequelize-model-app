const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1';

// const server = http.createServer(app);

// server.listen(PORT, HOST, () =>
//   console.log(`Server is listen ${HOST}:${PORT}`)
// );

const { ClassRoom, Topic } = require('./db/models');

(async function () {
  try {
    // const newClass1 = { title: 'JS-PE2023-1' };
    // const createdClass1 = ClassRoom.create(newClass1);
    // const newClass2 = { title: 'JS-PE2023-2' };
    // const createdClass2 = ClassRoom.create(newClass2);
    // const newTopic1 = { caption: 'JS', classRoomId: 1 };
    // const createdTopic1 = Topic.create(newTopic1);
    // const newTopic2 = { caption: 'HTML/CSS', classRoomId: 1 };
    // const createdTopic2 = Topic.create(newTopic2);
    // Eager Loading (LEFT JOIN)
    // const classesWithTopics = await ClassRoom.findAll({
    //   include: Topic,
    //   raw: true,
    // });
    // console.log('classesWithTopics :>> ', classesWithTopics);
    // const topicsWithClasses = await Topic.findAll({
    //   include: ClassRoom,
    //   raw: true,
    // });
    // console.log('topicsWithClasses :>> ', topicsWithClasses);
    // Lazy Loading (autocreated methods by associations)
    // const class1 = await ClassRoom.findByPk(2);
    // const topicsOfClass1 = await class1.getTopics();
    // console.log('topicsOfClass1 :>> ', topicsOfClass1);
    // const topic1 = await Topic.findByPk(1);
    // const classOfTopic1 = await topic1.getClassRoom();
    // console.log('classOfTopic1 :>> ', classOfTopic1);
  } catch (e) {
    console.log('e :>> ', e);
  }
})();
