let fft
var transparency = 255
var buffer
let Particle = function (position) {
    this.position = position
    this.speed = createVector(0, 1)
    this.positiontotal = this.position.x + this.position.x

    this.red = random(0, 255)
    this.green = random(0, 255)
    this.blue = random(0, 255)

    this.colortotal = this.red + this.green + this.blue

    this.red *= this.colortotal / this.positiontotal
    this.green *= this.colortotal / this.positiontotal
    this.blue *= this.colortotal / this.positiontotal

    this.color = [this.red, this.green, this.blue]

    this.draw = function () {
        circle(this.position.x, this.position.y, this.diameter)
        fill(this.color)
    }
    this.update = function (energy) {
        this.position.y += this.speed.y * energy * 10
        if (this.position.y > height) {
            this.position.y = 0
        }

        this.diameter = random(5, 7) + energy * 100
        buffer = 255 - energy * 800
        //console.log(buffer)
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight)
    noStroke()

    let mic = new p5.AudioIn()
    mic.start()

    fft = new p5.FFT()
    fft.setInput(mic)

    positionParticles()
}
function draw() {
    // funky math i can't comprehend at 11pm but it looks cool so i'll deal with it later
    if (buffer < transparency) {
        transparency = buffer
    } else {
        transparency -= 0.3
    }

    if (transparency > 255) {
        transparency = 255
    } else if (transparency <= 0) {
        transparency = 255
    }
    background(0, 0, 0, transparency)
    let spectrum = fft.analyze()
    updateParticles(spectrum)
    console.log(transparency)
}