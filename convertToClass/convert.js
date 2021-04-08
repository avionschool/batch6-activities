class Clock {
  constructor({ template }) {
    this.template = template;
  }

  render() {
    this.date = new Date();

    this.hours = this.date.getHours();
    if (this.hours < 10) this.hours = '0' + this.hours;

    this.mins = this.date.getMinutes();
    if (this.mins < 10) this.mins = '0' + this.mins;

    this.secs = this.date.getSeconds();
    if (this.secs < 10) this.secs = '0' + this.secs;

    this.output = this.template
      .replace('h', this.hours)
      .replace('m', this.mins)
      .replace('s', this.secs);

    console.log(this.output);
  }

  stop() {
    clearInterval(this.timer);
  }

  start() {
    this.render();
    this.timer = setInterval(() => this.render(), 1000);
  }
}

let clock = new Clock({ template: 'h:m:s' });
clock.start();
