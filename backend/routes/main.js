// routing main /

const fs = require("fs");
const fsPromise = fs.promises;
const multer = require("multer");

const newId = (arr) => {
    let maxId = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id > maxId) {
            maxId = arr[i].id
        }
    }
    return maxId + 1
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Укажите путь к папке, в которую будут сохраняться файлы
        cb(null, 'frontend/public/uploads/');
    },
    filename: (req, file, cb) => {
        // Укажите имя файла
        cb(null, file.originalname);
    }
});

module.exports = (app) => {
    app.get('/', async (req, res) => {
        try {
            let data = await fsPromise.readFile('./backend/test.json')

            res.json({
                data: data,
                error: readError
            })
        } catch (e) {
            console.log('readError: ', readError)
        }
    })

// Используйте multer в качестве промежуточного обработчика для маршрута
    app.post('/upload', multer({storage}).single('fileName'), (req, res) => {
        // Файлы будут доступны в req.file
        console.log(req.file);
        res.send('File uploaded successfully.');
    });


    app.post('/add', async (req, res) => {
        try {
            let oldDataRaw = await fsPromise.readFile('./backend/test.json')
            let oldDataset = JSON.parse(oldDataRaw.toString())

            let request = req.body
            console.log(request)
            if (request) {
                request["id"] = newId(oldDataset.sections)
                oldDataset.sections.push(request)

                console.log("new: ", request)
                // fs.writeFile('./backend/test.json', JSON.stringify(oldDataset), (writeError) => {
                //     if (writeError) {
                //         console.log('writeError: ', writeError)
                //     }
                //     res.json({
                //         oldDataRaw: "add"
                //     })
                // })
            }
        } catch (e) {
            console.log('readError: ', e)
        }
    })
}