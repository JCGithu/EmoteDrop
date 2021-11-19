const urlParams = new URLSearchParams(window.location.search);
const u = urlParams.get('u');
const b = urlParams.get('bounce');
const s = urlParams.get('emoteSize');
const e = urlParams.get('ballSize');

let channelList = ['colloquialowl']
let bounce = 0.5
if (u) channelList = [u]
if (b) bounce = b * 0.1;

const client = new tmi.Client({
	channels: channelList
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
    width: innerWidth,
    height: innerHeight,
    wireframes: false,
    background: 'transparent',
    wireframeBackground: 'transparent',
}
});

Render.run(render);
var runner = Runner.create();
Runner.run(runner, engine);

let halfHeight = innerHeight * 0.5;
let halfWidth = innerWidth * 0.5;

Composite.add(world, [
    Bodies.rectangle(halfWidth, innerHeight, innerWidth, 1, { isStatic: true }),
    Bodies.rectangle(0, halfHeight, 1, innerHeight, { isStatic: true }),
    Bodies.rectangle(innerWidth, halfHeight, 1, innerHeight, { isStatic: true }),
]);

let scale = '2.0'
let ball = 20;

if (innerWidth > 1920) {
    scale = '3.0';
    ball = 30;
}
if (innerWidth < 720) {
    scale = '1.0';
    ball = 10;
}
if (s) scale = `${s}.0`;
if (e) ball = parseInt(e);


client.connect();

client.on('message', (channel, tags, message, self) => {
	console.log(tags.emotes);
    for (let i in tags.emotes){
        for(let k in tags.emotes[i]){
            Composite.add(world,[ 
                Bodies.circle(getRandomInt(innerWidth * 0.9), 0, ball, {
                    restitution: bounce,
                    render: {
                        sprite: {
                            texture: `http://static-cdn.jtvnw.net/emoticons/v2/${i}/default/light/${scale}`
                        }
                    }
                }),
            ])
        }
    }
});
			