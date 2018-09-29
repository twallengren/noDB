// Manually define array for Gosper Glider Gun (pain in the ass gun)
let gosper = Array(9).fill().map(() => Array(36).fill(0))
gosper[0][24] = 1;
gosper[1][22] = 1;
gosper[1][24] = 1;
gosper[2][12] = 1;
gosper[2][13] = 1;
gosper[2][20] = 1;
gosper[2][21] = 1;
gosper[2][34] = 1;
gosper[2][35] = 1;
gosper[3][11] = 1;
gosper[3][15] = 1;
gosper[3][20] = 1;
gosper[3][21] = 1;
gosper[3][34] = 1;
gosper[3][35] = 1;
gosper[4][0] = 1;
gosper[4][1] = 1;
gosper[4][10] = 1;
gosper[4][16] = 1;
gosper[4][20] = 1;
gosper[4][21] = 1;
gosper[5][0] = 1;
gosper[5][1] = 1;
gosper[5][10] = 1;
gosper[5][14] = 1;
gosper[5][16] = 1;
gosper[5][17] = 1;
gosper[5][22] = 1;
gosper[5][24] = 1;
gosper[6][10] = 1;
gosper[6][16] = 1;
gosper[6][24] = 1;
gosper[7][11] = 1;
gosper[7][15] = 1;
gosper[8][12] = 1;
gosper[8][13] = 1;

patterns = [
    {
        name: 'Singleton',
        tiling: [[0, 0, 0], [0, 1, 0], [0, 0, 0]],
        id: 1
    },
    {
        name: 'Spinner',
        tiling: [[0, 1, 0], [0, 1, 0], [0, 1, 0]],
        id: 2
    },
    {
        name: 'Glider',
        tiling: [[0, 1, 0], [1, 0, 0], [1, 1, 1]],
        id: 3
    },
    {
        name: 'Lightweight Spaceship',
        tiling: [[1, 0, 0, 1, 0], [0, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 1, 1, 1]],
        id: 4
    },
    {
        name: 'R-pentomino',
        tiling: [[0, 1, 1], [1, 1, 0], [0, 1, 0]],
        id: 5
    },
    {
        name: 'Diehard',
        tiling: [[0, 0, 0, 0, 0, 0, 1, 0], [1, 1, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 1, 1, 1]],
        id: 6
    },
    {
        name: 'Acorn',
        tiling: [[0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0], [1, 1, 0, 0, 1, 1, 1]],
        id: 7
    },
    {
        name: 'Gosper Glider Gun',
        tiling: gosper,
        id: 8
    }
]

let id = 9;

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

        let updatedpatterns = patterns.filter(pattern => {

            return pattern.id != patternID

        })

        patterns = updatedpatterns;

        res.status(200).send(patterns)

    },

    update: (req, res, next) => {

        const { patternID } = req.params;
        let { name } = req.body;

        let updatedpatterns = patterns.map(pattern => {

            if (pattern.id == patternID) {
                return {
                    name: name,
                    tiling: pattern.tiling,
                    id: patternID
                }
            } else {
                return pattern
            }

        })

        patterns = updatedpatterns;

        res.status(200).send(patterns)

    }

}