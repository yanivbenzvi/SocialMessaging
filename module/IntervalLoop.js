
export class IntervalLoop {
    constructor(options) {
        let { loop_function, wait_interval } = options;
        this.loop_function = loop_function;
        this.wait_interval = wait_interval;

        this._stop = false;
        this._loop;
        this._timeouts = [];
    }

    start() {
        this._stop = false;
        let loop = async () => {
            try{
                await this.loop_function();
            }
            catch (err){
                this.stop();
                console.log(err);
            }
            if (!this._stop) {
                this._loop = setTimeout(loop, this.wait_interval);
            }
        }
        loop();
    }

    stop() {
        this._stop = true;
        clearTimeout(this._loop);
    }
}