/*
    Andrew Goodman
    November 13, 2015
    
    Animation of the Susceptible/Infected/Resistant Model used in
    simulating the spread of an infection within a community
*/
function model(pjs)
{
    var x_limit = 300;
    var y_limit = 300;
    var fps = 50;
    
    var beds = pjs.createJavaArray('int', [2, x_limit, y_limit]);
    var toDraw = 0;

    var brown = pjs.color(80, 50, 10);
    var red = pjs.color(255, 0, 0);
    var green = pjs.color(0, 255, 0);
    var susceptible = 0;
    var recovered = -1;

    var tau = 0.2;
    var k = 4;

    function prob(p)
    {
        if (pjs.random(0, 1) < p) return true;
        else return false;
    }
    pjs.prob = prob;
    prob = prob.bind(pjs);

    function setup()
    {
        pjs.size(x_limit, y_limit);
        pjs.frameRate(fps);

        for (var x = 0; x < x_limit; x++)
        {
            for (var y = 0; y < y_limit; y++)
            {
                beds[toDraw][x][y] = susceptible;
            }
        }
        beds[toDraw][100][100] = 1;
    }
    pjs.setup = setup;
    setup = setup.bind(pjs);

    function draw()
    {
        update();

        for (var x = 0; x < x_limit; x++)
        {
            for (var y = 0; y < y_limit; y++)
            {
                if (beds[toDraw][x][y] === recovered) pjs.stroke(brown);
                else if (beds[toDraw][x][y] === susceptible) pjs.stroke(green);
                else if (beds[toDraw][x][y] < k) pjs.stroke(red);

                pjs.point(x, y);
            }
        }

        toDraw = (toDraw === 0) ? 1 : 0;
    }
    pjs.draw = draw;
    draw = draw.bind(pjs);

    function sick(patient)
    {
        if ((patient > 0) && (patient < k)) return true;
        return false;
    }
    pjs.sick = sick;
    sick = sick.bind(pjs);

    function update()
    {
        var x = 0,
            y = 0,
            cell = 0;
        var toCompute = (toDraw === 0) ? 1 : 0;

        for (x = 1; x < x_limit - 1; x++)
        {
            for (y = 1; y < y_limit - 1; y++)
            {
                cell = beds[toDraw][x][y];

                if (cell === k) cell = recovered;
                else if (sick(cell)) cell++;
                else if (cell === susceptible)
                {
                    if (sick(beds[toDraw][x][y - 1]) || sick(beds[toDraw][x][y + 1]) || sick(beds[toDraw][x - 1][y]) || sick(beds[toDraw][x + 1][y]))
                    {
                        if (prob(tau)) cell = 1;
                    }
                }

                beds[toCompute][x][y] = cell;
            }
        }
    }
    pjs.update = update;
    update = update.bind(pjs);
};

window.onload = function()
{
    var canvas = document.getElementById("sir_model");
    var instance = new Processing(canvas,model);
};