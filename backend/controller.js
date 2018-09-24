patterns = [
    {
        name: 'Singleton',
        tiling: [[0, 0, 0], [0, 1, 0], [0, 0, 0]],
        id: 1
    },
    {
        name: 'Row Spinner',
        tiling: [[0, 0, 0], [1, 1, 1], [0, 0, 0]],
        id: 2
    },
    {
        name: 'Column Spinner',
        tiling: [[0, 1, 0], [0, 1, 0], [0, 1, 0]],
        id: 3
    },
    {
        name: 'Southwest Flyer',
        tiling: [[0, 1, 0], [1, 0, 0], [1, 1, 1]],
        id: 4
    }
]

let id = 5;

module.exports = {

    read: (req, res, next) => {

        res.status(200).send(patterns);

    },

    add: (req, res, next) => {

        let { name, tiling } = req.body;

        if (name === '') {
            name = `Pattern No ${id}`
        }

        const pattern = {
            name: name,
            tiling: tiling,
            id: id
        }

        patterns.push(pattern);
        id++;

        res.status(200).send(patterns)

    },

    delete: (req, res, next) => {

        const { patternID } = req.params;

        updatedpatterns = patterns.filter(pattern => {

            return pattern.id != patternID

        })

        patterns = updatedpatterns;

        res.status(200).send(patterns)

    }

}