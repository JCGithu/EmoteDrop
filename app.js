const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
console.log(urlParams);

const client = new tmi.Client({
	channels: [ 'colloquialowl' ]
});

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

var Engine = Matter.Engine,
Render = Matter.Render,
Runner = Matter.Runner,
MouseConstraint = Matter.MouseConstraint,
Mouse = Matter.Mouse,
Composite = Matter.Composite,
Bodies = Matter.Bodies;

// create engine
var engine = Engine.create(),
world = engine.world;

// create renderer
var render = Render.create({
element: document.body,
engine: engine,
options: {
    width: 1920,
    height: 1080,
    wireframes: false,
    background: 'transparent',
    wireframeBackground: 'transparent',
}
});

Render.run(render);
var runner = Runner.create();
Runner.run(runner, engine);


Composite.add(world, [
    Bodies.rectangle(960, 1080, 1920, 1, { isStatic: true }),
    Bodies.rectangle(0, 540, 1, 1080, { isStatic: true }),
    Bodies.rectangle(1920, 540, 1, 1080, { isStatic: true }),
]);

client.connect();

client.on('message', (channel, tags, message, self) => {
	console.log(tags.emotes);
    for (let i in tags.emotes){
        for(let k in tags.emotes[i]){
            Composite.add(world,[ 
                Bodies.circle(getRandomInt(1800), 0, 20, {
                    render: {
                        sprite: {
                            texture: `http://static-cdn.jtvnw.net/emoticons/v2/${i}/default/light/2.0`
                        }
                    }
                }),
            ])
        }
    }
});
			